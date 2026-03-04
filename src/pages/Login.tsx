import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LegalModal from '../components/LegalModal';
import { useLanguage } from '../i18n';

type AuthMode = 'email' | 'phone';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, sendPhoneOtp, verifyPhoneOtp, signInWithSocial } = useAuth();
  const { t } = useLanguage();

  // Shared state
  const [authMode, setAuthMode] = useState<AuthMode>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Email login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone login state
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message === 'Invalid login credentials'
          ? t.auth.invalidCredentials
          : authError.message);
      } else {
        navigate('/');
      }
    } catch {
      setError(t.auth.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setError(t.auth.phoneRequired);
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fullPhone = phone.startsWith('+') ? phone : `+86${phone}`;
      const { error: otpError } = await sendPhoneOtp(fullPhone);
      if (otpError) {
        setError(otpError.message || t.auth.otpSendFailed);
      } else {
        setOtpSent(true);
        setCountdown(60);
      }
    } catch {
      setError(t.auth.otpSendError);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setError(t.auth.otpRequired);
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fullPhone = phone.startsWith('+') ? phone : `+86${phone}`;
      const { error: authError } = await verifyPhoneOtp(fullPhone, otpCode);
      if (authError) {
        setError(authError.message || t.auth.otpInvalid);
      } else {
        navigate('/');
      }
    } catch {
      setError(t.auth.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setError('');
  };

  return (
    <div className="bg-background-dark text-text-main font-body min-h-screen flex flex-col md:flex-row pt-16">
      {/* Left Section - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 relative bg-surface-dark overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1080&auto=format&fit=crop" alt="Tennis Court" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 to-background-dark/20"></div>
        </div>

        <div className="relative z-10 p-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mb-6 leading-tight">
              {t.auth.welcomeBack}<br />
              <span className="text-primary">ServeMaster</span> {t.auth.community}
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {t.auth.welcomeDesc}
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">cloud_sync</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.auth.cloudSync}</h4>
                  <p className="text-sm text-text-secondary">{t.auth.cloudSyncDesc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">update</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.auth.otaUpdate}</h4>
                  <p className="text-sm text-text-secondary">{t.auth.otaUpdateDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-background-dark">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8 md:mb-10">
              <h1 className="text-3xl font-display font-bold mb-2">{t.login.title}</h1>
              <p className="text-text-secondary">
                {t.login.noAccount} <Link to="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">{t.login.register}</Link>
              </p>
            </div>

            {/* Auth Mode Tabs */}
            <div className="flex bg-surface-dark rounded-xl p-1 mb-8 border border-surface-border">
              <button
                type="button"
                onClick={() => switchMode('email')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${authMode === 'email'
                  ? 'bg-primary text-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-text-secondary hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">mail</span>
                {t.login.tabEmail}
              </button>
              <button
                type="button"
                onClick={() => switchMode('phone')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${authMode === 'phone'
                  ? 'bg-primary text-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-text-secondary hover:text-white'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">phone_android</span>
                {t.login.tabPhone}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center">
                <span className="material-symbols-outlined mr-2 text-lg">error</span>
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {authMode === 'email' ? (
                /* ========== Email Login Form ========== */
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleEmailSubmit}
                  className="space-y-6"
                >
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">{t.login.emailLabel}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">mail</span>
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder={t.login.emailPlaceholder}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-text-secondary">{t.login.passwordLabel}</label>
                      <a href="#" className="text-sm text-primary hover:text-primary-hover transition-colors">{t.login.forgotPassword}</a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">lock</span>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder={t.login.passwordPlaceholder}
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 bg-surface-dark border-surface-border rounded text-primary focus:ring-primary focus:ring-offset-background-dark"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                      {/* 记住我 */}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.login.loggingIn}
                      </>
                    ) : t.login.loginButton}
                  </button>
                </motion.form>
              ) : (
                /* ========== Phone Login Form ========== */
                <motion.form
                  key="phone-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handlePhoneSubmit}
                  className="space-y-6"
                >
                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">{t.login.phoneLabel}</label>
                    <div className="relative flex">
                      <div className="flex items-center bg-surface-dark border border-surface-border border-r-0 rounded-l-xl px-4 text-text-secondary text-sm font-medium shrink-0">
                        <span className="material-symbols-outlined text-[18px] mr-1.5">language</span>
                        +86
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-surface-dark border border-surface-border rounded-r-xl py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder={t.login.phonePlaceholder}
                        maxLength={11}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-text-secondary mb-2">{t.login.otpLabel}</label>
                    <div className="flex space-x-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-text-secondary">pin</span>
                        </div>
                        <input
                          type="text"
                          id="otp"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50 tracking-[0.3em] text-center font-mono"
                          placeholder={t.login.otpPlaceholder}
                          maxLength={6}
                          required
                          disabled={loading}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || countdown > 0}
                        className={`shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${countdown > 0
                          ? 'bg-surface-border text-text-secondary cursor-not-allowed'
                          : 'bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 hover:border-primary/60'
                          } disabled:opacity-60`}
                      >
                        {countdown > 0 ? `${countdown}s` : (otpSent ? t.login.otpSent : t.login.sendOtp)}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !otpCode}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(204,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.login.loggingIn}
                      </>
                    ) : t.login.loginButton}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Social Login Divider */}
            <div className="mt-10 mb-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background-dark text-text-secondary">{t.login.socialTitle}</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => signInWithSocial('google')} type="button" className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Google</span>
              </button>
              <button onClick={() => signInWithSocial('apple')} type="button" className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475633/apple-color.svg" alt="Apple" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-text-secondary">
              {t.register.agreeTerms} <button type="button" onClick={() => setModalType('terms')} className="underline hover:text-white transition-colors">{t.register.termsLink}</button> {t.register.andText} <button type="button" onClick={() => setModalType('privacy')} className="underline hover:text-white transition-colors">{t.register.privacyLink}</button>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal
        isOpen={!!modalType}
        type={modalType || 'terms'}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}
