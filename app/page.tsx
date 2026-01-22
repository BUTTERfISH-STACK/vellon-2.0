import React from 'react';
import StarRating from '@/components/StarRating';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        {/* Hero Section */}
        <section className="min-h-[100svh] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
          {/* Space Background Video - Hidden on mobile for performance */}
          <video
            className="hidden sm:block absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/space-bg.jpg"
          >
            <source src="/5747525-uhd_2160_3240_24fps.mp4" type="video/mp4" />
          </video>
          {/* Mobile background image */}
          <div className="sm:hidden absolute inset-0 bg-black/90" style={{backgroundImage: 'url("/space-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="absolute inset-0 bg-black/50 sm:bg-black/40"></div>
          
          {/* Cinematic Noise Overlay */}
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          
          {/* Ghosted V Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[20rem] lg:text-[30rem] font-black text-white/5 opacity-10 blur-sm animate-pulse-slow" style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}>
              V
            </div>
          </div>
          
          {/* Orbital Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 450C200 674.5 425.5 850 720 850C1014.5 850 1240 674.5 1240 450C1240 225.5 1014.5 50 720 50C425.5 50 200 225.5 200 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <path d="M300 450C300 612.5 462.5 750 680 750C897.5 750 1060 612.5 1060 450C1060 287.5 897.5 150 680 150C462.5 150 300 287.5 300 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <path d="M400 450C400 549.5 509.5 650 650 650C790.5 650 890 549.5 890 450C890 350.5 790.5 250 650 250C509.5 250 400 350.5 400 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="w-full max-w-4xl mx-auto">
              {/* Content */}
              <div className="text-center space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter" style={{ textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4)' }}>
                    Vellon × The Future<br/>
                    <span className="text-white/80">of Talent</span>
                  </h1>
                  <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
                    From Earth to orbit — talent without borders.
                  </p>
                </div>

                <div className="pt-6 sm:pt-4 space-y-4">
                  <a
                    href="/apps"
                    className="inline-flex items-center justify-center gap-3 bg-red-600/25 backdrop-blur-sm text-red-300 font-semibold py-6 px-10 sm:py-5 sm:px-8 rounded-xl border border-red-500/40 hover:bg-red-600/35 hover:text-red-200 transition-all duration-300 text-lg sm:text-base shadow-premium min-h-[56px] sm:min-h-[48px] touch-manipulation w-full max-w-xs mx-auto"
                  >
                    Explore All Tools
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </a>
                  <a
                    href="/apps/cv-optimizer-free"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold py-6 px-10 sm:py-5 sm:px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg sm:text-base shadow-premium min-h-[56px] sm:min-h-[48px] touch-manipulation w-full max-w-xs mx-auto"
                  >
                    Quick CV Scan
                    <svg className="w-6 h-6 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-surface/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight tracking-tight">
                <span className="text-gradient-gold">Elevate</span> <span className="text-foreground" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)' }}>Your Career</span>
                <br />
                <span className="text-foreground">With Precision</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-light px-4">
                Sophisticated AI-powered CV optimization — engineered for discerning professionals in competitive South African markets.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-20">
              <div className="text-center group px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-2xl sm:text-3xl">🎯</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Smart Optimization</h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">AI analyzes job requirements and optimizes your CV for maximum impact</p>
              </div>
              <div className="text-center group px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-2xl sm:text-3xl">⚡</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Instant Results</h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">Professional CV ready in minutes, not hours</p>
              </div>
              <div className="text-center group px-4 sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-2xl sm:text-3xl">🏆</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">Proven Success</h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">Used by thousands of professionals who landed their dream jobs</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4">
              <a
                href="/apps/cv-optimizer-free"
                className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-primary text-background font-bold py-5 sm:py-6 px-8 sm:px-12 rounded-2xl hover:shadow-glow transition-all duration-300 text-lg sm:text-xl shadow-premium transform hover:scale-105 min-h-[52px] touch-manipulation w-full max-w-sm sm:w-auto"
              >
                Start Optimizing
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-3 sm:gap-4 bg-surface-light/50 backdrop-blur-sm text-foreground font-semibold py-5 sm:py-6 px-8 sm:px-12 rounded-2xl border-2 border-border/50 hover:border-accent/50 hover:bg-surface transition-all duration-300 text-lg sm:text-xl shadow-premium min-h-[52px] touch-manipulation w-full max-w-sm sm:w-auto"
              >
                Explore Features
                <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold mb-4">10K+</div>
                <div className="text-lg text-text-muted font-medium">CVs Optimized</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold mb-4">95%</div>
                <div className="text-lg text-text-muted font-medium">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold mb-4">24/7</div>
                <div className="text-lg text-text-muted font-medium">AI Support</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold mb-4">RSA</div>
                <div className="text-lg text-text-muted font-medium">Local Focus</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-20 pt-12 border-t border-border/20">
              <p className="text-center text-text-muted mb-8" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)' }}>Trusted by leading companies worldwide</p>
              <div className="flex justify-center items-center gap-8 opacity-70">
                <div className="text-xs font-semibold text-text-muted tracking-wider">TRUSTED BY</div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <img src="/lumi.svg" alt="Lumi" className="w-5 h-5" />
                    <span className="text-xs font-medium text-text-muted">Lumi</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <img src="/bitbucket.svg" alt="Bitbucket" className="w-5 h-5" />
                    <span className="text-xs font-medium text-text-muted">Bitbucket</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <img src="/bizzabo.svg" alt="Bizzabo" className="w-5 h-5" />
                    <span className="text-xs font-medium text-text-muted">Bizzabo</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <img src="/lucid.svg" alt="Lucid" className="w-5 h-5" />
                    <span className="text-xs font-medium text-text-muted">Lucid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-gradient-gold">Professional Excellence</h2>
              <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Sophisticated features designed for career advancement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">ATS Optimization</h3>
                <p className="text-text-muted leading-relaxed">Precision keyword integration for maximum system compatibility</p>
              </div>
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Refined Formatting</h3>
                <p className="text-text-muted leading-relaxed">Elegant, professional layouts that command attention</p>
              </div>
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Content Enhancement</h3>
                <p className="text-text-muted leading-relaxed">Comprehensive rewriting for maximum impact</p>
              </div>
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Premium Export</h3>
                <p className="text-text-muted leading-relaxed">Polished PDF output ready for professional use</p>
              </div>
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Industry Tailoring</h3>
                <p className="text-text-muted leading-relaxed">Optimized structure for your specific field</p>
              </div>
              <div className="group bg-surface-light/30 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Dual Optimization</h3>
                <p className="text-text-muted leading-relaxed">Appeals to both human recruiters and automated systems</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 bg-gradient-to-b from-surface/20 to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-gradient-gold">The Process</h2>
              <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Three refined steps to professional excellence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">1</div>
                <h3 className="text-3xl font-bold mb-6 text-foreground">Input Your Information</h3>
                <p className="text-text-muted text-lg leading-relaxed">Provide your professional details through our sophisticated interface</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">2</div>
                <h3 className="text-3xl font-bold mb-6 text-foreground">AI Optimization</h3>
                <p className="text-text-muted text-lg leading-relaxed">Advanced algorithms enhance keywords, structure, and presentation</p>
              </div>
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">3</div>
                <h3 className="text-3xl font-bold mb-6 text-foreground">Receive Excellence</h3>
                <p className="text-text-muted text-lg leading-relaxed">Download your professionally optimized CV, ready for success</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-gradient-gold">Investment in Excellence</h2>
              <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Transparent pricing for professional results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-gradient-elegant rounded-3xl p-10 border border-border/50 shadow-premium hover:shadow-glow transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4 text-foreground">Essential</h3>
                  <p className="text-text-muted mb-8 text-lg">Professional CV optimization</p>
                  <div className="text-5xl font-black mb-8 text-gradient-gold">Free</div>
                  <ul className="space-y-4 mb-10 text-left">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-accent text-sm">✓</span>
                      </div>
                      <span className="text-foreground">ATS keyword optimization</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-accent text-sm">✓</span>
                      </div>
                      <span className="text-foreground">Professional formatting</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-accent text-sm">✓</span>
                      </div>
                      <span className="text-foreground">Single PDF export</span>
                    </li>
                  </ul>
                  <a
                    href="/apps/cv-optimizer-free"
                    className="inline-block bg-gradient-primary text-background font-bold py-4 px-8 rounded-2xl hover:shadow-glow transition-all duration-300 w-full text-center text-lg shadow-premium"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              <div className="bg-gradient-primary rounded-3xl p-10 text-background relative shadow-premium hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-background text-accent px-6 py-2 rounded-full text-sm font-bold shadow-premium">
                    MOST POPULAR
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">Professional</h3>
                  <p className="mb-8 text-lg opacity-90">Complete career enhancement suite</p>
                  <div className="text-6xl font-black mb-8">R14.99 <span className="line-through text-white/60">R119.99</span><span className="text-2xl font-normal opacity-75"> once off</span></div>
                  <ul className="space-y-4 mb-10 text-left">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center">
                        <span className="text-background text-sm">✓</span>
                      </div>
                      <span>Advanced AI optimization</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center">
                        <span className="text-background text-sm">✓</span>
                      </div>
                      <span>Premium templates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center">
                        <span className="text-background text-sm">✓</span>
                      </div>
                      <span>Unlimited exports</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center">
                        <span className="text-background text-sm">✓</span>
                      </div>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <a
                    href="/pricing"
                    className="inline-block bg-background text-accent font-bold py-4 px-8 rounded-2xl hover:bg-background/90 transition-all duration-300 w-full text-center text-lg shadow-premium"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-gradient-to-b from-surface/20 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 text-gradient-gold">Elevate Your Career Today</h2>
            <p className="text-xl text-text-muted mb-12 font-light">Join thousands of professionals who have transformed their career trajectory</p>
            <a
              href="/apps/cv-optimizer-free"
              className="inline-flex items-center gap-4 bg-gradient-primary text-background font-bold py-6 px-12 rounded-2xl hover:shadow-glow transition-all duration-300 text-xl shadow-premium transform hover:scale-105"
            >
              Begin Your Transformation
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Community & Support */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 text-gradient-gold">Join Our Community</h2>
            <p className="text-lg text-text-muted mb-12 font-light max-w-2xl mx-auto">
              Connect with fellow professionals, share experiences, and get support from our community
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="bg-surface-light/50 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">WhatsApp Community</h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  Join our active WhatsApp group to connect with other professionals, share tips, and get instant support
                </p>
                <a
                  href="https://chat.whatsapp.com/GnALiara9vF6mY4ff3nxdq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-premium hover:shadow-glow"
                >
                  Join Community
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>

              <div className="bg-surface-light/50 backdrop-blur-sm p-8 rounded-3xl border border-border/30 hover:border-accent/50 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Customer Support</h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  Have questions, feedback, or need assistance? Our support team is here to help you succeed
                </p>
                <a
                  href="mailto:support@vellon.co.za"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-premium hover:shadow-glow"
                >
                  Contact Support
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-text-muted">
                For complaints and feedback, please reach out to our support team or join our community group
              </p>
            </div>
          </div>
        </section>
      </main>
  );
}
