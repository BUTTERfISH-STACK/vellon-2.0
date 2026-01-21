export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">Terms & Policy</h1>
          <p className="text-xl text-text-muted">Vellon 2.0 Terms of Service and Refund Policy</p>
        </section>

        <section className="prose prose-lg max-w-none text-foreground">
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gradient-gold mb-6">Terms of Service</h2>

            <h3 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              By accessing and using Vellon 2.0, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">2. Service Description</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Vellon 2.0 provides AI-powered CV optimization tools designed to help South African job seekers create professional resumes. Our services include CV analysis, optimization suggestions, and PDF generation.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">3. Subscription Services</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Pro subscription provides access to premium features including unlimited CV optimizations, advanced templates, and priority support. Subscriptions are billed monthly and automatically renew unless cancelled.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">4. User Responsibilities</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Users are responsible for the accuracy of information provided to our service. Vellon 2.0 is a tool to assist with CV creation and does not guarantee job placement or interview success.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gradient-gold mb-6">Refund Policy</h2>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">⚠️ No Refunds Policy</h3>
              <p className="text-red-300 mb-4 leading-relaxed">
                <strong>All sales are final. Vellon 2.0 does not offer refunds, cash back, or chargebacks under any circumstances.</strong>
              </p>
              <p className="text-red-300 mb-4 leading-relaxed">
                By purchasing a Pro subscription, you acknowledge and agree that:
              </p>
              <ul className="text-red-300 mb-4 space-y-2">
                <li>• No refunds will be provided for any reason</li>
                <li>• No cash back guarantees are offered</li>
                <li>• Chargebacks initiated by you will result in immediate account termination</li>
                <li>• Subscription cancellations do not entitle you to refunds</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-4">Subscription Cancellation</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              You may cancel your Pro subscription at any time through your account settings. Cancellation will prevent future billing but does not entitle you to refunds for the current billing period.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Service Access After Cancellation</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Upon subscription cancellation, you will retain access to Pro features until the end of your current billing period. After that date, your account will revert to the free plan limitations.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gradient-gold mb-6">Privacy Policy</h2>

            <h3 className="text-xl font-semibold text-foreground mb-4">Data Collection</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Vellon 2.0 collects personal information necessary to provide our services, including CV data uploaded by users for optimization purposes.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Data Usage</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              Your data is used solely for providing CV optimization services. We do not sell, share, or distribute user data to third parties.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Data Security</h3>
            <p className="text-text-muted mb-6 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg">
            <h2 className="text-2xl font-bold text-gradient-gold mb-6">Contact Information</h2>
            <p className="text-text-muted mb-4 leading-relaxed">
              If you have any questions about these Terms & Policy, please contact us through our website.
            </p>
            <p className="text-text-muted leading-relaxed">
              <strong>Last updated:</strong> January 2026
            </p>
          </div>
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
      </main>
    </div>
  );
}