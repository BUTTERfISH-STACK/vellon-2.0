import ParallaxElement from "../components/ParallaxElement";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="relative text-center py-20 sm:py-32 overflow-hidden">
          {/* Background Elements with Parallax */}
          <ParallaxElement speed={-1} className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent rounded-full blur-3xl opacity-20"></div>
          </ParallaxElement>

          {/* Floating decorative elements */}
          <ParallaxElement speed={-0.5} className="absolute top-20 right-20 opacity-20">
            <div className="w-16 h-16 bg-gradient-primary rounded-lg rotate-45 animate-float"></div>
          </ParallaxElement>
          <ParallaxElement speed={-0.8} className="absolute bottom-32 left-16 opacity-15">
            <div className="w-12 h-12 bg-secondary rounded-full animate-float-delayed"></div>
          </ParallaxElement>
          <ParallaxElement speed={-0.3} className="absolute top-40 left-1/4 opacity-25">
            <div className="w-8 h-8 bg-accent rounded-lg animate-float"></div>
          </ParallaxElement>

          <ParallaxElement speed={-0.5} className="relative z-10">
            <div className="inline-block p-1 bg-gradient-primary rounded-full mb-6 animate-glow shadow-warm">
              <div className="bg-surface px-4 py-2 rounded-full">
                <span className="text-primary font-medium text-sm">✨ AI-Powered CV Tools</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight animate-fade-in-up">
              Premium SaaS Platform for CV Optimization
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-text-muted mb-8 leading-relaxed animate-fade-in-up">
              Transform your CV into a professional masterpiece with our AI-powered tools. Stand out in the job market and land your dream role.
            </p>
            <ParallaxElement speed={-0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
                <a
                  href="/pricing"
                  className="inline-block bg-gradient-primary text-white font-semibold py-4 px-8 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
                >
                  Get Started Free
                </a>
                <a
                  href="/about"
                  className="inline-block bg-surface-light backdrop-blur-sm text-foreground font-semibold py-4 px-8 rounded-xl border border-border hover:bg-surface hover:scale-105 transition-all duration-200 shadow-premium"
                >
                  Learn More
                </a>
              </div>
            </ParallaxElement>
          </ParallaxElement>
        </section>

        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Floating background elements */}
          <ParallaxElement speed={-0.8} className="absolute top-20 right-20 opacity-20">
            <div className="w-24 h-24 bg-gradient-primary rounded-full blur-2xl"></div>
          </ParallaxElement>
          <ParallaxElement speed={-1.2} className="absolute bottom-20 left-20 opacity-15">
            <div className="w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
          </ParallaxElement>

          <ParallaxElement speed={-0.3}>
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">Our Tools</h2>
              <p className="text-xl text-text-muted">Free basic tools with premium upgrades powered by AI</p>
            </div>
          </ParallaxElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ParallaxElement speed={-0.1}>
              <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30 animate-fade-in-up">
                <div className="mb-6 flex items-center">
                  <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">Free</span>
                  <span className="ml-3 bg-gradient-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Pro Upgrade</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">CV Optimizer</h2>
                <p className="text-text-muted mb-6 leading-relaxed">
                  Optimize your CV for applicant tracking systems (ATS) and improve your chances of getting noticed by recruiters.
                </p>
                <div className="flex gap-3">
                  <a
                    href="/apps/cv-optimizer"
                    className="inline-block bg-gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200"
                  >
                    Try Free
                  </a>
                  <a
                    href="/pricing"
                    className="inline-block bg-surface text-foreground font-semibold py-3 px-6 rounded-xl border border-border hover:bg-surface-light hover:scale-105 transition-all duration-200"
                  >
                    Go Pro
                  </a>
                </div>
              </div>
            </ParallaxElement>

            <ParallaxElement speed={-0.2}>
              <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30 animate-fade-in-up">
                <div className="mb-6 flex items-center">
                  <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">Free</span>
                  <span className="ml-3 bg-gradient-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Pro Upgrade</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">CV Redo</h2>
                <p className="text-text-muted mb-6 leading-relaxed">
                  Completely redesign your CV with modern templates and layouts that make a lasting impression.
                </p>
                <div className="flex gap-3">
                  <a
                    href="/apps/cv-redo"
                    className="inline-block bg-gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200"
                  >
                    Try Free
                  </a>
                  <a
                    href="/pricing"
                    className="inline-block bg-surface text-foreground font-semibold py-3 px-6 rounded-xl border border-border hover:bg-surface-light hover:scale-105 transition-all duration-200"
                  >
                    Go Pro
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
