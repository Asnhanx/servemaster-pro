import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
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

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center">
                <span className="material-symbols-outlined mr-2 text-lg">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 bg-surface-dark border-surface-border rounded text-primary focus:ring-primary focus:ring-offset-background-dark"
                    required
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="text-text-secondary">
                    我已阅读并同意 <a href="#" className="text-primary hover:text-primary-hover transition-colors">服务条款</a> 和 <a href="#" className="text-primary hover:text-primary-hover transition-colors">隐私政策</a>
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
            </form>

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
              <button className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-surface-border rounded-xl bg-surface-dark hover:bg-surface-border transition-colors group">
                <img src="https://www.svgrepo.com/show/475633/apple-color.svg" alt="Apple" className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">Apple</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
