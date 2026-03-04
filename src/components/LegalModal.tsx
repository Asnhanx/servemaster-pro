import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n';

type LegalModalType = 'terms' | 'privacy';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: LegalModalType;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
    const { t } = useLanguage();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const title = type === 'terms' ? t.legal.termsTitle : t.legal.privacyTitle;

    const TermsContent = () => (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>{t.legal.lastUpdated}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms1Title}</h3>
            <p>{t.legal.terms1Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms2Title}</h3>
            <p>{t.legal.terms2Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms3Title}</h3>
            <ul className="list-disc pl-5 space-y-2">
                {t.legal.terms3Items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms4Title}</h3>
            <p>{t.legal.terms4Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms5Title}</h3>
            <p>{t.legal.terms5Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.terms6Title}</h3>
            <p>{t.legal.terms6Desc}</p>
        </div>
    );

    const PrivacyContent = () => (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>{t.legal.lastUpdated}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.privacy1Title}</h3>
            <p>{t.legal.privacy1Desc}</p>
            <ul className="list-disc pl-5 space-y-2">
                {t.legal.privacy1Items.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
            </ul>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.privacy2Title}</h3>
            <p>{t.legal.privacy2Desc}</p>
            <ul className="list-disc pl-5 space-y-2">
                {t.legal.privacy2Items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.privacy3Title}</h3>
            <p>{t.legal.privacy3Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.privacy4Title}</h3>
            <p>{t.legal.privacy4Desc}</p>

            <h3 className="text-white font-bold text-base mt-6">{t.legal.privacy5Title}</h3>
            <p>{t.legal.privacy5Desc}</p>
            <ul className="list-disc pl-5 space-y-2">
                {t.legal.privacy5Items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-full max-w-2xl bg-surface-dark border border-surface-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh] pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-surface-border">
                                <h2 className="text-xl font-display font-bold text-white">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-text-secondary hover:text-white transition-colors rounded-full p-1 hover:bg-white/5"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Content (Scrollable) */}
                            <div className="p-5 sm:p-6 overflow-y-auto font-body flex-grow custom-scrollbar">
                                {type === 'terms' ? <TermsContent /> : <PrivacyContent />}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-surface-border flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 bg-primary text-black font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                                >
                                    {t.legal.closeButton}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
