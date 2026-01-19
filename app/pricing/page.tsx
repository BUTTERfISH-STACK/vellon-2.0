export default function Pricing() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">💎 PREMIUM PLANS</span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9]">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Choose the plan that works best for you. All plans include our core features with different levels of usage and support. Start free and upgrade anytime.
          </p>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 animate-fade-in-up h-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-6">Free</h3>
                <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-4">$0</div>
                <p className="text-text-muted font-light text-lg">Perfect for trying out our tools</p>
              </div>
              <ul className="text-text-muted mb-10 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Basic CV optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">CV redesign with standard templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Keyword suggestions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Email support</span>
                </li>
              </ul>
              <a
                href="/apps"
                className="inline-flex items-center justify-center gap-3 w-full bg-surface text-foreground font-bold py-5 px-8 rounded-2xl border-2 border-border hover:bg-surface-light hover:border-primary/50 hover:scale-105 transition-all duration-300 text-center shadow-premium text-lg"
              >
                Get Started Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            <div className="group bg-gradient-primary rounded-3xl shadow-glow p-10 border-2 border-primary/50 relative hover:scale-[1.02] transition-all duration-500 animate-fade-in-up animate-glow h-full">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-6 py-3 rounded-full text-sm font-black shadow-premium tracking-wide">
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-6">Pro</h3>
                <div className="text-5xl font-black text-white mb-4">$9.99</div>
                <p className="text-white/80 font-light text-lg">For serious job seekers</p>
              </div>
              <ul className="text-white/90 mb-10 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">AI-powered keyword optimization with industry-specific analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Unlimited CV creations and redesigns with no usage limits</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">20+ premium ATS-friendly templates with custom branding</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Priority email support with 24-hour response time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Advanced ATS compatibility scoring with detailed reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Remove Vellon 2.0 watermark from all downloads</span>
                </li>
              </ul>
              <a
                href="/apps"
                className="inline-flex items-center justify-center gap-3 w-full bg-white text-primary font-bold py-5 px-8 rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 text-center shadow-premium text-lg"
              >
                Choose Pro Plan
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            <div className="group bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-500 animate-fade-in-up h-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-6">Enterprise</h3>
                <div className="text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-4">$29.99</div>
                <p className="text-text-muted font-light text-lg">For teams and organizations</p>
              </div>
              <ul className="text-text-muted mb-10 space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Custom branding</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-light">Dedicated support</span>
                </li>
              </ul>
              <button
                id="yoco-enterprise-contact"
                className="inline-flex items-center justify-center gap-3 w-full bg-gradient-primary text-white font-bold py-5 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 text-center shadow-premium text-lg"
              >
                Contact Sales
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-12 leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-foreground mb-4">Can I change plans anytime?</h3>
                    <p className="text-text-muted leading-relaxed text-lg font-light">
                      Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges. No hidden fees or long-term commitments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-foreground mb-4">Is there a free trial?</h3>
                    <p className="text-text-muted leading-relaxed text-lg font-light">
                      Our Free plan allows you to try all basic features with no time limit. For Pro features, we offer a 14-day trial period. No credit card required to get started.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 hover:shadow-glow hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-foreground mb-4">What payment methods do you accept?</h3>
                    <p className="text-text-muted leading-relaxed text-lg font-light">
                      We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for Enterprise plans. All payments are secure and encrypted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}