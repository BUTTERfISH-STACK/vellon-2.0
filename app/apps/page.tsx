export default function AppsPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">🛠️ OUR APPS</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9]">
            Powerful Tools for<br />
            <span className="text-foreground/90">Career Success</span>
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Discover our suite of AI-powered applications designed to transform your career. Start with our free tools and upgrade when you're ready.
          </p>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 animate-fade-in-up">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30 tracking-wide">
                      FREE
                    </span>
                    <span className="bg-gradient-primary text-white text-sm font-bold px-3 py-1 rounded-full tracking-wide">
                      PRO UPGRADE
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                    CV Optimizer
                  </h2>
                </div>
              </div>
              <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                Create professional, ATS-ready CVs from scratch with our intuitive form builder. Get AI-powered optimization, modern templates, and expert guidance to stand out in the job market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/apps/cv-optimizer"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
                >
                  Try CV Optimizer
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light hover:border-primary/50 hover:scale-105 transition-all duration-300 text-lg"
                >
                  View Pricing
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 animate-fade-in-up">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30 tracking-wide">
                      FREE
                    </span>
                    <span className="bg-gradient-primary text-white text-sm font-bold px-3 py-1 rounded-full tracking-wide">
                      PRO UPGRADE
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                    CV Redo
                  </h2>
                </div>
              </div>
              <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                Transform your existing CV with modern designs, professional layouts, and AI-powered content suggestions. Make a lasting impression with stunning visual presentations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/apps/cv-redo"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-primary text-white font-bold py-4 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-lg"
                >
                  Try CV Redo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light hover:border-primary/50 hover:scale-105 transition-all duration-300 text-lg"
                >
                  View Pricing
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
              Start Your Career Journey Today
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have transformed their careers with Vellon 2.0. Your dream job is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/pricing"
                className="group inline-flex items-center gap-3 bg-gradient-primary text-white font-bold py-5 px-10 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-premium text-lg"
              >
                Choose Your Plan
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
          </div>
        </section>
      </main>
    </div>
  );
}