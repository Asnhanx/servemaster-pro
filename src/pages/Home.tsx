import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';
import { useLanguage } from '../i18n';

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="bg-background-dark text-text-main font-body pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1920&auto=format&fit=crop" alt="ServeMaster Pro in action" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-border text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
              {t.home.badge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight">
              {t.home.heroTitle1}<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">{t.home.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t.home.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full sm:w-auto bg-primary text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.4)] text-center">
                {t.home.buyButton}
              </button>
              <Link to="/product" className="w-full sm:w-auto flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-full text-lg font-medium border border-surface-border hover:bg-surface-border transition-colors">
                <span className="material-symbols-outlined">play_circle</span>
                <span>{t.home.watchDemo}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-text-secondary">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 md:py-24 bg-surface-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{t.home.featuresTitle}</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {t.home.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background-dark p-6 md:p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">speed</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t.home.feature1Title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{t.home.feature1Desc}</p>
              <img src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop" alt="Motor detail" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>

            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">my_location</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t.home.feature2Title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{t.home.feature2Desc}</p>
              <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=400&auto=format&fit=crop" alt="Court targeting" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>

            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-surface-border flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">battery_charging_full</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{t.home.feature3Title}</h3>
              <p className="text-text-secondary leading-relaxed mb-6">{t.home.feature3Desc}</p>
              <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=400&auto=format&fit=crop" alt="Battery life" className="w-full h-48 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* App Integration */}
      <section className="py-16 md:py-24 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight whitespace-pre-line">
                {t.home.appTitle}
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                {t.home.appDesc}
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">{t.home.appFeature1Title}</h4>
                    <p className="text-text-secondary text-sm">{t.home.appFeature1Desc}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">{t.home.appFeature2Title}</h4>
                    <p className="text-text-secondary text-sm">{t.home.appFeature2Desc}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="material-symbols-outlined text-primary mr-4 mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-lg">{t.home.appFeature3Title}</h4>
                    <p className="text-text-secondary text-sm">{t.home.appFeature3Desc}</p>
                  </div>
                </li>
              </ul>
              <Link to="/app" className="inline-flex items-center space-x-2 text-primary font-bold hover:text-white transition-colors">
                <span>{t.home.appLearnMore}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=600&auto=format&fit=crop" alt="App Interface" className="relative z-10 rounded-[2.5rem] border-8 border-surface-border shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.home.testimonialsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background-dark p-6 md:p-8 rounded-3xl border border-surface-border">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1560012057-4372e14c5085?q=80&w=60&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full mr-4" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">{t.home.testimonial1Name}</h4>
                  <p className="text-text-secondary text-sm">{t.home.testimonial1Role}</p>
                </div>
              </div>
              <p className="text-base md:text-lg italic text-text-secondary">
                {t.home.testimonial1Text}
              </p>
            </div>
            <div className="bg-background-dark p-8 rounded-3xl border border-surface-border">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=60&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full mr-4" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">{t.home.testimonial2Name}</h4>
                  <p className="text-text-secondary text-sm">{t.home.testimonial2Role}</p>
                </div>
              </div>
              <p className="text-lg italic text-text-secondary">
                {t.home.testimonial2Text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">{t.home.ctaTitle}</h2>
          <p className="text-xl text-text-secondary mb-10">
            {t.home.ctaDesc}
          </p>
          <button onClick={() => setIsCheckoutOpen(true)} className="bg-primary text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(204,255,0,0.5)]">
            {t.home.ctaButton}
          </button>
        </div>
      </section>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
