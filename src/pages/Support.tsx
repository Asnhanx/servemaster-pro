import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Support() {
    const { user, session } = useAuth();
    const [ticketEmail, setTicketEmail] = useState(user?.email || '');
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');
    const [ticketLoading, setTicketLoading] = useState(false);
    const [ticketSuccess, setTicketSuccess] = useState(false);
    const [ticketError, setTicketError] = useState('');

    const handleSubmitTicket = async (e: FormEvent) => {
        e.preventDefault();
        setTicketLoading(true);
        setTicketError('');
        setTicketSuccess(false);

        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };
            if (session?.access_token) {
                headers['Authorization'] = `Bearer ${session.access_token}`;
            }

            const response = await fetch('/api/support/tickets', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    email: ticketEmail,
                    subject: ticketSubject,
                    message: ticketMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setTicketError(data.error || '提交失败，请稍后重试');
                return;
            }

            setTicketSuccess(true);
            setTicketSubject('');
            setTicketMessage('');
        } catch {
            setTicketError('网络错误，请稍后重试');
        } finally {
            setTicketLoading(false);
        }
    };

    return (
        <div className="bg-background-dark text-text-main font-body pt-16">
            {/* Hero Section */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden bg-surface-dark">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 leading-tight">
                            需要帮助？<br />
                            <span className="text-primary">我们随时为您服务。</span>
                        </h1>
                        <div className="relative max-w-2xl mx-auto mt-10">
                            <input
                                type="text"
                                placeholder="搜索常见问题、使用手册或故障排除..."
                                className="w-full bg-background-dark border border-surface-border rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">search</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Link 1 */}
                        <a href="#" className="bg-surface-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-primary">menu_book</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">使用手册与指南</h3>
                            <p className="text-text-secondary text-sm">下载 PDF 格式的快速入门指南和完整用户手册。</p>
                        </a>

                        {/* Link 2 */}
                        <a href="#" className="bg-surface-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-primary">build</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">故障排除</h3>
                            <p className="text-text-secondary text-sm">解决连接问题、卡球或电池充电等常见故障。</p>
                        </a>

                        {/* Link 3 */}
                        <a href="#" className="bg-surface-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-primary">verified</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">保修与维修</h3>
                            <p className="text-text-secondary text-sm">查看保修政策，注册您的设备或申请维修服务。</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-surface-dark relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">常见问题解答 (FAQ)</h2>
                    </div>

                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                                <span className="font-bold text-lg">如何连接 ServeMaster App？</span>
                                <span className="material-symbols-outlined text-primary transform rotate-180 transition-transform">expand_more</span>
                            </button>
                            <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4">
                                请确保您的手机蓝牙已开启。打开 ServeMaster App，点击主界面的"连接设备"，选择列表中显示的 "ServeMaster Pro - XXXX" 即可完成连接。首次连接可能需要长按机器面板上的蓝牙按钮 3 秒。
                            </div>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                                <span className="font-bold text-lg">电池充满需要多长时间？</span>
                                <span className="material-symbols-outlined text-text-secondary transition-transform">expand_more</span>
                            </button>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                                <span className="font-bold text-lg">机器卡球了怎么办？</span>
                                <span className="material-symbols-outlined text-text-secondary transition-transform">expand_more</span>
                            </button>
                        </div>

                        {/* FAQ Item 4 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none">
                                <span className="font-bold text-lg">可以在雨天使用吗？</span>
                                <span className="material-symbols-outlined text-text-secondary transition-transform">expand_more</span>
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <a href="#" className="text-primary hover:text-primary-hover font-bold inline-flex items-center transition-colors">
                            查看所有常见问题 <span className="material-symbols-outlined ml-1">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">没有找到您需要的答案？</h2>
                    <p className="text-text-secondary mb-12 text-lg text-center">
                        我们的技术支持团队随时准备为您提供帮助。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Contact form */}
                        <div className="bg-surface-dark p-8 rounded-3xl border border-surface-border md:col-span-2">
                            <div className="flex items-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-primary mr-3">support_agent</span>
                                <div>
                                    <h4 className="font-bold text-xl">提交工单</h4>
                                    <p className="text-text-secondary text-sm">描述您的问题，我们会尽快回复</p>
                                </div>
                            </div>

                            {ticketSuccess && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-lg">check_circle</span>
                                    工单提交成功！我们会尽快通过邮件回复您。
                                </div>
                            )}

                            {ticketError && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-lg">error</span>
                                    {ticketError}
                                </div>
                            )}

                            <form onSubmit={handleSubmitTicket} className="space-y-4">
                                <div>
                                    <label htmlFor="ticket-email" className="block text-sm font-medium text-text-secondary mb-2">邮箱地址</label>
                                    <input
                                        type="email"
                                        id="ticket-email"
                                        value={ticketEmail}
                                        onChange={(e) => setTicketEmail(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                                        placeholder="输入您的邮箱"
                                        required
                                        disabled={ticketLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticket-subject" className="block text-sm font-medium text-text-secondary mb-2">主题</label>
                                    <input
                                        type="text"
                                        id="ticket-subject"
                                        value={ticketSubject}
                                        onChange={(e) => setTicketSubject(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                                        placeholder="简要描述您遇到的问题"
                                        required
                                        disabled={ticketLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticket-message" className="block text-sm font-medium text-text-secondary mb-2">详细描述</label>
                                    <textarea
                                        id="ticket-message"
                                        rows={4}
                                        value={ticketMessage}
                                        onChange={(e) => setTicketMessage(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50 resize-none"
                                        placeholder="请详细描述您的问题，包括型号、购买时间等信息..."
                                        required
                                        disabled={ticketLoading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={ticketLoading}
                                    className="w-full bg-primary text-black py-3 rounded-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                >
                                    {ticketLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            提交中...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined mr-2 text-sm">send</span>
                                            提交工单
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Quick contact options */}
                        <div className="bg-surface-dark p-8 rounded-3xl border border-surface-border flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-white mb-4">support_agent</span>
                            <h4 className="font-bold text-xl mb-2">在线客服</h4>
                            <p className="text-text-secondary text-sm mb-6">工作日 9:00 - 18:00<br />提供即时技术支持</p>
                            <button className="w-full bg-primary text-black py-3 rounded-full font-bold hover:bg-primary-hover transition-colors">
                                开始对话
                            </button>
                        </div>

                        <div className="bg-surface-dark p-8 rounded-3xl border border-surface-border flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-white mb-4">mail</span>
                            <h4 className="font-bold text-xl mb-2">发送邮件</h4>
                            <p className="text-text-secondary text-sm mb-6">我们将在 24 小时内<br />回复您的邮件</p>
                            <button className="w-full bg-transparent border border-surface-border text-white py-3 rounded-full font-bold hover:bg-surface-border transition-colors">
                                support@servemaster.com
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
