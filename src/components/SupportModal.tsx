import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type SupportModalType = 'manual' | 'troubleshooting' | 'warranty';

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: SupportModalType;
}

export default function SupportModal({ isOpen, onClose, type }: SupportModalProps) {
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
            case 'manual': return '使用手册与指南';
            case 'troubleshooting': return '故障排除';
            case 'warranty': return '保修与维修';
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
                使用前请完整阅读本手册，以确保安全并发挥设备的最佳性能。
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-2 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">1</span>
                    开箱与组装
                </h3>
                <p className="mt-2 ml-8">
                    确认包装内包含：发球机主机、遥控器、充电器、说明书。将送球轨槽对准主机顶部的卡扣并锁定。确保设备放置在平坦、干燥且没有碎石的网球场地上。
                </p>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">2</span>
                    电池充电
                </h3>
                <p className="mt-2 ml-8">
                    首次使用前请充电满 12 小时。将充电器插入机器背面的 DC 接口。充电时指示灯为红色，充满后变为绿色。正常使用下续航约为 4-6 小时。
                </p>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">3</span>
                    App 蓝牙连接
                </h3>
                <ul className="list-disc mt-2 ml-12 space-y-1">
                    <li>长按主机面板电源键 3 秒开机。</li>
                    <li>打开手机蓝牙，进入 ServeMaster App。</li>
                    <li>点击“配置设备”，靠近机器，选择 "ServeMaster Pro - XXXX"。</li>
                    <li>当面板蓝色蓝牙指示灯常亮时，即表示连接成功。</li>
                </ul>
            </div>

            <div>
                <h3 className="text-white font-bold text-base mt-6 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs mr-2">4</span>
                    安全警告
                </h3>
                <ul className="list-disc mt-2 ml-12 space-y-1">
                    <li><strong>切勿</strong>在机器前方 10 米内站立或阻挡出球口。</li>
                    <li>仅使用标准尺寸网球，不要使用瘪气、过于破旧或进水的球。</li>
                    <li>雨天或场地积水时严禁使用，以防短路损坏。</li>
                </ul>
            </div>
        </div>
    );

    const TroubleshootingContent = () => (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">

            <div className="space-y-4">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">出球无力 / 旋转不够</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>原因 A：电量不足。</strong> 请检查面板电量指示灯，若红灯亮起请立即充电。</li>
                    <li><strong>原因 B：网球过度磨损或潮湿。</strong> 发球轮无法获得足够的摩擦力。请更换一批表面干燥、毛绒完整的新球。</li>
                    <li><strong>原因 C：发球轮积灰积毛。</strong> 使用微湿的抹布清理发射轮表面，然后晾干。</li>
                </ul>
            </div>

            <div className="space-y-4 mt-8">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">机器发生卡球 (Error 02)</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>操作：</strong> 立即使用 App 或遥控器停止发球，然后<strong>关闭电源</strong>。</li>
                    <li><strong>步骤 1：</strong> 清空送球槽中剩余的网球。</li>
                    <li><strong>步骤 2：</strong> 将手伸入出球口后方（确保断电！），手动将卡住的球向后推出至球槽内。</li>
                    <li><strong>防范：</strong> 不要一次性倒入大量球阻塞落球口；确保没有变形的软球混入。</li>
                </ul>
            </div>

            <div className="space-y-4 mt-8">
                <h3 className="text-white font-bold text-base border-b border-surface-border pb-2">蓝牙无法连接 / 经常断联</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>解决方案：</strong> 重启手机蓝牙并重启发球机。确保手机未连接其他过多的蓝牙设备。</li>
                    <li><strong>距离问题：</strong> 最佳连接距离为 15 米无遮挡。如果在底线外远端操作，可能会出现偶发断连。</li>
                    <li><strong>系统权限：</strong> 确保已授予 ServeMaster App "附近设备" 及 "位置信息"（Android 需此权限搜索蓝牙）权限。</li>
                </ul>
            </div>

            <div className="bg-surface-border p-4 rounded-xl mt-6 flex items-start">
                <span className="material-symbols-outlined text-text-secondary mr-3">chat</span>
                <p className="text-xs">如果上述方法无法解决您的问题，请通过下方的工单系统提供 Error Code 及机器序列号（底部贴纸）。</p>
            </div>
        </div>
    );

    const WarrantyContent = () => (
        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">12个月</div>
                    <div className="text-xs">主机硬件保修</div>
                </div>
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">6个月</div>
                    <div className="text-xs">发球轮/电机保修</div>
                </div>
                <div className="flex-1 bg-surface-border p-4 rounded-xl text-center">
                    <div className="text-white font-bold text-lg mb-1">90天</div>
                    <div className="text-xs">电池保修</div>
                </div>
            </div>

            <h3 className="text-white font-bold text-base mt-6">保修范围</h3>
            <p>
                从产品签收之日起计算，在正常使用状态下出现的材质、工艺缺陷或硬件性能故障，凭有效购买凭证免费维修或更换。
            </p>

            <h3 className="text-white font-bold text-base mt-6">以下情况不在保修范围内：</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>任何因使用不当、不可抗力（水浸、雷击、火灾等）导致的损坏。</li>
                <li>擅自拆装机器、刷入非官方固件导致的损坏。</li>
                <li>将机器遗忘在雨中或潮湿环境中存放导致的内部主板短路生锈。</li>
                <li>外壳、轮胎的正常磨损。</li>
            </ul>

            <h3 className="text-white font-bold text-base mt-6">寄修流程</h3>
            <ul className="list-decimal pl-5 space-y-2">
                <li>通过 App 或网页端提交支持工单，详细描述故障现象。</li>
                <li>技术支持人员将于 24 小时内进行远程初诊。</li>
                <li>如需返厂，我们将提供顺丰物流单号。请使用原包装或足够安全的缓冲材料包裹机器寄回。</li>
                <li>维修周期通常为签收后的 5-7 个工作日。</li>
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
                                <p className="text-xs text-text-secondary">如需进一步帮助，请使用下方的"提交工单"系统。</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-surface-border hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
                                >
                                    关闭
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
