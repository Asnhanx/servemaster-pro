import { Router, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { requireAuth, optionalAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return _supabaseAdmin;
}

/**
 * POST /api/support/tickets - Create a new support ticket
 * Supports both authenticated and anonymous submissions
 */
router.post('/tickets', optionalAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            res.status(400).json({ error: '请填写邮箱、主题和消息内容' });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: '请输入有效的邮箱地址' });
            return;
        }

        const { data, error } = await getSupabaseAdmin()
            .from('support_tickets')
            .insert({
                user_id: req.userId || null,
                email,
                subject,
                message,
                status: 'open',
            })
            .select()
            .single();

        if (error) {
            console.error('Create ticket error:', error);
            res.status(500).json({ error: '提交工单失败，请稍后重试' });
            return;
        }

        res.status(201).json({
            message: '工单提交成功，我们会尽快处理',
            ticket: data,
        });
    } catch (err) {
        console.error('Ticket creation error:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

/**
 * GET /api/support/tickets - Get current user's tickets
 */
router.get('/tickets', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { data, error } = await getSupabaseAdmin()
            .from('support_tickets')
            .select('*')
            .eq('user_id', req.userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch tickets error:', error);
            res.status(500).json({ error: '获取工单列表失败' });
            return;
        }

        res.json({ tickets: data });
    } catch (err) {
        console.error('Tickets fetch error:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

export default router;
