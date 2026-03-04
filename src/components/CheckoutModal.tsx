import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { user, session } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'applepay' | 'card'>('alipay');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Reset step when modal opens
  if (!isOpen && step !== 'cart') {
    setTimeout(() => {
      setStep('cart');
      setOrderNumber('');
      setOrderError('');
    }, 300);
  }

  const handleNext = async () => {
    if (step === 'cart') {
      if (!user) {
        setOrderError(t.checkout.loginRequired);
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      setOrderLoading(true);
      setOrderError('');

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            payment_method: paymentMethod,
            quantity: 1,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setOrderError(data.error || t.checkout.orderFailed);
          setOrderLoading(false);
          return;
        }

        setOrderNumber(data.order.order_number);
        setStep('success');
      } catch {
        setOrderError(t.support.networkError);
      } finally {
        setOrderLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-surface-dark border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-surface-border">
              <h3 className="text-xl font-bold text-white">
                {step === 'cart' && t.checkout.titleCart}
                {step === 'payment' && t.checkout.titlePayment}
                {step === 'success' && t.checkout.titleSuccess}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-background-dark flex items-center justify-center text-text-secondary hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              {step === 'cart' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 bg-background-dark p-4 rounded-2xl border border-surface-border">
                    <div className="w-24 h-24 bg-surface-dark rounded-xl overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1522778147829-047360bdc7f6?q=80&w=200&auto=format&fit=crop" alt="ServeMaster Pro" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg text-white">{t.checkout.productName}</h4>
                      <p className="text-sm text-text-secondary mb-2">{t.checkout.productDesc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-mono font-bold">¥8,999</span>
                        <span className="text-sm text-text-secondary">x 1</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-background-dark p-6 rounded-2xl border border-surface-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">{t.checkout.subtotal}</span>
                      <span>¥8,999</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">{t.checkout.shipping}</span>
                      <span>{t.checkout.freeShipping}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">{t.checkout.discount}</span>
                      <span className="text-primary">- ¥0</span>
                    </div>
                    <div className="pt-3 border-t border-surface-border flex justify-between items-center">
                      <span className="font-bold">{t.checkout.total}</span>
                      <span className="text-2xl font-mono font-bold text-primary">¥8,999</span>
                    </div>
                  </div>

                  {/* Login prompt for unauthenticated users */}
                  {!user && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 text-sm flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="material-symbols-outlined mr-2 text-lg">info</span>
                        {t.checkout.loginRequired}
                      </div>
                      <Link
                        to="/login"
                        onClick={onClose}
                        className="text-primary hover:text-primary-hover font-bold transition-colors"
                      >
                        {t.checkout.goToLogin}
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <div className="text-center mb-8">
                    <p className="text-text-secondary mb-2">{t.checkout.payAmount}</p>
                    <p className="text-4xl font-mono font-bold text-primary">¥8,999</p>
                  </div>

                  {orderError && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center">
                      <span className="material-symbols-outlined mr-2 text-lg">error</span>
                      {orderError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('alipay')}
                      className={`flex items-center p-4 rounded-xl border transition-all ${paymentMethod === 'alipay' ? 'border-primary bg-primary/5' : 'border-surface-border bg-background-dark hover:border-text-secondary'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1677FF]/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-[#1677FF]">payments</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">{t.checkout.alipay}</div>
                        <div className="text-xs text-text-secondary">{t.checkout.recommended}</div>
                      </div>
                      {paymentMethod === 'alipay' && (
                        <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('wechat')}
                      className={`flex items-center p-4 rounded-xl border transition-all ${paymentMethod === 'wechat' ? 'border-primary bg-primary/5' : 'border-surface-border bg-background-dark hover:border-text-secondary'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#09B83E]/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-[#09B83E]">forum</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">{t.checkout.wechat}</div>
                        <div className="text-xs text-text-secondary">{t.checkout.wechatDesc}</div>
                      </div>
                      {paymentMethod === 'wechat' && (
                        <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('applepay')}
                      className={`flex items-center p-4 rounded-xl border transition-all ${paymentMethod === 'applepay' ? 'border-primary bg-primary/5' : 'border-surface-border bg-background-dark hover:border-text-secondary'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-white">apple</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">Apple Pay</div>
                        <div className="text-xs text-text-secondary">{t.checkout.applePayDesc}</div>
                      </div>
                      {paymentMethod === 'applepay' && (
                        <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-surface-border bg-background-dark hover:border-text-secondary'}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                        <span className="material-symbols-outlined text-purple-500">credit_card</span>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">{t.checkout.card}</div>
                        <div className="text-xs text-text-secondary">{t.checkout.cardDesc}</div>
                      </div>
                      {paymentMethod === 'card' && (
                        <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t.checkout.successTitle}</h3>
                  <p className="text-text-secondary max-w-sm mb-8">
                    {t.checkout.successDesc}
                  </p>
                  <div className="bg-background-dark p-4 rounded-xl border border-surface-border w-full max-w-sm text-left">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-secondary">{t.checkout.orderNumber}</span>
                      <span className="font-mono">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">{t.checkout.estimatedShipping}</span>
                      <span>{t.checkout.shippingTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-surface-border bg-background-dark/50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              {step !== 'success' && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-bold text-text-secondary hover:text-white transition-colors"
                >
                  {t.checkout.cancel}
                </button>
              )}

              {step === 'cart' && (
                <button
                  onClick={handleNext}
                  disabled={!user}
                  className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {t.checkout.proceedToCheckout}
                </button>
              )}

              {step === 'payment' && (
                <button
                  onClick={handleNext}
                  disabled={orderLoading}
                  className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.3)] flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {orderLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.checkout.processing}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined mr-2 text-sm">lock</span>
                      {t.checkout.paySecurely.replace('{amount}', '¥8,999')}
                    </>
                  )}
                </button>
              )}

              {step === 'success' && (
                <button
                  onClick={onClose}
                  className="w-full bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                >
                  {t.checkout.done}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
