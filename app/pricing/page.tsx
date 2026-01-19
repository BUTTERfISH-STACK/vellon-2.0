export default function Pricing() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32 animate-fade-in-up">
          <div className="inline-block p-1 bg-gradient-primary rounded-full mb-6 animate-glow">
            <div className="bg-surface px-4 py-2 rounded-full">
              <span className="text-primary font-medium text-sm">💎 Premium Plans</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-text-muted mb-8 leading-relaxed">
            Choose the plan that works best for you. All plans include our core features with different levels of usage and support.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Free</h3>
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">$0</div>
                <p className="text-text-muted">Perfect for trying out our tools</p>
              </div>
              <ul className="text-text-muted mb-8 space-y-3">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Basic CV optimization</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> CV redesign with standard templates</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Keyword suggestions</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Email support</li>
              </ul>
              <a
                href="/apps"
                className="inline-block w-full bg-surface text-foreground font-semibold py-4 px-6 rounded-xl border border-border hover:bg-surface-light hover:scale-105 transition-all duration-200 text-center shadow-premium"
              >
                Get Started
              </a>
            </div>

            <div className="group bg-gradient-primary rounded-2xl shadow-glow p-8 border-2 border-primary/50 relative hover:scale-105 transition-all duration-300 animate-fade-in-up animate-glow">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-premium">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">$9.99</div>
                <p className="text-white/80">For serious job seekers</p>
              </div>
              <ul className="text-white/90 mb-8 space-y-3">
                <li className="flex items-center"><span className="text-white mr-2">✓</span> Advanced CV optimization</li>
                <li className="flex items-center"><span className="text-white mr-2">✓</span> Unlimited CV redesigns</li>
                <li className="flex items-center"><span className="text-white mr-2">✓</span> Premium templates</li>
                <li className="flex items-center"><span className="text-white mr-2">✓</span> Priority support</li>
                <li className="flex items-center"><span className="text-white mr-2">✓</span> ATS compatibility check</li>
              </ul>
              <button
                id="yoco-pro-payment"
                className="inline-block w-full bg-white text-primary font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-center shadow-premium"
              >
                Choose Pro
              </button>
            </div>

            <div className="group bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Enterprise</h3>
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">$29.99</div>
                <p className="text-text-muted">For teams and organizations</p>
              </div>
              <ul className="text-text-muted mb-8 space-y-3">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Everything in Pro</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Team collaboration</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Custom branding</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> API access</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Dedicated support</li>
              </ul>
              <button
                id="yoco-enterprise-contact"
                className="inline-block w-full bg-gradient-primary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 text-center shadow-premium"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-3">Can I change plans anytime?</h3>
                <p className="text-text-muted leading-relaxed">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-3">Is there a free trial?</h3>
                <p className="text-text-muted leading-relaxed">Our Free plan allows you to try all basic features. For Pro features, contact us for a demo.</p>
              </div>
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 hover:shadow-glow hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-3">What payment methods do you accept?</h3>
                <p className="text-text-muted leading-relaxed">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}