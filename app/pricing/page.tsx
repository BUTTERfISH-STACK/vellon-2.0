export default function Pricing() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that works best for you. All plans include our core features with different levels of usage and support.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$0</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for trying out our tools</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>✓ Basic CV optimization</li>
                <li>✓ 1 CV redesign per month</li>
                <li>✓ Standard templates</li>
                <li>✓ Email support</li>
              </ul>
              <a
                href="/apps"
                className="inline-block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
              >
                Get Started
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-gray-900 dark:border-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$9.99</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">For serious job seekers</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>✓ Advanced CV optimization</li>
                <li>✓ Unlimited CV redesigns</li>
                <li>✓ Premium templates</li>
                <li>✓ Priority support</li>
                <li>✓ ATS compatibility check</li>
              </ul>
              <a
                href="#"
                className="inline-block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
              >
                Choose Pro
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$29.99</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">For teams and organizations</p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>✓ Everything in Pro</li>
                <li>✓ Team collaboration</li>
                <li>✓ Custom branding</li>
                <li>✓ API access</li>
                <li>✓ Dedicated support</li>
              </ul>
              <a
                href="#"
                className="inline-block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600 dark:text-gray-300">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Is there a free trial?</h3>
                <p className="text-gray-600 dark:text-gray-300">Our Free plan allows you to try all basic features. For Pro features, contact us for a demo.</p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}