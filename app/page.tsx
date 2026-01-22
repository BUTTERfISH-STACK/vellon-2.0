import React from 'react';
import StarRating from '@/components/StarRating';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Space Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/5747525-uhd_2160_3240_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
          
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                    Vellon × The Future<br/>
                    <span className="text-white/80">of Talent</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/60 max-w-lg leading-relaxed font-light">
                    From Earth to orbit — talent without borders.
                  </p>
                </div>
                
                <div className="flex justify-center pt-4">
                  <a
                    href="/apps/cv-optimizer-free"
                    className="inline-flex items-center justify-center gap-3 bg-red-600/20 backdrop-blur-sm text-red-400 font-semibold py-4 px-8 rounded-lg border border-red-600/30 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-lg shadow-premium"
                  >
                    Launch Talent Scan
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative h-96 lg:h-full min-h-[400px] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30 rounded-3xl transform rotate-3 blur-xl opacity-50"></div>

                {/* Main Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 group">
                  {/* Orbital Rings */}
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow"></div>
                  <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-reverse-slow"></div>
                  <div className="absolute inset-8 rounded-full border border-white/5 animate-spin-slow"></div>

                  {/* Earth Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-premium group-hover:shadow-glow transition-all duration-500">
                    <img
                      src="/earth-night.jpg"
                      alt="Earth from space at night"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 rounded-full"></div>

                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-500/10 to-cyan-400/20 rounded-full animate-pulse-slow shadow-[0_0_40px_rgba(59,130,246,0.3)]"></div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute -top-4 -right-4 w-3 h-3 bg-accent rounded-full animate-bounce-slow opacity-60"></div>
                  <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-gold rounded-full animate-bounce-reverse-slow opacity-80"></div>
                  <div className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-32 bg-gradient-to-b from-background to-surface/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
                <span className="text-gradient-gold">Elevate</span> Your Career
                <br />
                <span className="text-foreground">With Precision</span>
              </h2>
              <p className="text-xl sm:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-light">
                Sophisticated AI-powered CV optimization — engineered for discerning professionals in competitive South African markets.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Smart Optimization</h3>
                <p className="text-text-muted leading-relaxed">AI analyzes job requirements and optimizes your CV for maximum impact</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Instant Results</h3>
                <p className="text-text-muted leading-relaxed">Professional CV ready in minutes, not hours</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Proven Success</h3>
                <p className="text-text-muted leading-relaxed">Used by thousands of professionals who landed their dream jobs</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a
                href="/apps/cv-optimizer-free"
                className="inline-flex items-center gap-4 bg-gradient-primary text-background font-bold py-6 px-12 rounded-2xl hover:shadow-glow transition-all duration-300 text-xl shadow-premium transform hover:scale-105"
              >
                Start Optimizing
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-4 bg-surface-light/50 backdrop-blur-sm text-foreground font-semibold py-6 px-12 rounded-2xl border-2 border-border/50 hover:border-accent/50 hover:bg-surface transition-all duration-300 text-xl shadow-premium"
              >
                Explore Features
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="text-center text-text-muted mb-8">Trusted by leading companies worldwide</p>
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
                  <div className="text-6xl font-black mb-8">R119.99<span className="text-2xl font-normal opacity-75"> once off</span></div>
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
      </main>
  );
}
