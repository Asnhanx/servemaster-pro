import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserId, getClientIp, getRateLimitInfo } from './_shared';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const userId = await getUserId(req);
    const clientIp = getClientIp(req);
    const info = getRateLimitInfo(userId, clientIp);
    return res.json(info);
}
