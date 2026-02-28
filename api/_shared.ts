// Shared constants and helpers for Vercel serverless functions
// This file is imported by chat.ts and chat-limit.ts

// ===================== CONFIGURATION =====================
export const MAX_INPUT_LENGTH = 500;
export const MAX_TOKENS_RESPONSE = 1024;
export const MAX_HISTORY_MESSAGES = 10;
export const GUEST_MESSAGE_LIMIT = 5;
export const USER_DAILY_LIMIT = 20;
export const RATE_WINDOW_MS = 2000;

// ===================== RATE LIMITING STORE =====================
const guestCounters: Record<string, { count: number; lastRequest: number }> = {};
const userDailyCounters: Record<string, { count: number; date: string }> = {};
const lastRequestTime: Record<string, number> = {};

export function getTodayStr(): string {
    return new Date().toISOString().split('T')[0];
}

export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
    const xff = headers['x-forwarded-for'];
    if (typeof xff === 'string') return xff.split(',')[0].trim();
    if (Array.isArray(xff) && xff.length > 0) return xff[0];
    return 'unknown';
}

export async function getUserIdFromHeader(authHeader: string | undefined): Promise<string | null> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

    const token = authHeader.split(' ')[1];
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) return null;

    try {
        // Use fetch directly instead of @supabase/supabase-js to avoid dependency issues
        const resp = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'apikey': supabaseKey,
            },
        });
        if (!resp.ok) return null;
        const user = await resp.json();
        return user?.id || null;
    } catch {
        return null;
    }
}

export function checkRateLimit(userId: string | null, clientIp: string): {
    allowed: boolean; remaining: number; limit: number; error?: string;
} {
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

export function getRateLimitInfo(userId: string | null, clientIp: string) {
    if (userId) {
        const today = getTodayStr();
        const counter = userDailyCounters[userId];
        const used = (counter && counter.date === today) ? counter.count : 0;
        return { limit: USER_DAILY_LIMIT, remaining: USER_DAILY_LIMIT - used, isGuest: false };
    } else {
        const counter = guestCounters[clientIp];
        const used = counter ? counter.count : 0;
        return { limit: GUEST_MESSAGE_LIMIT, remaining: GUEST_MESSAGE_LIMIT - used, isGuest: true };
    }
}

export const SYSTEM_PROMPT = `你是 ServeMaster Pro 的 AI 智能客服助手。ServeMaster Pro 是一款专业智能网球发球机。

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
