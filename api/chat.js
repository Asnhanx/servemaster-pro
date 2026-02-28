const MAX_INPUT_LENGTH = 500;
const MAX_TOKENS_RESPONSE = 1024;
const MAX_HISTORY_MESSAGES = 10;
const GUEST_MESSAGE_LIMIT = 5;
const USER_DAILY_LIMIT = 20;
const RATE_WINDOW_MS = 2000;

const guestCounters = {};
const userDailyCounters = {};
const lastRequestTime = {};

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

function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function getClientIp(headers) {
    const xff = headers['x-forwarded-for'];
    if (typeof xff === 'string') return xff.split(',')[0].trim();
    if (Array.isArray(xff) && xff.length > 0) return xff[0];
    return 'unknown';
}

async function getUserId(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) return null;
    try {
        const resp = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: { 'Authorization': `Bearer ${token}`, 'apikey': supabaseKey },
        });
        if (!resp.ok) return null;
        const user = await resp.json();
        return user?.id || null;
    } catch { return null; }
}

function checkRateLimit(userId, clientIp) {
    const clientKey = userId || `ip:${clientIp}`;
    const now = Date.now();

    const last = lastRequestTime[clientKey] || 0;
    if (now - last < RATE_WINDOW_MS) {
        const limit = userId ? USER_DAILY_LIMIT : GUEST_MESSAGE_LIMIT;
        return { allowed: false, remaining: 0, limit, error: '请求过于频繁，请稍后再试。' };
    }
    lastRequestTime[clientKey] = now;

    if (userId) {
        const today = getTodayStr();
        const counter = userDailyCounters[userId];
        if (!counter || counter.date !== today) {
            userDailyCounters[userId] = { count: 1, date: today };
            return { allowed: true, remaining: USER_DAILY_LIMIT - 1, limit: USER_DAILY_LIMIT };
        }
        if (counter.count >= USER_DAILY_LIMIT) {
            return { allowed: false, remaining: 0, limit: USER_DAILY_LIMIT, error: `每日提问次数已达上限（${USER_DAILY_LIMIT} 次），请明天再来。` };
        }
        counter.count++;
        return { allowed: true, remaining: USER_DAILY_LIMIT - counter.count, limit: USER_DAILY_LIMIT };
    } else {
        const counter = guestCounters[clientIp];
        if (!counter) {
            guestCounters[clientIp] = { count: 1, lastRequest: now };
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

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
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

    try {
        const userId = await getUserId(req.headers.authorization);
        const clientIp = getClientIp(req.headers);
        const rateCheck = checkRateLimit(userId, clientIp);

        if (!rateCheck.allowed) {
            return res.status(429).json({ error: rateCheck.error, remaining: rateCheck.remaining, limit: rateCheck.limit });
        }

        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.content?.length > MAX_INPUT_LENGTH) {
            return res.status(400).json({ error: `消息长度不能超过 ${MAX_INPUT_LENGTH} 个字符。` });
        }

        const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
        const fullMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...recentMessages.map((m) => ({
                role: m.role,
                content: (m.content || '').slice(0, MAX_INPUT_LENGTH),
            })),
        ];

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

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
            return res.status(500).json({ error: 'AI 服务请求失败', detail: String(err) });
        }
        res.write(`data: ${JSON.stringify({ error: '连接中断' })}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
    }
}
