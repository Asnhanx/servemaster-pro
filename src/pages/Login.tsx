import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message === 'Invalid login credentials'
          ? '邮箱或密码错误，请重试'
          : authError.message);
      } else {
        navigate('/');
      }
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
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
              欢迎回到<br />
              <span className="text-primary">ServeMaster</span> 社区
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              登录以管理您的设备、查看训练数据分析、下载最新职业训练计划，并与全球玩家分享您的进步。
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">cloud_sync</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">云端数据同步</h4>
                  <p className="text-sm text-text-secondary">您的所有训练记录安全存储在云端。</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">update</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">固件在线升级</h4>
                  <p className="text-sm text-text-secondary">获取最新的发球算法与功能优化。</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-background-dark">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-10">
              <h1 className="text-3xl font-display font-bold mb-2">登录您的账号</h1>
              <p className="text-text-secondary">
                还没有账号？ <Link to="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">立即注册</Link>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center">
                <span className="material-symbols-outlined mr-2 text-lg">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-text-secondary">密码</label>
                  <a href="#" className="text-sm text-primary hover:text-primary-hover transition-colors">忘记密码？</a>
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
                    placeholder="输入密码"
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
                  记住我
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
                    登录中...
                  </>
                ) : '登 录'}
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="mt-10 mb-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background-dark text-text-secondary">或使用以下方式登录</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475633/apple-color.svg" alt="Apple" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-text-secondary">
              登录即表示您同意我们的 <a href="#" className="underline hover:text-white transition-colors">服务条款</a> 和 <a href="#" className="underline hover:text-white transition-colors">隐私政策</a>。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
