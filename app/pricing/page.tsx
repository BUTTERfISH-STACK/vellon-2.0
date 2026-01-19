'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Pricing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Set pro trial status with expiration (14 days from now)
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 14);
      localStorage.setItem('vellon_pro_trial_end', trialEndDate.toISOString());
      localStorage.setItem('vellon_pro_status', 'trial');
      setIsProcessing(false);
      // Redirect to CV optimizer with success message
      router.push('/apps/cv-optimizer?upgrade=success');
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-24">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
            Simple, Honest Pricing
          </h1>
          <p className="max-w-4xl mx-auto text-xl text-text-muted mb-12">
            Choose the plan that fits your career goals
          </p>
        </section>

        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold text-foreground mb-2">R0</div>
                <p className="text-sm text-text-muted">Forever free</p>
              </div>
              <p className="text-text-muted mb-6 text-center">Basic CV optimization for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic CV templates
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 PDF export per day
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Watermarked exports
                </li>
              </ul>
              <a
                href="/apps/cv-optimizer"
                className="inline-block bg-surface-light text-foreground font-semibold py-3 px-6 rounded-2xl border border-border hover:bg-surface hover:shadow-md transition-all duration-200 w-full text-center"
              >
                Get Started Free
              </a>
            </div>

            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white relative shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="absolute top-4 right-4 bg-white text-accent px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-2">
                  R59 <span className="text-lg font-normal">/ month</span>
                </div>
                <p className="text-accent/90 text-sm">Cancel anytime • 14-day free trial</p>
              </div>
              <p className="mb-6 text-center text-white/90">Professional CV tools that get you hired</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium templates (Modern, Creative, Classic)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited PDF exports
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No watermarks
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ATS optimization scoring
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <button
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="inline-block bg-white text-accent font-bold py-3 px-6 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition-all duration-200 w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting Trial...
                  </div>
                ) : (
                  'Start 14-Day Free Trial'
                )}
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-text-muted text-sm">Yes, you can cancel your subscription at any time with no penalties.</p>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-text-muted text-sm">We accept all major credit cards and debit cards via Yoco.</p>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-text-muted text-sm">Yes, we offer a 14-day money-back guarantee on all subscriptions.</p>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-text-muted text-sm">Absolutely! You can upgrade or downgrade your plan at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}