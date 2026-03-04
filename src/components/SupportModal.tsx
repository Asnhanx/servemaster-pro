import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n';

type SupportModalType = 'manual' | 'troubleshooting' | 'warranty';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: SupportModalType;
}

export default function SupportModal({ isOpen, onClose, type }: SupportModalProps) {
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

    const getTitle = () => {
        switch (type) {
            case 'manual': return t.supportModal.manualTitle;
            case 'troubleshooting': return t.supportModal.troubleshootingTitle;
            case 'warranty': return t.supportModal.warrantyTitle;
            default: return '';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'manual': return 'menu_book';
            case 'troubleshooting': return 'build';
            case 'warranty': return 'verified';
            default: return 'help';
        }
    };

    const ManualContent = () => (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-primary font-medium mb-6">
                <span className="material-symbols-outlined mr-2 align-middle">info</span>
                {t.supportModal.manualNotice}
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-2 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">1</span>
                    {t.supportModal.manualStep1Title}
                </h3>
                <p className="mt-2 ml-8">
                    {t.supportModal.manualStep1Desc}
                </p>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">2</span>
                    {t.supportModal.manualStep2Title}
                </h3>
                <p className="mt-2 ml-8">
                    {t.supportModal.manualStep2Desc}
                </p>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">3</span>
                    {t.supportModal.manualStep3Title}
                </h3>
                <ul className="list-disc mt-2 ml-12 space-y-1">
                    {t.supportModal.manualStep3Items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">4</span>
                    {t.supportModal.manualStep4Title}
                </h3>
                <ul className="list-disc mt-2 ml-12 space-y-1">
                    {t.supportModal.manualStep4Items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const TroubleshootingContent = () => (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">

            <div className="space-y-4">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">{t.supportModal.ts1Title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li dangerouslySetInnerHTML={{ __html: t.supportModal.ts1ReasonA }} />
                    <li dangerouslySetInnerHTML={{ __html: t.supportModal.ts1ReasonB }} />
                    <li dangerouslySetInnerHTML={{ __html: t.supportModal.ts1ReasonC }} />
                </ul>
            </div>

            <div className="space-y-4 mt-8">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">{t.supportModal.ts2Title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {t.supportModal.ts2Items.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            </div>

            <div className="space-y-4 mt-8">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">{t.supportModal.ts3Title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {t.supportModal.ts3Items.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            </div>

            <div className="bg-surface-border p-4 rounded-xl mt-6 flex items-start">
                <span className="material-symbols-outlined text-text-secondary mr-3">chat</span>
                <p className="text-xs">{t.supportModal.tsFooter}</p>
            </div>
        </div>
    );

    const WarrantyContent = () => (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">{t.supportModal.warranty1Duration}</div>
                    <div className="text-xs">{t.supportModal.warranty1Label}</div>
                </div>
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">{t.supportModal.warranty2Duration}</div>
                    <div className="text-xs">{t.supportModal.warranty2Label}</div>
                </div>
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">{t.supportModal.warranty3Duration}</div>
                    <div className="text-xs">{t.supportModal.warranty3Label}</div>
                </div>
            </div>

            <h3 className="text-white font-bold text-base mt-6">{t.supportModal.warrantyCoverageTitle}</h3>
            <p>
                {t.supportModal.warrantyCoverageDesc}
            </p>

            <h3 className="text-white font-bold text-base mt-6">{t.supportModal.warrantyExcludeTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
                {t.supportModal.warrantyExcludes.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="text-white font-bold text-base mt-6">{t.supportModal.warrantyProcessTitle}</h3>
            <ul className="list-decimal pl-5 space-y-2">
                {t.supportModal.warrantyProcessSteps.map((item, index) => (
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
                            className="w-full max-w-3xl bg-surface-dark border border-surface-border rounded-2xl shadow-2xl flex flex-col max-h-[85vh] pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center p-6 border-b border-surface-border">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                    <span className="material-symbols-outlined text-primary">{getIcon()}</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex-1">{getTitle()}</h2>
                                <button
                                    onClick={onClose}
                                    className="text-text-secondary hover:text-white transition-colors rounded-full p-2 hover:bg-white/5"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Content (Scrollable) */}
                            <div className="p-6 md:p-8 overflow-y-auto font-body flex-grow custom-scrollbar">
                                {type === 'manual' && <ManualContent />}
                                {type === 'troubleshooting' && <TroubleshootingContent />}
                                {type === 'warranty' && <WarrantyContent />}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-surface-border bg-background-dark/50 rounded-b-2xl flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
                                <p className="text-xs text-text-secondary">{t.supportModal.footerHint}</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-surface-border hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
                                >
                                    {t.supportModal.close}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
