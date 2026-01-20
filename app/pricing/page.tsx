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
      // Set pro status
      localStorage.setItem('vellon_pro_status', 'active');
      setIsProcessing(false);
      // Redirect to cv-optimizer page with success message
      router.push('/apps/cv-optimizer?upgrade=success');
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">Land Your Dream Job</h1>
          <p className="text-xl text-text-muted">Professional CV tools designed for South African job seekers</p>
        </section>

        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold text-foreground mb-2">R0</div>
                <p className="text-sm text-text-muted">Start building your career today</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Professional CV builder</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">PDF download with Vellon branding</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Perfect for entry-level positions</span>
                </li>
              </ul>

              <a
                href="https://velloncareers.co.za/apps/cv-optimizer-free"
                className="inline-block bg-surface-light text-foreground font-semibold py-4 sm:py-3 px-6 rounded-2xl border border-border hover:bg-surface hover:shadow-md transition-all duration-200 w-full text-center text-base sm:text-sm"
              >
                Get Started Free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 text-white relative shadow-2xl border-2 border-accent">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                BEST VALUE
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Complete career enhancement suite</h3>
                <div className="text-3xl font-bold mb-2">
                  R119.99 <span className="text-lg font-normal opacity-90">once off</span>
                </div>
                <p className="text-white/80 text-sm">Everything you need for career success • One-time purchase</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Advanced AI optimization</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Premium templates</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Unlimited exports</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Full access to all features</span>
                </li>
              </ul>

              <button
                onClick={() => window.location.href = 'https://pay.yoco.com/r/mEDgNy?success_url=https://velloncareers.co.za/apps/cv-optimizer-pro?upgrade=success&cancel_url=https://velloncareers.co.za/pricing'}
                className="inline-block bg-white text-accent font-bold py-3 px-6 rounded-2xl hover:bg-gray-100 hover:shadow-lg transition-all duration-200 w-full text-center"
              >
                Upgrade to Pro Now
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-text-muted text-sm">
              Join thousands of South Africans who landed their dream jobs with Vellon • One-time purchase
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}