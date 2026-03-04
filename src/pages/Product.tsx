import { useState } from 'react';
import { motion } from 'motion/react';
import CheckoutModal from '../components/CheckoutModal';
import { useLanguage } from '../i18n';

export default function Product() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="bg-background-dark text-text-main font-body pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-blueprint">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-surface-dark border border-border-dark text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(226,246,78,0.2)]">
              {t.product.badge}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 leading-tight text-glow">
              {t.product.heroTitle1}<br className="md:hidden" />{t.product.heroTitle2}
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              {t.product.heroDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exploded View Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 aspect-square bg-surface-dark border border-border-dark rounded-3xl flex items-center justify-center overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1522778147829-047360bdc7f6?q=80&w=800&auto=format&fit=crop" alt="Exploded View" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                <p className="absolute bottom-6 left-6 text-sm text-primary font-mono tracking-widest">FIG 1. CORE ASSEMBLY</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight whitespace-pre-line">
                {t.product.explodedTitle}
              </h2>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">{t.product.comp1Label}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{t.product.comp1Title}</h4>
                    <p className="text-text-secondary leading-relaxed">{t.product.comp1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">{t.product.comp2Label}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{t.product.comp2Title}</h4>
                    <p className="text-text-secondary leading-relaxed">{t.product.comp2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center mr-6 group-hover:border-primary transition-colors shrink-0">
                    <span className="text-primary font-mono font-bold">{t.product.comp3Label}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{t.product.comp3Title}</h4>
                    <p className="text-text-secondary leading-relaxed">{t.product.comp3Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Specs Table */}
      <section className="py-24 bg-surface-dark relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-dark to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.product.specsTitle}</h2>
            <p className="text-text-secondary">ServeMaster Pro (Model: SMP-2024)</p>
          </div>

          <div className="bg-background-dark rounded-3xl border border-border-dark overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-dark">
              {/* Column 1 */}
              <div className="p-5 md:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Performance</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">{t.product.specBallSpeed}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specBallSpeedVal}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">{t.product.specFreq}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specFreqVal}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">{t.product.specCapacity}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specCapacityVal}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Spin & Trajectory</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">{t.product.specSpin}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specSpinVal}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">{t.product.specSpinSpeed}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specSpinSpeedVal}</span>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="p-5 md:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Power & Battery</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">{t.product.specBattery}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specBatteryVal}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2 mt-4">
                    <span className="text-text-secondary">{t.product.specConnect}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specConnectVal}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Dimensions</h3>
                  <div className="flex justify-between items-end border-b border-border-dark pb-2">
                    <span className="text-text-secondary">{t.product.specWeight}</span>
                    <span className="font-bold text-sm md:text-lg">{t.product.specWeightVal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{t.product.ctaTitle}</h2>
          <p className="text-text-secondary mb-10 text-lg">
            {t.product.ctaDesc}
          </p>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-primary text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-primary-hover transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(226,246,78,0.4)]"
          >
            {t.product.ctaButton}
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
