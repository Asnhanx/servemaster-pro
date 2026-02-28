import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserIdFromHeader, getClientIp, getRateLimitInfo } from './_shared';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const userId = await getUserIdFromHeader(req.headers.authorization as string | undefined);
        const clientIp = getClientIp(req.headers as Record<string, string | string[] | undefined>);
        const info = getRateLimitInfo(userId, clientIp);
        return res.json(info);
    } catch (err) {
        console.error('chat-limit error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
