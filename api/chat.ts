import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
    getUserId, getClientIp, checkRateLimit,
    MAX_INPUT_LENGTH, MAX_TOKENS_RESPONSE, MAX_HISTORY_MESSAGES, SYSTEM_PROMPT
} from './_shared';

export const config = {
    maxDuration: 60, // Allow up to 60s for streaming
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const baseUrl = process.env.AI_CHAT_BASE_URL;
    const apiKey = process.env.AI_CHAT_API_KEY;
    const model = process.env.AI_CHAT_MODEL;

    if (!baseUrl || !apiKey || !model) {
        return res.status(500).json({ error: 'AI 客服服务未配置，请联系管理员。' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: '请求格式错误' });
    }

    // Auth & rate limiting
    const userId = await getUserId(req);
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(userId, clientIp);

    if (!rateCheck.allowed) {
        return res.status(429).json({ error: rateCheck.error, remaining: rateCheck.remaining, limit: rateCheck.limit });
    }

    // Input validation
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content?.length > MAX_INPUT_LENGTH) {
        return res.status(400).json({ error: `消息长度不能超过 ${MAX_INPUT_LENGTH} 个字符。` });
    }

    // Truncate & build messages
    const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
    const fullMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...recentMessages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content.slice(0, MAX_INPUT_LENGTH),
        })),
    ];

    try {
        // SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        // Send rate limit info first
        res.write(`data: ${JSON.stringify({ remaining: rateCheck.remaining, limit: rateCheck.limit })}\n\n`);

        const apiUrl = `${baseUrl.replace(/\/+$/, '')}/chat/completions`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages: fullMessages,
                stream: true,
                temperature: 0.7,
                max_tokens: MAX_TOKENS_RESPONSE,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('AI API error:', response.status, errorText);
            res.write(`data: ${JSON.stringify({ error: 'AI 服务暂时不可用，请稍后重试。' })}\n\n`);
            res.write('data: [DONE]\n\n');
            return res.end();
        }

        const reader = response.body?.getReader();
        if (!reader) {
            res.write(`data: ${JSON.stringify({ error: '无法读取 AI 响应流。' })}\n\n`);
            res.write('data: [DONE]\n\n');
            return res.end();
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith('data:')) continue;
                const data = trimmed.slice(5).trim();

                if (data === '[DONE]') {
                    res.write('data: [DONE]\n\n');
                    continue;
                }

                try {
                    const parsed = JSON.parse(data);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                        res.write(`data: ${JSON.stringify({ content })}\n\n`);
                    }
                } catch {
                    // skip malformed chunks
                }
            }
        }

        res.write('data: [DONE]\n\n');
        return res.end();
    } catch (err) {
        console.error('Chat proxy error:', err);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'AI 服务请求失败' });
        }
        res.write(`data: ${JSON.stringify({ error: '连接中断' })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
    }
}
