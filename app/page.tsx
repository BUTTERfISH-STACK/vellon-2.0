export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="text-center py-24 sm:py-40 lg:py-48">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Get Hired Faster With an ATS-Optimized CV
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed">
            AI-powered CV optimization and professional redesign — built for modern hiring systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/apps/cv-optimizer"
              className="inline-flex items-center gap-3 bg-accent text-white font-bold py-5 px-10 rounded-2xl hover:bg-accent/90 transition-colors text-lg"
            >
              Optimize My CV
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-3 bg-surface text-white font-semibold py-5 px-10 rounded-2xl border-2 border-border hover:bg-surface-light transition-colors text-lg"
            >
              See How It Works
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-surface rounded-2xl px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl mb-2">🔧</div>
              <p className="text-sm">Built for ATS systems</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🇿🇦</div>
              <p className="text-sm">Used by job seekers across South Africa</p>
            </div>
            <div>
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm">Instant results</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm">Affordable pricing</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">Simple steps to optimize your CV</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">1</div>
              <h3 className="text-2xl font-semibold mb-4">Upload or paste your CV</h3>
              <p className="text-text-muted">Simply upload your existing CV or paste the content directly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">2</div>
              <h3 className="text-2xl font-semibold mb-4">We optimize it for ATS + recruiters</h3>
              <p className="text-text-muted">Our AI enhances keywords, formatting, and structure for better visibility</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">3</div>
              <h3 className="text-2xl font-semibold mb-4">Download a clean, professional CV</h3>
              <p className="text-text-muted">Get your optimized CV ready to impress employers</p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-24 bg-surface rounded-2xl px-8 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">What You Get</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">Professional CV optimization features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">ATS keyword optimization</h3>
                <p className="text-text-muted">Tailored keywords to pass ATS filters</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">Clean professional formatting</h3>
                <p className="text-text-muted">Modern, readable layout</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">CV redo & rewrite</h3>
                <p className="text-text-muted">Complete content enhancement</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">PDF export</h3>
                <p className="text-text-muted">Download-ready format</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">Industry-ready structure</h3>
                <p className="text-text-muted">Optimized for your field</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-green-400 text-2xl">✔</div>
              <div>
                <h3 className="font-semibold mb-2">Human-readable + machine-readable</h3>
                <p className="text-text-muted">Appeals to both recruiters and ATS</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Pricing</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">Simple, honest pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <p className="text-text-muted mb-6">Basic CV optimization</p>
              <ul className="space-y-2 mb-8">
                <li>Watermark</li>
                <li>1 export</li>
              </ul>
              <a
                href="/apps/cv-optimizer"
                className="inline-block bg-surface-light text-white font-semibold py-3 px-6 rounded-2xl border border-border hover:bg-surface transition-colors w-full text-center"
              >
                Try Free
              </a>
            </div>
            <div className="bg-accent rounded-2xl p-8 text-white relative">
              <div className="absolute top-4 right-4 bg-white text-accent px-3 py-1 rounded-full text-sm font-bold">POPULAR</div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="mb-6">Unlimited CV optimization</p>
              <div className="text-3xl font-bold mb-6">R59 / month</div>
              <ul className="space-y-2 mb-8">
                <li>CV redo</li>
                <li>No watermark</li>
                <li>ATS-ready exports</li>
              </ul>
              <a
                href="/pricing"
                className="inline-block bg-white text-accent font-semibold py-3 px-6 rounded-2xl hover:bg-gray-100 transition-colors w-full text-center"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </section>

        {/* Why Vellon */}
        <section className="py-24 bg-surface rounded-2xl px-8 mb-24">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Why Vellon?</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              We built Vellon to help people get jobs — not to overcharge them. No recruiters. No agencies. Just tools that work.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to improve your CV?</h2>
          <a
            href="/apps/cv-optimizer"
            className="inline-flex items-center gap-3 bg-accent text-white font-bold py-5 px-10 rounded-2xl hover:bg-accent/90 transition-colors text-lg"
          >
            Optimize My CV Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </section>
      </main>
    </div>
  );
}
