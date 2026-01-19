export default function Pricing() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-24">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8">Simple, Honest Pricing</h1>
          <p className="max-w-4xl mx-auto text-xl text-text-muted mb-12">Choose the plan that fits your needs</p>
        </section>

        <section className="py-24">
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
                href="#"
                className="inline-block bg-white text-accent font-semibold py-3 px-6 rounded-2xl hover:bg-gray-100 transition-colors w-full text-center"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}