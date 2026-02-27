import { Router, Response } from 'express';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// ===================== CONFIGURATION =====================
const MAX_INPUT_LENGTH = 500;        // Max characters per user message
const MAX_TOKENS_RESPONSE = 1024;    // Max tokens for AI response
const MAX_HISTORY_MESSAGES = 10;     // Only send last N messages to API
const GUEST_MESSAGE_LIMIT = 5;       // Max messages for unauthenticated users (per IP, session-based)
const USER_DAILY_LIMIT = 20;         // Max messages per day for authenticated users
const RATE_WINDOW_MS = 2000;         // Min interval between messages (anti-spam)

// ===================== RATE LIMITING STORE =====================
// In-memory stores (reset on server restart)
const guestCounters = new Map<string, { count: number; lastRequest: number }>();
const userDailyCounters = new Map<string, { count: number; date: string }>();
const lastRequestTime = new Map<string, number>();

function getTodayStr(): string {
    return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
}

function getClientIp(req: AuthenticatedRequest): string {
    return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
        || req.socket.remoteAddress
        || 'unknown';
}

function checkRateLimit(req: AuthenticatedRequest): { allowed: boolean; remaining: number; limit: number; error?: string } {
    const userId = req.userId;
    const clientKey = userId || `ip:${getClientIp(req)}`;
    const now = Date.now();

    // Anti-spam: minimum interval between messages
    const last = lastRequestTime.get(clientKey) || 0;
    if (now - last < RATE_WINDOW_MS) {
        const limit = userId ? USER_DAILY_LIMIT : GUEST_MESSAGE_LIMIT;
        return { allowed: false, remaining: 0, limit, error: '请求过于频繁，请稍后再试。' };
    }
    lastRequestTime.set(clientKey, now);

    if (userId) {
        // Authenticated user: daily limit
        const today = getTodayStr();
        const counter = userDailyCounters.get(userId);

        if (!counter || counter.date !== today) {
            userDailyCounters.set(userId, { count: 1, date: today });
            return { allowed: true, remaining: USER_DAILY_LIMIT - 1, limit: USER_DAILY_LIMIT };
        }

        if (counter.count >= USER_DAILY_LIMIT) {
            return { allowed: false, remaining: 0, limit: USER_DAILY_LIMIT, error: `每日提问次数已达上限（${USER_DAILY_LIMIT} 次），请明天再来。` };
        }

        counter.count++;
        return { allowed: true, remaining: USER_DAILY_LIMIT - counter.count, limit: USER_DAILY_LIMIT };
    } else {
        // Guest user: session limit by IP
        const ip = getClientIp(req);
        const counter = guestCounters.get(ip);

        if (!counter) {
            guestCounters.set(ip, { count: 1, lastRequest: now });
            return { allowed: true, remaining: GUEST_MESSAGE_LIMIT - 1, limit: GUEST_MESSAGE_LIMIT };
        }

        if (counter.count >= GUEST_MESSAGE_LIMIT) {
            return { allowed: false, remaining: 0, limit: GUEST_MESSAGE_LIMIT, error: `未登录用户最多提问 ${GUEST_MESSAGE_LIMIT} 次，请登录后继续使用。` };
        }

        counter.count++;
        counter.lastRequest = now;
        return { allowed: true, remaining: GUEST_MESSAGE_LIMIT - counter.count, limit: GUEST_MESSAGE_LIMIT };
    }
}

// ===================== SYSTEM PROMPT =====================
const SYSTEM_PROMPT = `你是 ServeMaster Pro 的 AI 智能客服助手。ServeMaster Pro 是一款专业智能网球发球机。

你的职责：
- 解答用户关于 ServeMaster Pro 发球机的使用、连接、充电、故障排除等问题。
- 提供友好、专业、简洁的中文回复。回复需精简，每次回答控制在 200 字以内。
- 如果用户的问题超出了产品支持范围（如政治、编程等），请礼貌地引导用户回到产品相关话题。
- 在适当情况下推荐用户提交工单以获得更深入的技术支持。
- 不要回复任何与产品无关的长篇大论。

产品关键信息：
- 蓝牙连接：长按电源键 3 秒开机，App 搜索 "ServeMaster Pro - XXXX" 配对。
- 电池续航：4-6 小时，充电 8-12 小时充满，首次使用充电 12 小时。
- 防水等级：IPX3（防溅），不可在雨天使用。
- 保修：主机 12 个月，发球轮/电机 6 个月，电池 90 天。
- 常见问题：卡球时需断电后手动取出；发球无力可能是电量不足或球太旧。`;

// ===================== RATE LIMIT INFO ENDPOINT =====================
router.get('/limit', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;

    if (userId) {
        const today = getTodayStr();
        const counter = userDailyCounters.get(userId);
        const used = (counter && counter.date === today) ? counter.count : 0;
        res.json({ limit: USER_DAILY_LIMIT, remaining: USER_DAILY_LIMIT - used, isGuest: false });
    } else {
        const ip = getClientIp(req);
        const counter = guestCounters.get(ip);
        const used = counter ? counter.count : 0;
        res.json({ limit: GUEST_MESSAGE_LIMIT, remaining: GUEST_MESSAGE_LIMIT - used, isGuest: true });
    }
});

// ===================== CHAT ENDPOINT =====================
router.post('/', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
    const baseUrl = process.env.AI_CHAT_BASE_URL;
    const apiKey = process.env.AI_CHAT_API_KEY;
    const model = process.env.AI_CHAT_MODEL;

    if (!baseUrl || !apiKey || !model) {
        res.status(500).json({ error: 'AI 客服服务未配置，请联系管理员。' });
        return;
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: '请求格式错误' });
        return;
    }

    // ---- Rate limiting check ----
    const rateCheck = checkRateLimit(req);
    if (!rateCheck.allowed) {
        res.status(429).json({ error: rateCheck.error, remaining: rateCheck.remaining, limit: rateCheck.limit });
        return;
    }

    // ---- Input validation ----
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.content && lastMessage.content.length > MAX_INPUT_LENGTH) {
        res.status(400).json({ error: `消息长度不能超过 ${MAX_INPUT_LENGTH} 个字符。` });
        return;
    }

    // ---- Truncate conversation history ----
    const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);

    // Prepend system prompt
    const fullMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...recentMessages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content.slice(0, MAX_INPUT_LENGTH), // Sanitize all messages
        })),
    ];

    try {
        // Set SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        // Send remaining count in first event
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
            res.end();
            return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
            res.write(`data: ${JSON.stringify({ error: '无法读取 AI 响应流。' })}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
            return;
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
                    // Skip malformed JSON chunks
                }
            }
        }

        // Ensure we send DONE
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (err) {
        console.error('Chat proxy error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'AI 服务请求失败' });
        } else {
            res.write(`data: ${JSON.stringify({ error: '连接中断' })}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
        }
    }
});

export default router;
