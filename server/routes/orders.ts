import { Router, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

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
 * POST /api/orders - Create a new order
 */
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { payment_method, quantity = 1, shipping_address } = req.body;

        if (!payment_method) {
            res.status(400).json({ error: '请选择支付方式' });
            return;
        }

        const validMethods = ['alipay', 'wechat', 'applepay', 'card'];
        if (!validMethods.includes(payment_method)) {
            res.status(400).json({ error: '无效的支付方式' });
            return;
        }

        const totalPrice = 8999 * quantity;
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

        const { data, error } = await getSupabaseAdmin()
            .from('orders')
            .insert({
                user_id: req.userId,
                order_number: orderNumber,
                product_name: 'ServeMaster Pro',
                quantity,
                total_price: totalPrice,
                payment_method,
                status: 'paid',
                shipping_address: shipping_address || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Create order error:', error);
            res.status(500).json({ error: '创建订单失败，请稍后重试' });
            return;
        }

        res.status(201).json({
            message: '订单创建成功',
            order: data,
        });
    } catch (err) {
        console.error('Order creation error:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

/**
 * GET /api/orders - Get current user's orders
 */
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { data, error } = await getSupabaseAdmin()
            .from('orders')
            .select('*')
            .eq('user_id', req.userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fetch orders error:', error);
            res.status(500).json({ error: '获取订单列表失败' });
            return;
        }

        res.json({ orders: data });
    } catch (err) {
        console.error('Orders fetch error:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

/**
 * GET /api/orders/:id - Get a specific order
 */
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { data, error } = await getSupabaseAdmin()
            .from('orders')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.userId)
            .single();

        if (error || !data) {
            res.status(404).json({ error: '订单不存在' });
            return;
        }

        res.json({ order: data });
    } catch (err) {
        console.error('Order fetch error:', err);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

export default router;
