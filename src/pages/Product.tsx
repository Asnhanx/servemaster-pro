import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

export default function Product() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="bg-background-dark text-text-main font-body pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-blueprint">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-dark border border-border-dark text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(226,246,78,0.2)]">
              Pro-Level Engineering
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight text-glow">
              解构极致性能
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              从航空级无刷电机到高精度传动系统，ServeMaster Pro 的每一个部件都为职业级训练而生。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exploded View Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
              {/* Placeholder for exploded view image */}
              <div className="relative z-10 aspect-square bg-surface-dark border border-border-dark rounded-3xl flex items-center justify-center overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1522778147829-047360bdc7f6?q=80&w=800&auto=format&fit=crop" alt="Exploded View" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                <p className="absolute bottom-6 left-6 text-sm text-primary font-mono tracking-widest">FIG 1. CORE ASSEMBLY</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                精密机械，<br />驱动澎湃动力。
              </h2>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">双转子无刷电机</h4>
                    <p className="text-text-secondary leading-relaxed">定制级高扭矩电机，最高转速达 8000 RPM，瞬间爆发 140km/h 极速发球，同时保持极低噪音。</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">动态阻尼发球轮</h4>
                    <p className="text-text-secondary leading-relaxed">采用高分子复合材料，提供卓越的抓球力与耐磨性，精准模拟强力上旋与下旋。</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">航空铝合金底盘</h4>
                    <p className="text-text-secondary leading-relaxed">CNC 精密加工，在保证整机轻量化（仅重 18kg）的同时，提供击球瞬间的绝对稳定性。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specs Table */}
      <section className="py-24 bg-surface-dark relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-dark to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">技术规格参数</h2>
            <p className="text-text-secondary">ServeMaster Pro (Model: SMP-2024)</p>
          </div>

          <div className="bg-background-dark rounded-3xl border border-border-dark overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-dark">
              {/* Column 1 */}
              <div className="p-5 md:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Performance</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">最高球速</span>
                    <span className="font-bold text-sm md:text-lg">140 km/h</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">最低球速</span>
                    <span className="font-bold text-sm md:text-lg">30 km/h</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">发球频率</span>
                    <span className="font-bold text-sm md:text-lg">2 - 10 秒/球</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">装球容量</span>
                    <span className="font-bold text-sm md:text-lg">150 颗</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Spin & Trajectory</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">旋转类型</span>
                    <span className="font-bold text-sm md:text-lg">上旋 / 下旋 / 平击</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">仰角调节</span>
                    <span className="font-bold text-sm md:text-lg">0° - 50° (电子调节)</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">水平摆动</span>
                    <span className="font-bold text-sm md:text-lg">全场随机 / 2线 / 3线</span>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="p-5 md:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Power & Battery</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">电池类型</span>
                    <span className="font-bold text-sm md:text-lg">24V 锂离子电池</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">续航时间</span>
                    <span className="font-bold text-sm md:text-lg">4 - 6 小时</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">充电时间</span>
                    <span className="font-bold text-sm md:text-lg">3 小时 (快充)</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">交流电源</span>
                    <span className="font-bold text-sm md:text-lg">支持边充边用</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Dimensions & Connectivity</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">重量</span>
                    <span className="font-bold text-sm md:text-lg">18 kg</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">尺寸 (收纳)</span>
                    <span className="font-bold text-sm md:text-lg">50 x 35 x 45 cm</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">控制方式</span>
                    <span className="font-bold text-sm md:text-lg">App / 遥控器 / Apple Watch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">准备好体验专业级训练了吗？</h2>
          <p className="text-text-secondary mb-10 text-lg">
            立即选购 ServeMaster Pro，开启你的进阶之路。
          </p>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-primary text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(226,246,78,0.4)]"
          >
            加入购物车 - ¥8,999
          </button>
        </div>
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
