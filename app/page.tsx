export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32 animate-fade-in-up">
          <div className="inline-block p-1 bg-gradient-primary rounded-full mb-6 animate-glow">
            <div className="bg-surface px-4 py-2 rounded-full">
              <span className="text-primary font-medium text-sm">✨ AI-Powered CV Tools</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
            Premium SaaS Platform for CV Optimization
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-text-muted mb-8 leading-relaxed">
            Transform your CV into a professional masterpiece with our AI-powered tools. Stand out in the job market and land your dream role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">Our Tools</h2>
            <p className="text-xl text-text-muted">Free basic tools with premium upgrades powered by AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30">
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

            <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30">
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
          </div>
        </section>
      </main>
    </div>
  );
}
