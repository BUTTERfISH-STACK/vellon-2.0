import StarRating from '@/components/StarRating';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Space Background */}
          <div className="absolute inset-0 bg-black/90" style={{backgroundImage: 'url("/space-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          
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
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/apps/cv-optimizer-free"
                    className="inline-flex items-center justify-center gap-3 bg-red-600/20 backdrop-blur-sm text-red-400 font-semibold py-4 px-8 rounded-lg border border-red-600/30 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-lg shadow-premium"
                  >
                    Launch Talent Scan
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#network"
                    className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm text-white/80 font-medium py-4 px-8 rounded-lg border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300 text-lg shadow-premium"
                  >
                    View Global Network
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative h-96 lg:h-full min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl transform rotate-3"></div>
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <img
                    src="/earth-night.jpg"
                    alt="Earth from space at night"
                    className="w-full h-full object-cover rounded-full border border-white/10 shadow-2xl shadow-blue-900/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight">
              <span className="text-gradient-gold">Elevate</span> <span className="animate-flicker-slow">Your Career</span>
              <br />
              <span className="text-foreground">With Precision</span>
            </h1>

            <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-8 leading-relaxed font-light">
              Sophisticated AI-powered CV optimization — engineered for discerning professionals in competitive South African markets.
            </p>

            {/* Key Benefits */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-surface-light/30 backdrop-blur-sm p-6 rounded-2xl border border-border/20">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-premium">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Smart Optimization</h3>
                  <p className="text-text-muted text-sm">AI analyzes job requirements and optimizes your CV for maximum impact</p>
                </div>
                <div className="bg-surface-light/30 backdrop-blur-sm p-6 rounded-2xl border border-border/20">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-premium">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Instant Results</h3>
                  <p className="text-text-muted text-sm">Professional CV ready in minutes, not hours</p>
                </div>
                <div className="bg-surface-light/30 backdrop-blur-sm p-6 rounded-2xl border border-border/20">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-premium">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Proven Success</h3>
                  <p className="text-text-muted text-sm">Used by thousands of professionals who landed their dream jobs</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">10K+</div>
                  <div className="text-sm text-text-muted">CVs Optimized</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">95%</div>
                  <div className="text-sm text-text-muted">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">24/7</div>
                  <div className="text-sm text-text-muted">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">RSA</div>
                  <div className="text-sm text-text-muted">Local Focus</div>
                </div>
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    <StarRating rating={4.9} size="lg" showValue={true} />
                    <div className="text-sm text-text-muted mt-1">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a
                href="/apps/cv-optimizer-free"
                className="inline-flex items-center gap-4 bg-gradient-primary text-background font-bold py-6 px-12 rounded-2xl hover:shadow-glow transition-all duration-300 text-xl shadow-premium transform hover:scale-105"
              >
                Optimize My CV
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-4 bg-surface-light text-foreground font-semibold py-6 px-12 rounded-2xl border-2 border-border/50 hover:border-accent/50 hover:bg-surface transition-all duration-300 text-xl shadow-premium"
              >
                Discover Excellence
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-border/20">
              <p className="text-sm text-text-muted mb-6">Trusted by professionals at leading South African companies</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-xs font-semibold text-text-muted tracking-wider">FEATURED IN</div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    <span className="text-xs font-medium text-text-muted">Business Day</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-xs font-medium text-text-muted">Fin24</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                    <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-xs font-medium text-text-muted">IOL</span>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 bg-gradient-elegant rounded-3xl px-12 mb-32 shadow-premium animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-glow transition-all duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-lg font-medium text-foreground">ATS-Optimized</p>
              <p className="text-text-muted mt-2">Engineered for modern recruitment systems</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-glow transition-all duration-300">
                <span className="text-2xl">🇿🇦</span>
              </div>
              <p className="text-lg font-medium text-foreground">South African Focus</p>
              <p className="text-text-muted mt-2">Trusted by professionals across the nation</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-glow transition-all duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-lg font-medium text-foreground">Instant Excellence</p>
              <p className="text-text-muted mt-2">Professional results in moments</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-glow transition-all duration-300">
                <span className="text-2xl">💎</span>
              </div>
              <p className="text-lg font-medium text-foreground">Premium Quality</p>
              <p className="text-text-muted mt-2">Sophisticated tools for serious careers</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-center text-text-muted">Trusted by professionals at leading South African companies</p>
            <div className="flex justify-center items-center gap-8 mt-6 opacity-60">
              <div className="text-xs font-semibold text-text-muted tracking-wider">FEATURED IN</div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Business Day</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Fin24</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">IOL</span>
                </div>
              </div>
            </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 animate-slide-in-left">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-gradient-gold">The Process</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Three refined steps to professional excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">1</div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">Input Your Information</h3>
              <p className="text-text-muted text-lg leading-relaxed">Provide your professional details through our sophisticated interface</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">2</div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">AI Optimization</h3>
              <p className="text-text-muted text-lg leading-relaxed">Advanced algorithms enhance keywords, structure, and presentation</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-premium group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">3</div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">Receive Excellence</h3>
              <p className="text-text-muted text-lg leading-relaxed">Download your professionally optimized CV, ready for success</p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-32 bg-gradient-elegant rounded-3xl px-12 mb-32 shadow-premium animate-slide-in-right">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-gradient-gold">Professional Excellence</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Sophisticated features designed for career advancement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">ATS Optimization</h3>
              <p className="text-text-muted text-lg leading-relaxed">Precision keyword integration for maximum system compatibility</p>
            </div>
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Refined Formatting</h3>
              <p className="text-text-muted text-lg leading-relaxed">Elegant, professional layouts that command attention</p>
            </div>
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Content Enhancement</h3>
              <p className="text-text-muted text-lg leading-relaxed">Comprehensive rewriting for maximum impact</p>
            </div>
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Premium Export</h3>
              <p className="text-text-muted text-lg leading-relaxed">Polished PDF output ready for professional use</p>
            </div>
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Industry Tailoring</h3>
              <p className="text-text-muted text-lg leading-relaxed">Optimized structure for your specific field</p>
            </div>
            <div className="group bg-surface-light/50 backdrop-blur-sm p-8 rounded-2xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-premium">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Dual Optimization</h3>
              <p className="text-text-muted text-lg leading-relaxed">Appeals to both human recruiters and automated systems</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-32 animate-scale-in">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-8 text-gradient-gold">Investment in Excellence</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto font-light">Transparent pricing for professional results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-elegant rounded-3xl p-10 border border-border/50 shadow-premium hover:shadow-glow transition-all duration-300">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4 text-foreground">Essential</h3>
                <p className="text-text-muted mb-8 text-lg">Professional CV optimization</p>
                <div className="text-4xl font-bold mb-8 text-gradient-gold">Free</div>
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
                <div className="bg-gradient-primary text-background px-6 py-2 rounded-full text-sm font-bold shadow-premium">
                  MOST POPULAR
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Professional</h3>
                <p className="mb-8 text-lg opacity-90">Complete career enhancement suite</p>
                <div className="text-5xl font-bold mb-8">R119.99<span className="text-2xl font-normal opacity-75"> once off</span></div>
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
        </section>

        {/* Why Vellon */}
        <section className="py-32 bg-gradient-elegant rounded-3xl px-12 mb-32 shadow-premium animate-fade-in-up">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold mb-10 text-gradient-gold">Why Choose Vellon?</h2>
            <p className="text-2xl text-text-muted leading-relaxed font-light">
              We crafted Vellon for ambitious professionals who demand excellence. No intermediaries, no compromises — just sophisticated tools engineered for career advancement in competitive markets.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-premium">
                  <span className="text-background text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">Direct to Professional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-premium">
                  <span className="text-background text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">No Hidden Agendas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-premium">
                  <span className="text-background text-sm">✓</span>
                </div>
                <span className="text-foreground font-medium">Results-Driven</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 text-center animate-scale-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold mb-10 text-gradient-gold">Elevate Your Career Today</h2>
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
          <div className="mt-16 pt-8 border-t border-border/20">
            <p className="text-sm text-text-muted mb-6">Trusted by professionals at leading South African companies</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-semibold text-text-muted tracking-wider">FEATURED IN</div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Business Day</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Fin24</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v1H6V8zm0 3h6v1H6v-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-text-muted">IOL</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
