import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LegalModal from '../components/LegalModal';

type AuthMode = 'email' | 'phone';

export default function Register() {
  const navigate = useNavigate();
  const { signUp, sendPhoneOtp, signUpWithPhone, signInWithSocial } = useAuth();

  // Shared state
  const [authMode, setAuthMode] = useState<AuthMode>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Email register state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone register state
  const [phoneUsername, setPhoneUsername] = useState('');
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

    if (password.length < 8) {
      setError('密码长度至少为 8 位');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (!agreed) {
      setError('请阅读并同意服务条款和隐私政策');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await signUp(email, password, username);
      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('该邮箱已被注册，请直接登录');
        } else {
          setError(authError.message);
        }
      } else {
        navigate('/');
      }
    } catch {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setError('请输入手机号码');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fullPhone = phone.startsWith('+') ? phone : `+86${phone}`;
      const { error: otpError } = await sendPhoneOtp(fullPhone);
      if (otpError) {
        setError(otpError.message || '验证码发送失败，请重试');
      } else {
        setOtpSent(true);
        setCountdown(60);
      }
    } catch {
      setError('验证码发送失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!phoneUsername.trim()) {
      setError('请输入用户名');
      return;
    }

    if (!otpCode.trim()) {
      setError('请输入验证码');
      return;
    }

    if (!agreed) {
      setError('请阅读并同意服务条款和隐私政策');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const fullPhone = phone.startsWith('+') ? phone : `+86${phone}`;
      const { error: authError } = await signUpWithPhone(fullPhone, otpCode, phoneUsername);
      if (authError) {
        setError(authError.message || '注册失败，请重试');
      } else {
        navigate('/');
      }
    } catch {
      setError('注册失败，请稍后重试');
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
          <img src="https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=1080&auto=format&fit=crop" alt="Tennis Player Serving" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 to-background-dark/20"></div>
        </div>

        <div className="relative z-10 p-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mb-6 leading-tight">
              开启您的<br />
              <span className="text-primary">进阶之旅</span>
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              加入 ServeMaster 社区，解锁专属训练计划，记录每一次挥拍，与全球网球爱好者共同成长。
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">model_training</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">海量训练库</h4>
                  <p className="text-sm text-text-secondary">免费获取 50+ 职业级发球机训练方案。</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">insights</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">深度数据洞察</h4>
                  <p className="text-sm text-text-secondary">可视化您的进步曲线与技术短板。</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-background-dark">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-10">
              <h1 className="text-3xl font-display font-bold mb-2">创建新账号</h1>
              <p className="text-text-secondary">
                已有账号？ <Link to="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">立即登录</Link>
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
                邮箱注册
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
                手机号注册
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
                /* ========== Email Register Form ========== */
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleEmailSubmit}
                  className="space-y-5"
                >
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">用户名</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">person</span>
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder="输入您的用户名"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">邮箱地址</label>
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
                        placeholder="输入您的邮箱"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">密码</label>
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
                        placeholder="设置密码 (至少 8 位)"
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

                  {/* Confirm Password Input */}
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-text-secondary mb-2">确认密码</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">lock_reset</span>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder="再次输入密码"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start mt-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms-email"
                        name="terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4 w-4 bg-surface-dark border-surface-border rounded text-primary focus:ring-primary focus:ring-offset-background-dark"
                        required
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="terms-email" className="text-text-secondary">
                        我已阅读并同意 <button type="button" onClick={() => setModalType('terms')} className="text-primary hover:text-primary-hover transition-colors">服务条款</button> 和 <button type="button" onClick={() => setModalType('privacy')} className="text-primary hover:text-primary-hover transition-colors">隐私政策</button>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(204,255,0,0.2)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        注册中...
                      </>
                    ) : '注 册'}
                  </button>
                </motion.form>
              ) : (
                /* ========== Phone Register Form ========== */
                <motion.form
                  key="phone-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handlePhoneSubmit}
                  className="space-y-5"
                >
                  {/* Username Input */}
                  <div>
                    <label htmlFor="phone-name" className="block text-sm font-medium text-text-secondary mb-2">用户名</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-secondary">person</span>
                      </div>
                      <input
                        type="text"
                        id="phone-name"
                        value={phoneUsername}
                        onChange={(e) => setPhoneUsername(e.target.value)}
                        className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50"
                        placeholder="输入您的用户名"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">手机号码</label>
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
                        placeholder="输入手机号码"
                        maxLength={11}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label htmlFor="reg-otp" className="block text-sm font-medium text-text-secondary mb-2">短信验证码</label>
                    <div className="flex space-x-3">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-text-secondary">pin</span>
                        </div>
                        <input
                          type="text"
                          id="reg-otp"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full bg-surface-dark border border-surface-border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-text-secondary/50 tracking-[0.3em] text-center font-mono"
                          placeholder="输入 6 位验证码"
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
                        {countdown > 0 ? `${countdown}s` : (otpSent ? '重新发送' : '获取验证码')}
                      </button>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start mt-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms-phone"
                        name="terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4 w-4 bg-surface-dark border-surface-border rounded text-primary focus:ring-primary focus:ring-offset-background-dark"
                        required
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label htmlFor="terms-phone" className="text-text-secondary">
                        我已阅读并同意 <button type="button" onClick={() => setModalType('terms')} className="text-primary hover:text-primary-hover transition-colors">服务条款</button> 和 <button type="button" onClick={() => setModalType('privacy')} className="text-primary hover:text-primary-hover transition-colors">隐私政策</button>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !otpCode}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(204,255,0,0.2)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        注册中...
                      </>
                    ) : '注 册'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Social Login Divider */}
            <div className="mt-8 mb-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background-dark text-text-secondary">或使用以下方式注册</span>
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
