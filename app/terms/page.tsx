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
        </section>
      </main>
    </div>
  );
}