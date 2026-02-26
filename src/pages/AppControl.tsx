import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function AppControl() {
  return (
    <div className="bg-background-dark text-text-light font-sans pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mesh-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-surface-dark border border-border-dark text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
                ServeMaster App 2.0
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight">
                指尖上的<br />
                <span className="text-gradient">私人教练</span>
              </h1>
              <p className="text-lg md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                告别繁琐的按键设置。通过蓝牙 5.0 无缝连接，在手机上直观地定制你的每一次击球。
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
                  <span className="material-symbols-outlined text-3xl">apple</span>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-normal">Download on the</div>
                    <div>App Store</div>
                  </div>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
                  <span className="material-symbols-outlined text-3xl">android</span>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-normal">GET IT ON</div>
                    <div>Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Mockup Container */}
              <div className="relative w-[320px] h-[650px] bg-black rounded-[3rem] border-[12px] border-surface-dark shadow-2xl overflow-hidden">
                {/* Dynamic Island Mock */}
                <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
                  <div className="w-32 h-7 bg-black rounded-b-3xl"></div>
                </div>
                
                {/* App UI Mockup */}
                <div className="absolute inset-0 bg-[#0f0f0f] flex flex-col pt-12 pb-8 px-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-white font-bold text-xl">Drill Mode</h3>
                      <p className="text-primary text-xs flex items-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Connected
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">settings</span>
                    </div>
                  </div>
                  
                  {/* Court Visualization */}
                  <div className="relative w-full aspect-[3/4] bg-[#1a1a1a] rounded-2xl border border-border-dark mb-6 overflow-hidden">
                    {/* Court Lines */}
                    <div className="absolute inset-4 border-2 border-white/20 rounded-sm"></div>
                    <div className="absolute top-1/2 left-4 right-4 h-0 border-t-2 border-white/20 border-dashed"></div>
                    <div className="absolute top-4 bottom-4 left-1/2 w-0 border-l-2 border-white/20"></div>
                    
                    {/* Target Points */}
                    <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold shadow-[0_0_10px_#ccff00]">1</div>
                    <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-primary text-xs font-bold border border-primary">2</div>
                    <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center text-primary text-xs font-bold border border-primary">3</div>
                  </div>
                  
                  {/* Controls */}
                  <div className="space-y-4 flex-grow">
                    <div className="bg-surface-dark rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-text-muted">Speed</span>
                        <span className="text-white font-bold">110 km/h</span>
                      </div>
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                        <div className="w-[75%] h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-text-muted">Spin</span>
                        <span className="text-white font-bold">Topspin +3</span>
                      </div>
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <button className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg mt-4 shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                    START DRILL
                  </button>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-20 -left-12 glass-panel p-4 rounded-2xl flex items-center space-x-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div>
                  <div className="text-xs text-text-muted">Forehand Win Rate</div>
                  <div className="text-lg font-bold text-white">78% <span className="text-primary text-sm">↑</span></div>
                </div>
              </div>
              
              <div className="absolute bottom-32 -right-16 glass-panel p-4 rounded-2xl flex items-center space-x-4 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500">watch</span>
                </div>
                <div>
                  <div className="text-xs text-text-muted">Apple Watch</div>
                  <div className="text-sm font-bold text-white">Synced</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-surface-dark relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-dark to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">全方位掌控训练</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              不仅仅是遥控器，更是你的数据分析中心和训练计划库。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">tune</span>
              </div>
              <h3 className="text-xl font-bold mb-3">精细参数调节</h3>
              <p className="text-text-muted leading-relaxed">
                滑动滑块即可精确设置球速（30-140km/h）、旋转强度（±10级）和发球间隔（2-10秒）。
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">route</span>
              </div>
              <h3 className="text-xl font-bold mb-3">可视化落点编程</h3>
              <p className="text-text-muted leading-relaxed">
                在虚拟球场上点击即可设定落点。支持创建多达 20 个球的复杂训练序列，模拟真实对局。
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">query_stats</span>
              </div>
              <h3 className="text-xl font-bold mb-3">深度数据分析</h3>
              <p className="text-text-muted leading-relaxed">
                记录每次训练的击球总数、卡路里消耗。生成周/月度报告，直观展示你的进步曲线。
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">cloud_download</span>
              </div>
              <h3 className="text-xl font-bold mb-3">云端训练库</h3>
              <p className="text-text-muted leading-relaxed">
                内置 50+ 职业教练设计的训练计划。支持一键下载并应用到发球机，涵盖从新手到大师的各个阶段。
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">watch</span>
              </div>
              <h3 className="text-xl font-bold mb-3">智能穿戴协同</h3>
              <p className="text-text-muted leading-relaxed">
                完美适配 Apple Watch 与 Wear OS。在手腕上即可控制发球机启停，查看当前训练进度。
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-background-dark p-8 rounded-3xl border border-border-dark hover:border-primary/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-border-dark flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white group-hover:text-primary transition-colors">group</span>
              </div>
              <h3 className="text-xl font-bold mb-3">多账号管理</h3>
              <p className="text-text-muted leading-relaxed">
                支持教练模式，一台机器可绑定多个学员账号，独立记录每个人的训练数据与专属设置。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden text-center bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">立即下载体验</h2>
          <p className="text-text-muted mb-10 text-lg">
            即使尚未购买 ServeMaster Pro，也可下载 App 体验虚拟训练场与数据分析功能。
          </p>
          <div className="flex justify-center space-x-6">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://servemaster.pro" alt="QR Code" className="w-32 h-32 rounded-xl border border-border-dark p-2 bg-white" referrerPolicy="no-referrer" />
            <div className="flex flex-col justify-center text-left">
              <p className="font-bold mb-2">扫描二维码下载</p>
              <p className="text-sm text-text-muted">支持 iOS 14.0 及以上<br/>Android 9.0 及以上</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
