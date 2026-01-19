export default function AppsPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-24">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8">Our Tools</h1>
          <p className="max-w-4xl mx-auto text-xl text-text-muted mb-12">Free basic tools with premium upgrades</p>
        </section>

        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface rounded-2xl p-10 border border-border">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30">
                      FREE
                    </span>
                    <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                      PRO UPGRADE
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    CV Optimizer
                  </h2>
                </div>
              </div>
              <p className="text-text-muted mb-8 leading-relaxed text-lg">
                Optimize your CV for applicant tracking systems (ATS) and dramatically improve your chances of getting noticed by top recruiters and hiring managers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/apps/cv-optimizer"
                  className="inline-flex items-center justify-center gap-3 bg-accent text-white font-bold py-4 px-8 rounded-2xl hover:bg-accent/90 transition-colors text-lg"
                >
                  Try Free Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light transition-colors text-lg"
                >
                  Go Pro
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-10 border border-border">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full border border-green-500/30">
                      FREE
                    </span>
                    <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                      PRO UPGRADE
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    CV Redo
                  </h2>
                </div>
              </div>
              <p className="text-text-muted mb-8 leading-relaxed text-lg">
                Completely redesign your CV with modern, professional templates and layouts that create lasting impressions and showcase your unique value proposition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/apps/cv-redo"
                  className="inline-flex items-center justify-center gap-3 bg-accent text-white font-bold py-4 px-8 rounded-2xl hover:bg-accent/90 transition-colors text-lg"
                >
                  Try Free Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-3 bg-surface text-foreground font-semibold py-4 px-8 rounded-2xl border-2 border-border hover:bg-surface-light transition-colors text-lg"
                >
                  Go Pro
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}