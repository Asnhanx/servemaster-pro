const GUEST_MESSAGE_LIMIT = 5;
const USER_DAILY_LIMIT = 20;

const guestCounters = {};
const userDailyCounters = {};

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

function getRateLimitInfo(userId, clientIp) {
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

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const userId = await getUserId(req.headers.authorization);
        const clientIp = getClientIp(req.headers);
        const info = getRateLimitInfo(userId, clientIp);
        return res.json(info);
    } catch (err) {
        console.error('chat-limit error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
