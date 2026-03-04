import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SupportModal from '../components/SupportModal';
import { useLanguage } from '../i18n';

type ModalType = 'manual' | 'troubleshooting' | 'warranty';

export default function Support() {
    const { user, session } = useAuth();
    const { t } = useLanguage();
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
                setTicketError(data.error || t.support.ticketError);
                return;
            }

            setTicketSuccess(true);
            setTicketSubject('');
            setTicketMessage('');
        } catch {
            setTicketError(t.support.networkError);
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
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 leading-tight whitespace-pre-line">
                            {t.support.heroTitle.split('\n')[0]}<br />
                            <span className="text-primary">{t.support.heroTitle.split('\n')[1]}</span>
                        </h1>
                        <div className="relative max-w-2xl mx-auto mt-10">
                            <input
                                type="text"
                                placeholder={t.support.searchPlaceholder}
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
                            <h3 className="text-xl font-bold mb-2">{t.support.manualTitle}</h3>
                            <p className="text-text-secondary text-sm">{t.support.manualDesc}</p>
                        </button>

                        {/* Link 2 */}
                        <button type="button" onClick={() => setActiveModal('troubleshooting')} className="w-full text-left bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center focus:outline-none">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors transform group-hover:scale-110 duration-300">
                                <span className="material-symbols-outlined text-3xl text-primary">build</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.support.troubleshootingTitle}</h3>
                            <p className="text-text-secondary text-sm">{t.support.troubleshootingDesc}</p>
                        </button>

                        {/* Link 3 */}
                        <button type="button" onClick={() => setActiveModal('warranty')} className="w-full text-left bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group flex flex-col items-center text-center focus:outline-none">
                            <div className="w-16 h-16 rounded-full bg-background-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors transform group-hover:scale-110 duration-300">
                                <span className="material-symbols-outlined text-3xl text-primary">verified</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t.support.warrantyTitle}</h3>
                            <p className="text-text-secondary text-sm">{t.support.warrantyDesc}</p>
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-surface-dark relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.support.faqTitle}</h2>
                    </div>

                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 0 ? null : 0)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">{t.support.faq1Q}</span>
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
                                            {t.support.faq1A}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">{t.support.faq2Q}</span>
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
                                            {t.support.faq2A}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">{t.support.faq3Q}</span>
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
                                            {t.support.faq3A}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* FAQ Item 4 */}
                        <div className="bg-background-dark rounded-2xl border border-surface-border overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center focus:outline-none hover:bg-white/[0.02] transition-colors">
                                <span className="font-bold text-base md:text-lg">{t.support.faq4Q}</span>
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
                                        <div className="px-6 pb-5 text-text-secondary leading-relaxed border-t border-surface-border pt-4 text-justify" dangerouslySetInnerHTML={{ __html: t.support.faq4A }}>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <a href="#" className="text-primary hover:text-primary-hover font-bold inline-flex items-center transition-colors">
                            {t.support.viewAllFaq} <span className="material-symbols-outlined ml-1">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">{t.support.contactTitle}</h2>
                    <p className="text-text-secondary mb-8 md:mb-12 text-lg text-center">
                        {t.support.contactDesc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Contact form */}
                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border md:col-span-2">
                            <div className="flex items-center mb-6">
                                <span className="material-symbols-outlined text-3xl text-primary mr-3">support_agent</span>
                                <div>
                                    <h4 className="font-bold text-xl">{t.support.ticketTitle}</h4>
                                    <p className="text-text-secondary text-sm">{t.support.ticketDesc}</p>
                                </div>
                            </div>

                            {ticketSuccess && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-lg">check_circle</span>
                                    {t.support.ticketSuccess}
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
                                    <label htmlFor="ticket-email" className="block text-sm font-medium text-text-secondary mb-2">{t.support.ticketEmailLabel}</label>
                                    <input
                                        type="email"
                                        id="ticket-email"
                                        value={ticketEmail}
                                        onChange={(e) => setTicketEmail(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                                        placeholder={t.support.ticketEmailPlaceholder}
                                        required
                                        disabled={ticketLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticket-subject" className="block text-sm font-medium text-text-secondary mb-2">{t.support.ticketSubjectLabel}</label>
                                    <input
                                        type="text"
                                        id="ticket-subject"
                                        value={ticketSubject}
                                        onChange={(e) => setTicketSubject(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                                        placeholder={t.support.ticketSubjectPlaceholder}
                                        required
                                        disabled={ticketLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticket-message" className="block text-sm font-medium text-text-secondary mb-2">{t.support.ticketMessageLabel}</label>
                                    <textarea
                                        id="ticket-message"
                                        rows={4}
                                        value={ticketMessage}
                                        onChange={(e) => setTicketMessage(e.target.value)}
                                        className="w-full bg-background-dark border border-surface-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50 resize-none"
                                        placeholder={t.support.ticketMessagePlaceholder}
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
                                            {t.support.ticketSubmitting}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined mr-2 text-sm">send</span>
                                            {t.support.ticketSubmitButton}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Quick contact options */}
                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-white mb-4">smart_toy</span>
                            <h4 className="font-bold text-xl mb-2">{t.support.liveChatTitle}</h4>
                            <p className="text-text-secondary text-sm mb-6 whitespace-pre-line">{t.support.liveChatDesc}</p>
                            <Link to="/chat" className="w-full bg-primary text-black py-3 rounded-full font-bold hover:bg-primary-hover transition-colors text-center block">
                                {t.support.liveChatButton}
                            </Link>
                        </div>

                        <div className="bg-surface-dark p-6 md:p-8 rounded-3xl border border-surface-border flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-white mb-4">mail</span>
                            <h4 className="font-bold text-xl mb-2">{t.support.emailTitle}</h4>
                            <p className="text-text-secondary text-sm mb-6 whitespace-pre-line">{t.support.emailDesc}</p>
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
