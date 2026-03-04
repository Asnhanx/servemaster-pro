import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SupportModal from '../components/SupportModal';

type ModalType = 'manual' | 'troubleshooting' | 'warranty';

export default function Support() {
    const { user, session } = useAuth();
    const [ticketEmail, setTicketEmail] = useState(user?.email || '');
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');
    const [ticketLoading, setTicketLoading] = useState(false);
    const [ticketSuccess, setTicketSuccess] = useState(false);
    const [ticketError, setTicketError] = useState('');

    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
                                className="w-full bg-background-dark border border-surface-border rounded-full py-3 md:py-4 pl-10 md:pl-12 pr-6 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm md:text-base"
                            />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">search</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-10 md:py-16 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Link 1 */}
                        <button type="button" onClick={() => setActiveModal('manual')} className="w-full text-left bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center focus:outline-none">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors transform group-hover:scale-110 duration-300">
                                <span className="material-symbols-outlined text-3xl text-primary">menu_book</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">使用手册与指南</h3>
                            <p className="text-text-secondary text-sm">查看快速入门指南、电池充电指引与安全规范。</p>
                        </button>

                        {/* Link 2 */}
                        <button type="button" onClick={() => setActiveModal('troubleshooting')} className="w-full text-left bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center focus:outline-none">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors transform group-hover:scale-110 duration-300">
                                <span className="material-symbols-outlined text-3xl text-primary">build</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">故障排除</h3>
                            <p className="text-text-secondary text-sm">解决连接问题、发球无力、卡球等常见故障。</p>
                        </button>

                        {/* Link 3 */}
                        <button type="button" onClick={() => setActiveModal('warranty')} className="w-full text-left bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center focus:outline-none">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors transform group-hover:scale-110 duration-300">
                                <span className="material-symbols-outlined text-3xl text-primary">verified</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">保修与维修</h3>
                            <p className="text-text-secondary text-sm">查看保修政策与免责条款，了解寄修流程。</p>
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-surface-dark relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">常见问题解答 (FAQ)</h2>
                    </div>

                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">如何连接 ServeMaster App？</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 0 ? 'text-primary rotate-180' : 'text-text-secondary'}`}>expand_more</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openFaq === 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4">
                                            请确保您的手机蓝牙已开启。打开 ServeMaster App，点击主界面的"连接设备"，选择列表中显示的 "ServeMaster Pro - XXXX" 即可完成连接。首次连接可能需要长按机器面板上的蓝牙按钮 3 秒。
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">电池充满需要多长时间？</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 1 ? 'text-primary rotate-180' : 'text-text-secondary'}`}>expand_more</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openFaq === 1 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4">
                                            从完全耗尽到充满约需 8–12 小时，建议在每次训练结束后立即插电充电。充电期间机器背面指示灯为红色，充满后自动转为绿色并停止充电。首次使用前建议充电 12 小时以激活电池最佳性能。正常使用下，充满一次可连续发球 4–6 小时（取决于发球速度和旋转强度设置）。
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">机器卡球了怎么办？</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 2 ? 'text-primary rotate-180' : 'text-text-secondary'}`}>expand_more</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openFaq === 2 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4">
                                            首先立即关闭电源，确保发球轮完全停止转动。清空送球槽中剩余的球，然后将手伸入出球口后方，轻轻将卡住的球向后推出。不要强行拉拽或使用尖锐工具。为了防止卡球，请避免一次性倒入过多网球堵塞落球口，以及混入变形、破损或受潮的球。若反复卡球，可能是发射轮表面磨损，建议联系客服更换。
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 4 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">可以在雨天使用吗？</span>
                                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 3 ? 'text-primary rotate-180' : 'text-text-secondary'}`}>expand_more</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openFaq === 3 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4">
                                            <strong className="text-red-400">不建议在雨天或潮湿环境下使用。</strong> ServeMaster Pro 具备 IPX3 级别的防润设计，可以忍受偶尔的汗水或少量溅水，但并不防水。雨水可能导致电机短路、主板生锈，设备且无法进入保修范围。建议在室内球场或晴天干燥的场地上使用，并在使用完毕后收纳到随附的防尘袋中存放于室内干燥环境。
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">没有找到您需要的答案？</h2>
                    <p className="text-text-secondary mb-8 md:mb-12 text-lg text-center">
                        我们的技术支持团队随时准备为您提供帮助。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Contact form */}
                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border md:col-span-2">
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
                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-white mb-4">smart_toy</span>
                            <h4 className="font-bold text-xl mb-2">在线客服</h4>
                            <p className="text-text-secondary text-sm mb-6">AI 智能客服 24 小时在线<br />提供即时技术支持</p>
                            <Link to="/chat" className="w-full bg-primary text-black py-3 rounded-full font-bold hover:bg-primary-hover transition-colors text-center block">
                                开始对话
                            </Link>
                        </div>

                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border flex flex-col items-center">
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

            {/* Support Modals */}
            <SupportModal
                isOpen={!!activeModal}
                type={activeModal || 'manual'}
                onClose={() => setActiveModal(null)}
            />
        </div>
    );
}
