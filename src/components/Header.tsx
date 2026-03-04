import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage, LANGUAGES } from '../i18n';
import CheckoutModal from './CheckoutModal';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const isLogin = location.pathname === '/login' || location.pathname === '/register';
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
    setShowLangMenu(false);
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
    { to: '/', label: t.header.features },
    { to: '/app', label: t.header.appControl },
    { to: '/product', label: t.header.specs },
    { to: '/support', label: t.header.support },
  ];

  const currentLang = LANGUAGES.find(l => l.code === lang);

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

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => { setShowLangMenu(!showLangMenu); setShowUserMenu(false); }}
                    className="flex items-center space-x-1 text-sm font-medium text-text-secondary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">language</span>
                    <span>{currentLang?.flag}</span>
                  </button>
                  {showLangMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)}></div>
                      <div className="absolute right-0 mt-2 w-44 bg-surface-dark border border-surface-border rounded-xl shadow-2xl z-50 overflow-hidden">
                        {LANGUAGES.map(l => (
                          <button
                            key={l.code}
                            onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                            className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors ${lang === l.code ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                          >
                            <span>{l.flag}</span>
                            <span>{l.label}</span>
                            {lang === l.code && <span className="material-symbols-outlined text-sm ml-auto">check</span>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {!loading && (
                  user ? (
                    /* Logged in user menu */
                    <div className="relative">
                      <button
                        onClick={() => { setShowUserMenu(!showUserMenu); setShowLangMenu(false); }}
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
                              <p className="text-sm font-medium text-white truncate">{user.user_metadata?.username || 'User'}</p>
                              <p className="text-xs text-text-secondary truncate">{user.email}</p>
                            </div>
                            <button
                              onClick={handleSignOut}
                              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-background-dark transition-colors flex items-center"
                            >
                              <span className="material-symbols-outlined text-sm mr-2">logout</span>
                              {t.header.signOut}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Not logged in */
                    <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">{t.header.login}</Link>
                  )
                )}

                <button onClick={() => setIsCheckoutOpen(true)} className="bg-primary text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                  {t.header.buyNow}
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                  {t.header.backToHome}
                </Link>
                <Link to="/support" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">{t.footer.helpCenter}</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-white transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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

                  {/* Language Selector (Mobile) */}
                  <div className="px-4 py-2">
                    <p className="text-xs text-text-secondary mb-2 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm mr-1 align-middle">language</span>
                      {t.header.language}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {LANGUAGES.map(l => (
                        <button
                          key={l.code}
                          onClick={() => setLang(l.code)}
                          className={`px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors ${lang === l.code ? 'text-primary bg-primary/10 border border-primary/30' : 'text-text-secondary bg-surface-dark hover:text-white border border-surface-border'}`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

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
                            <p className="text-sm font-medium text-white truncate">{user.user_metadata?.username || 'User'}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm mr-2">logout</span>
                          {t.header.signOut}
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                      >
                        <span className="material-symbols-outlined mr-3 text-xl">login</span>
                        {t.header.login}
                      </Link>
                    )
                  )}

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => { setIsMenuOpen(false); setIsCheckoutOpen(true); }}
                      className="block w-full bg-primary text-black px-5 py-3.5 rounded-xl text-base font-bold hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(204,255,0,0.3)] text-center"
                    >
                      {t.header.buyNow}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined mr-3 text-xl">home</span>
                    {t.header.backToHome}
                  </Link>
                  <Link
                    to="/support"
                    className="flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span className="material-symbols-outlined mr-3 text-xl">help</span>
                    {t.footer.helpCenter}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </nav>
  );
}
