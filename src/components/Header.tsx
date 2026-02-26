import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const isLogin = location.pathname === '/login' || location.pathname === '/register';
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white">
              ServeMaster <span className="text-primary">Pro</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {!isLogin ? (
              <>
                <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>核心功能</Link>
                <Link to="/app" className={`text-sm font-medium transition-colors ${location.pathname === '/app' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>App操控</Link>
                <Link to="/product" className={`text-sm font-medium transition-colors ${location.pathname === '/product' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>技术规格</Link>
                <Link to="/support" className={`text-sm font-medium transition-colors ${location.pathname === '/support' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}>客户支持</Link>

                {!loading && (
                  user ? (
                    /* Logged in user menu */
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 text-sm font-medium text-text-secondary hover:text-white transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">
                            {(user.user_metadata?.username || user.email || '?')[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="max-w-[120px] truncate">{user.user_metadata?.username || user.email}</span>
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </button>

                      {showUserMenu && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                          <div className="absolute right-0 mt-2 w-56 bg-surface-dark border border-surface-border rounded-xl shadow-2xl z-50 overflow-hidden">
                            <div className="px-4 py-3 border-b border-surface-border">
                              <p className="text-sm font-medium text-white truncate">{user.user_metadata?.username || '用户'}</p>
                              <p className="text-xs text-text-secondary truncate">{user.email}</p>
                            </div>
                            <button
                              onClick={handleSignOut}
                              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-background-dark transition-colors flex items-center"
                            >
                              <span className="material-symbols-outlined text-sm mr-2">logout</span>
                              退出登录
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Not logged in */
                    <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">登录</Link>
                  )
                )}

                <Link to="/product" className="bg-primary text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                  立即购买
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">返回首页</Link>
                <Link to="/support" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">帮助中心</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-text-secondary hover:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
