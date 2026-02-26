import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-surface-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white mb-4 block">
              ServeMaster <span className="text-primary">Pro</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              重新定义网球训练。<br/>智能、精准、便携。
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">产品</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-text-secondary hover:text-primary text-sm transition-colors">ServeMaster Pro</Link></li>
              <li><Link to="/app" className="text-text-secondary hover:text-primary text-sm transition-colors">智能 App</Link></li>
              <li><Link to="/product" className="text-text-secondary hover:text-primary text-sm transition-colors">技术规格</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">配件商城</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">支持</h4>
            <ul className="space-y-2">
              <li><Link to="/support" className="text-text-secondary hover:text-primary text-sm transition-colors">帮助中心</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">使用手册</a></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">保修政策</a></li>
              <li><a href="#" className="text-text-secondary hover:text-primary text-sm transition-colors">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">关注我们</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all">
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all">
                <span className="material-symbols-outlined text-lg">video_library</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-black transition-all">
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm mb-4 md:mb-0">
            &copy; 2024 ServeMaster Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">隐私政策</a>
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
