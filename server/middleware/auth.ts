import { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return _supabaseAdmin;
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
    userEmail?: string;
}

/**
 * Middleware to verify Supabase JWT token.
 * Attaches userId and userEmail to the request object.
 */
export async function requireAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: '未提供认证令牌' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await getSupabaseAdmin().auth.getUser(token);

        if (error || !user) {
            res.status(401).json({ error: '认证令牌无效或已过期' });
            return;
        }

        req.userId = user.id;
        req.userEmail = user.email;
        next();
    } catch (err) {
        res.status(500).json({ error: '认证服务异常' });
    }
}

/**
 * Optional auth middleware - doesn't reject unauthenticated requests,
 * but attaches user info if token is present.
 */
export async function optionalAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const { data: { user } } = await getSupabaseAdmin().auth.getUser(token);
            if (user) {
                req.userId = user.id;
                req.userEmail = user.email;
            }
        } catch {
            // Silently ignore auth errors for optional auth
        }
    }

    next();
}
