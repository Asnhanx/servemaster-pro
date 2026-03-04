import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type LegalModalType = 'terms' | 'privacy';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: LegalModalType;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
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

    const title = type === 'terms' ? 'ServeMaster Pro 服务条款' : 'ServeMaster Pro 隐私政策';

    const TermsContent = () => (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>最后更新日期：2026年2月</p>

            <h3 className="text-white font-bold text-base mt-6">1. 接受条款</h3>
            <p>欢迎使用 ServeMaster Pro（"本应用"）。通过下载、安装、访问或使用本应用及配套的智能网球发球机设备，您同意受本服务条款的约束。如果您不同意这些条款的任何部分，请勿使用本应用。</p>

            <h3 className="text-white font-bold text-base mt-6">2. 账号注册与安全</h3>
            <p>您需要注册账号才能使用应用的完整功能（如自定义训练计划、云端数据同步）。您承诺提供准确、完整的注册信息，并有责任妥善保管您的账号密码及 OTP 验证码。任何通过您账号进行的操作均视为您本人的行为。</p>

            <h3 className="text-white font-bold text-base mt-6">3. 设备使用规范</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>您同意遵守所有安全指南，仅在标准网球场及安全距离内使用 ServeMaster Pro 硬件设备。</li>
                <li>请勿修改、拆解或逆向工程设备的软硬件，这可能造成危险并导致保修失效。</li>
                <li>本应用提供的“职业级发球机训练方案”仅供练习参考，用户应根据自身身体状况量力而行，避免运动损伤。</li>
            </ul>

            <h3 className="text-white font-bold text-base mt-6">4. 数据与订阅</h3>
            <p>我们提供的部分高级训练数据分析和定制化编排可能需要付费订阅。所有费用将在购买前明示，订阅费用不予退还。我们的云端同步服务尽力保证可用性，但不保证绝对不会出现数据丢失现象。</p>

            <h3 className="text-white font-bold text-base mt-6">5. 责任限制</h3>
            <p>在适用法律允许的最大范围内，ServeMaster 对因使用或无法使用本产品而导致的任何直接、间接、偶然、特殊或继发性损害（包括但不限于人身伤害、场地财产损失、数据丢失）不承担责任。</p>

            <h3 className="text-white font-bold text-base mt-6">6. 协议修改</h3>
            <p>我们保留随时修改本条款的权利。重大变更将通过应用内通知或向您的注册邮箱/手机号发送通知。继续使用本服务即表示接受修改后的条款。</p>
        </div>
    );

    const PrivacyContent = () => (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
            <p>最后更新日期：2026年2月</p>

            <h3 className="text-white font-bold text-base mt-6">1. 信息收集</h3>
            <p>为了提供发球机控制与数据分析服务，我们会收集以下类型的信息：</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>账号信息：</strong> 邮箱、手机号、用户名和登录凭据（通过 Supabase、Google 或 Apple 加密处理）。</li>
                <li><strong>设备与连接信息：</strong> 蓝牙连接状态、发球机硬件状态、固件版本号。</li>
                <li><strong>训练数据：</strong> 您保存的自定义训练模板、发球速度/旋转设置、击球统计和进度数据。</li>
            </ul>

            <h3 className="text-white font-bold text-base mt-6">2. 信息使用</h3>
            <p>我们收集的信息仅用于：</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>实现手机与设备的配对与遥控。</li>
                <li>提供训练数据统计、历史图表与能力分析（"深度数据洞察"）。</li>
                <li>处理账号登录验证（包括发送 SMS OTP）。</li>
                <li>推送必要的固件更新（"固件在线升级"）。</li>
            </ul>

            <h3 className="text-white font-bold text-base mt-6">3. 数据储存与安全</h3>
            <p>您的训练记录和个人资料安全储存在云端。我们使用行业标准的加密技术在传输（TLS）和静止时保护您的数据。除了您明确同意分享的数据外，您的训练细节对其他用户不可见。</p>

            <h3 className="text-white font-bold text-base mt-6">4. 信息共享</h3>
            <p>我们不会向任何第三方出售您的个人数据。仅在以下情况下共享必要信息：为了向您发送短信验证码，我们会与指定的 SMS 服务提供商共享您的手机号码；应法律法规或政府命令的要求。</p>

            <h3 className="text-white font-bold text-base mt-6">5. 您的权利</h3>
            <p>您随时有权：</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>在应用内更新您的账户信息。</li>
                <li>要求导出您的所有训练历史数据。</li>
                <li>永久注销账号并删除云端及设备上的所有关联数据。</li>
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
                                    我已了解并闭关
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
