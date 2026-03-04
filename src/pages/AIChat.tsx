import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const MAX_INPUT_LENGTH = 500;

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface RateLimitInfo {
    limit: number;
    remaining: number;
    isGuest: boolean;
}

export default function AIChat() {
    const { session } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: '您好！我是 ServeMaster Pro 智能客服助手 🎾\n\n我可以帮助您解答有关发球机的使用、连接、充电、故障排除和保修等问题。请问有什么可以帮到您的？',
        },
    ]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
    const [rateLimitError, setRateLimitError] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const authHeaders = (): Record<string, string> => {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session?.access_token) {
            headers['Authorization'] = `Bearer ${session.access_token}`;
        }
        return headers;
    };

    // Fetch rate limit info on mount and when session changes
    useEffect(() => {
        const fetchLimit = async () => {
            try {
                const res = await fetch('/api/chat/limit', { headers: authHeaders() });
                if (res.ok) {
                    const data = await res.json();
                    setRateLimitInfo(data);
                }
            } catch {
                // ignore
            }
        };
        fetchLimit();
    }, [session]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [input]);

    const sendMessage = async (e?: FormEvent) => {
        e?.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isStreaming) return;

        if (trimmed.length > MAX_INPUT_LENGTH) return;

        // Check if rate limited
        if (rateLimitInfo && rateLimitInfo.remaining <= 0) {
            setRateLimitError(rateLimitInfo.isGuest
                ? '未登录用户提问次数已用完，请登录后继续使用。'
                : '今日提问次数已达上限，请明天再来。');
            return;
        }

        setRateLimitError('');

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: trimmed,
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsStreaming(true);

        // Create placeholder for assistant response
        const assistantId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        try {
            const apiMessages = updatedMessages
                .filter(m => m.id !== 'welcome') // Don't send welcome message
                .map(m => ({ role: m.role, content: m.content }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                const err = await response.json();
                if (response.status === 429) {
                    setRateLimitError(err.error);
                    setRateLimitInfo(prev => prev ? { ...prev, remaining: 0 } : null);
                }
                setMessages(prev =>
                    prev.map(m =>
                        m.id === assistantId
                            ? { ...m, content: err.error || '抱歉，服务暂时不可用。' }
                            : m,
                    ),
                );
                setIsStreaming(false);
                return;
            }

            // Read SSE stream
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader');

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine.startsWith('data:')) continue;
                    const data = trimmedLine.slice(5).trim();

                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);

                        // First event contains rate limit info
                        if (parsed.remaining !== undefined) {
                            setRateLimitInfo(prev => prev ? { ...prev, remaining: parsed.remaining } : null);
                            continue;
                        }

                        if (parsed.error) {
                            setMessages(prev =>
                                prev.map(m =>
                                    m.id === assistantId ? { ...m, content: parsed.error } : m,
                                ),
                            );
                            break;
                        }
                        if (parsed.content) {
                            setMessages(prev =>
                                prev.map(m =>
                                    m.id === assistantId
                                        ? { ...m, content: m.content + parsed.content }
                                        : m,
                                ),
                            );
                        }
                    } catch {
                        // skip
                    }
                }
            }
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantId
                        ? { ...m, content: '网络连接出错，请稍后重试。' }
                        : m,
                ),
            );
        } finally {
            setIsStreaming(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const isAtLimit = rateLimitInfo ? rateLimitInfo.remaining <= 0 : false;

    return (
        <div className="bg-background-dark text-text-main font-body h-screen flex flex-col">
            {/* Chat Header */}
            <div className="sticky top-0 z-30 bg-surface-dark/80 backdrop-blur-xl border-b border-surface-border flex-shrink-0">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/support"
                            className="w-10 h-10 rounded-xl bg-background-dark flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-text-secondary">arrow_back</span>
                        </Link>
                        <div>
                            <h1 className="font-display font-bold text-lg">AI 智能客服</h1>
                            <div className="flex items-center space-x-2 text-xs text-text-secondary">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span>在线 · 随时为您解答</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Rate limit badge */}
                        {rateLimitInfo && (
                            <div className={`text-xs px-3 py-1.5 rounded-full border ${rateLimitInfo.remaining <= 0
                                ? 'border-red-500/30 bg-red-500/10 text-red-400'
                                : rateLimitInfo.remaining <= 3
                                    ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                                    : 'border-surface-border bg-background-dark text-text-secondary'
                                }`}>
                                剩余 {rateLimitInfo.remaining}/{rateLimitInfo.limit} 次
                                {rateLimitInfo.isGuest && <span className="ml-1 opacity-60 hidden sm:inline">· 游客</span>}
                            </div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">smart_toy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map(msg => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start space-x-3 max-w-[92%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10' : 'bg-white/10'
                                        }`}>
                                        <span className={`material-symbols-outlined text-sm ${msg.role === 'assistant' ? 'text-primary' : 'text-white'
                                            }`}>
                                            {msg.role === 'assistant' ? 'smart_toy' : 'person'}
                                        </span>
                                    </div>

                                    {/* Bubble */}
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-primary text-black rounded-tr-sm'
                                        : 'bg-surface-dark border border-surface-border text-text-main rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                        {msg.role === 'assistant' && msg.content === '' && isStreaming && (
                                            <span className="inline-flex space-x-1">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Rate limit warning */}
            {rateLimitError && (
                <div className="max-w-4xl mx-auto px-4 w-full">
                    <div className="flex items-center space-x-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs mb-2">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        <span>{rateLimitError}</span>
                        {rateLimitInfo?.isGuest && (
                            <Link to="/login" className="ml-auto text-primary hover:text-primary-hover font-bold">
                                去登录 →
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-surface-dark/80 backdrop-blur-xl border-t border-surface-border flex-shrink-0">
                <form onSubmit={sendMessage} className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-end space-x-3">
                        <div className="flex-grow relative">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={e => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                                onKeyDown={handleKeyDown}
                                placeholder={isAtLimit ? '提问次数已用完' : '输入您的问题...'}
                                rows={1}
                                disabled={isStreaming || isAtLimit}
                                maxLength={MAX_INPUT_LENGTH}
                                className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 pr-16 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50 resize-none disabled:opacity-50"
                            />
                            {/* Character counter */}
                            {input.length > 0 && (
                                <span className={`absolute right-3 bottom-3 text-[10px] ${input.length > MAX_INPUT_LENGTH * 0.9 ? 'text-red-400' : 'text-text-secondary/40'
                                    }`}>
                                    {input.length}/{MAX_INPUT_LENGTH}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim() || isStreaming || isAtLimit}
                            className="w-11 h-11 rounded-xl bg-primary text-black flex items-center justify-center hover:bg-primary-hover transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-[0_0_12px_rgba(204,255,0,0.15)]"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                    <p className="text-xs text-text-secondary/50 mt-2 text-center hidden sm:block">
                        AI 回复仅供参考，如需更专业的帮助，请提交工单联系人工客服。
                    </p>
                </form>
            </div>
        </div>
    );
}
