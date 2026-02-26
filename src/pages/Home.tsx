import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-background-dark text-text-main font-body pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1920&auto=format&fit=crop" alt="ServeMaster Pro in action" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-border text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
              全新一代智能发球机
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight">
              精准喂球，<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">重塑你的击球</span>
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              ServeMaster Pro 结合航空级电机与 AI 算法，提供毫米级落点控制。便携设计，随时随地开启专业训练。
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/product" className="w-full sm:w-auto bg-primary text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.4)] text-center">
                立即购买 ¥8,999
              </Link>
              <Link to="/product" className="w-full sm:w-auto flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-full text-lg font-medium border border-surface-border hover:bg-surface-border transition-colors">
                <span className="material-symbols-outlined">play_circle</span>
                <span>观看演示</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-text-secondary">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">突破性的核心技术</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              每一处细节都为极致的训练体验而设计。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">speed</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">140km/h 极速发球</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                搭载双无刷电机，提供职业级球速与强劲上旋/下旋，真实模拟对手击球。
              </p>
              <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop" alt="Motor detail" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>

            {/* Feature 2 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">my_location</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI 智能落点控制</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                内置高精度传感器，支持 6 点随机落点及自定义训练路线，指哪打哪。
              </p>
              <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=400&auto=format&fit=crop" alt="Court targeting" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>

            {/* Feature 3 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">battery_charging_full</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">6小时超长续航</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                大容量锂电池，支持快充技术。告别电源线束缚，随时随地畅快挥拍。
              </p>
              <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop" alt="Battery life" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* App Integration */}
      <section className="py-24 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                你的私人教练，<br />就在口袋里。
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                通过 ServeMaster App，你可以完全掌控发球机。一键切换训练模式，实时分析击球数据，甚至下载职业选手的经典训练计划。
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">自定义训练序列</h4>
                    <p className="text-text-secondary text-sm">自由组合球速、旋转和落点，创建专属训练计划。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">数据可视化</h4>
                    <p className="text-text-secondary text-sm">记录每次训练的击球数、消耗卡路里及进步曲线。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">Apple Watch 联动</h4>
                    <p className="text-text-secondary text-sm">抬腕即可控制发球机启停，无需频繁查看手机。</p>
                  </div>
                </li>
              </ul>
              <Link to="/app" className="inline-flex items-center space-x-2 text-primary font-bold hover:text-white transition-colors">
                <span>了解更多 App 功能</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=600&auto=format&fit=crop" alt="App Interface" className="relative z-10 rounded-[2.5rem] border-8 border-surface-border shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">来自专业玩家的认可</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=60&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full mr-4" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">张伟</h4>
                  <p className="text-text-secondary text-sm">ITF 认证教练</p>
                </div>
              </div>
              <p className="text-lg italic text-text-secondary">
                "ServeMaster Pro 的旋转和球速非常接近真实比赛。它的便携性让我的教学工作轻松了许多，学生们也更喜欢这种高效的训练方式。"
              </p>
            </div>
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=60&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full mr-4" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">李娜 (业余)</h4>
                  <p className="text-text-secondary text-sm">网球发烧友，NTRP 4.0</p>
                </div>
              </div>
              <p className="text-lg italic text-text-secondary">
                "App 控制简直是神作！我可以自己设定正反手交替的路线，一个人也能练出大汗淋漓的感觉。电池续航也很给力。"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">准备好提升你的比赛了吗？</h2>
          <p className="text-xl text-text-secondary mb-10">
            现在订购，享受 30 天无理由退换及 2 年官方质保。
          </p>
          <Link to="/product" className="inline-block bg-primary text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(204,255,0,0.5)]">
            立即购买 ServeMaster Pro
          </Link>
        </div>
      </section>
    </div>
  );
}
