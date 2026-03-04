import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnimatePresence, motion } from 'motion/react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const isLogin = location.pathname === '/login' || location.pathname === '/register';
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: '核心功能' },
    { to: '/app', label: 'App操控' },
    { to: '/product', label: '技术规格' },
    { to: '/support', label: '客户支持' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white">
              ServeMaster <span className="text-primary">Pro</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLogin ? (
              <>
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                ))}

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

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-white transition-colors"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              <span className="material-symbols-outlined text-[28px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-background-dark/95 backdrop-blur-xl border-t border-surface-border"
          >
            <div className="px-6 py-6 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {!isLogin ? (
                <>
                  {/* Navigation Links */}
                  {navLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all ${location.pathname === link.to
                          ? 'text-primary bg-primary/10'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-surface-border my-4"></div>

                  {/* User Section */}
                  {!loading && (
                    user ? (
                      <div className="space-y-2">
                        <div className="flex items-center px-4 py-3 rounded-xl bg-surface-dark/50">
                          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-3">
                            <span className="text-primary text-sm font-bold">
                              {(user.user_metadata?.username || user.email || '?')[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.user_metadata?.username || '用户'}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm mr-2">logout</span>
                          退出登录
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                      >
                        <span className="material-symbols-outlined mr-3 text-xl">login</span>
                        登录 / 注册
                      </Link>
                    )
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      to="/product"
                      className="block w-full bg-primary text-black px-5 py-3.5 rounded-xl text-base font-bold hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)] text-center"
                    >
                      立即购买
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined mr-3 text-xl">home</span>
                    返回首页
                  </Link>
                  <Link
                    to="/support"
                    className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined mr-3 text-xl">help</span>
                    帮助中心
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
