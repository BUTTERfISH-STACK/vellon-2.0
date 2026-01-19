import ParallaxElement from "../components/ParallaxElement";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="relative text-center py-24 sm:py-40 lg:py-48 overflow-hidden">
          {/* Enhanced Background Elements with Parallax */}
          <ParallaxElement speed={-1} className="absolute inset-0 opacity-30">
            <div className="absolute top-16 left-16 w-40 h-40 bg-gradient-primary rounded-full blur-3xl animate-float shadow-bioluminescent"></div>
            <div className="absolute bottom-16 right-16 w-48 h-48 bg-secondary rounded-full blur-3xl animate-float-delayed shadow-bioluminescent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent rounded-full blur-3xl opacity-25 shadow-bioluminescent"></div>
          </ParallaxElement>

          {/* Enhanced Floating decorative elements */}
          <ParallaxElement speed={-0.5} className="absolute top-24 right-24 opacity-20">
            <div className="w-20 h-20 bg-gradient-primary rounded-lg rotate-45 animate-float shadow-glow"></div>
          </ParallaxElement>
          <ParallaxElement speed={-0.8} className="absolute bottom-40 left-20 opacity-15">
            <div className="w-16 h-16 bg-secondary rounded-full animate-float-delayed shadow-glow"></div>
          </ParallaxElement>
          <ParallaxElement speed={-0.3} className="absolute top-48 left-1/4 opacity-25">
            <div className="w-12 h-12 bg-accent rounded-lg animate-float shadow-glow"></div>
          </ParallaxElement>

          <ParallaxElement speed={-0.5} className="relative z-10">
            <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
              <div className="bg-surface px-5 py-2.5 rounded-full">
                <span className="text-primary font-semibold text-sm tracking-wide">✨ AI-Powered CV Tools</span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9] animate-fade-in-up">
              Premium SaaS Platform<br />
              <span className="text-foreground/90">for CV Optimization</span>
            </h1>
            <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed animate-fade-in-up font-light">
              Transform your CV into a professional masterpiece with our AI-powered tools.
              Stand out in the competitive job market and land your dream role with confidence.
            </p>
            <ParallaxElement speed={-0.2}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
                <a
                  href="/pricing"
                  className="group inline-flex items-center gap-3 bg-gradient-primary text-white font-bold py-5 px-10 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-premium text-lg"
                >
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-3 bg-surface-light backdrop-blur-sm text-foreground font-semibold py-5 px-10 rounded-2xl border-2 border-border hover:bg-surface hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-premium text-lg"
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </ParallaxElement>
          </ParallaxElement>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
          {/* Enhanced Floating background elements */}
          <ParallaxElement speed={-0.8} className="absolute top-24 right-24 opacity-20">
            <div className="w-32 h-32 bg-gradient-primary rounded-full blur-2xl shadow-bioluminescent"></div>
          </ParallaxElement>
          <ParallaxElement speed={-1.2} className="absolute bottom-24 left-24 opacity-15">
            <div className="w-40 h-40 bg-secondary rounded-full blur-3xl shadow-bioluminescent"></div>
          </ParallaxElement>
          <ParallaxElement speed={-0.6} className="absolute top-1/2 left-12 opacity-12">
            <div className="w-28 h-28 bg-accent rounded-full blur-2xl shadow-bioluminescent"></div>
          </ParallaxElement>

          <ParallaxElement speed={-0.3}>
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
                Our Tools
              </h2>
              <p className="text-xl sm:text-2xl text-text-muted font-light max-w-3xl mx-auto leading-relaxed">
                Free basic tools with premium upgrades powered by advanced AI technology
              </p>
            </div>
          </ParallaxElement>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ParallaxElement speed={-0.1}>
              <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fade-in-up h-full">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-4 py-2 rounded-full border border-green-500/30 tracking-wide">
                      FREE
                    </span>
                    <span className="bg-gradient-primary text-white text-sm font-bold px-4 py-2 rounded-full tracking-wide">
                      PRO UPGRADE
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                  CV Optimizer
                </h2>
                <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                  Optimize your CV for applicant tracking systems (ATS) and dramatically improve your chances of getting noticed by top recruiters and hiring managers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/apps/cv-optimizer"
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Try Free Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light hover:border-primary/50 hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Go Pro
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </ParallaxElement>

            <ParallaxElement speed={-0.2}>
              <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fade-in-up h-full">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-4 py-2 rounded-full border border-green-500/30 tracking-wide">
                      FREE
                    </span>
                    <span className="bg-gradient-primary text-white text-sm font-bold px-4 py-2 rounded-full tracking-wide">
                      PRO UPGRADE
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                  CV Redo
                </h2>
                <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                  Completely redesign your CV with modern, professional templates and layouts that create lasting impressions and showcase your unique value proposition.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/apps/cv-redo"
                    className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Try Free Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light hover:border-primary/50 hover:scale-105 transition-all duration-300 text-lg"
                  >
                    Go Pro
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </ParallaxElement>
          </div>
        </section>
      </main>
    </div>
  );
}
