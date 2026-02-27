// Load environment variables BEFORE any other imports
// so that modules like auth.ts can access them at load time
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';
import supportRouter from './routes/support';
import chatRouter from './routes/chat';

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'ServeMaster Pro API',
    });
});

// Routes
app.use('/api/orders', ordersRouter);
app.use('/api/support', supportRouter);
app.use('/api/chat', chatRouter);

// 404 handler
app.use('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
    console.log(`🚀 ServeMaster Pro API server running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
