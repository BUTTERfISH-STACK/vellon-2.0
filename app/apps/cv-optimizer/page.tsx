'use client';

import { useState, useEffect } from 'react';


export default function CVOptimizerPage() {
  const [isPro, setIsPro] = useState(() => {
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem('vellon_pro_status');
      return status === 'true';
    }
    return false;
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);

  const slides = ['creative', 'modern'] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for upgrade success query param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('upgrade') === 'success') {
      setShowUpgradeSuccess(true);
      setIsPro(true);
      // Remove the query param from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      // Hide success message after 5 seconds
      setTimeout(() => setShowUpgradeSuccess(false), 5000);
    }
  }, []);


  return (
    <div className="min-h-screen">
      {/* Upgrade Success Message */}
      {showUpgradeSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg animate-fade-in-up">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Pro Upgrade Successful! 🎉</p>
              <p className="text-sm text-green-100">Your premium features are now unlocked.</p>
            </div>
            <button
              onClick={() => setShowUpgradeSuccess(false)}
              className="ml-4 text-green-200 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-24 sm:py-40 animate-fade-in-up">
          <div className="inline-block p-2 bg-gradient-primary/20 rounded-full mb-8 shadow-premium">
            <div className="bg-gradient-elegant px-8 py-4 rounded-full border border-accent/30">
              <h2 className="text-accent font-bold text-xl tracking-wide">Professional excellence begins with presentation</h2>
            </div>
          </div>
          <p className="max-w-4xl mx-auto text-2xl text-text-muted mb-12 leading-relaxed font-light">
            Craft a sophisticated, ATS-optimized CV with our premium form builder designed for career advancement.
          </p>

          {/* CV Mockup Slideshow */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-elegant border border-border/50 shadow-premium">
              <div className="aspect-[3/4] relative bg-gradient-to-br from-surface to-surface-light rounded-2xl overflow-hidden">
                <img
                  src="/cv-creative.png"
                  alt="Creative CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    currentSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
                <img
                  src="/cv-modern.png"
                  alt="Modern CV Design"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    currentSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-accent shadow-glow' : 'bg-border/50 hover:bg-accent/70'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-6 right-6 bg-gradient-primary/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/30">
                {currentSlide === 0 ? 'Creative Professional' : 'Modern Executive'} Template
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-elegant backdrop-blur-sm rounded-3xl shadow-premium p-12 border border-border/30">
              <div className="mb-8">
                <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Professional Excellence</h3>
                      <p className="text-pink-100 text-xl leading-relaxed">Transform your career with professional-grade CV tools</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-sm">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">🎨</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Premium Templates</span>
                            <span className="text-pink-100">Creative & Modern designs that stand out</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">ATS Optimization</span>
                            <span className="text-pink-100">95%+ pass rate with scoring analysis</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">📄</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Cover Letter Generator</span>
                            <span className="text-pink-100">AI-powered professional cover letters</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">🎨</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Custom Branding</span>
                            <span className="text-pink-100">Personalized design elements</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">📊</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Application Tracking</span>
                            <span className="text-pink-100">Monitor applications & interview rates</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">🔄</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Unlimited Exports</span>
                            <span className="text-pink-100">Download as many times as needed</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">⚡</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Priority Support</span>
                            <span className="text-pink-100">24/7 expert assistance</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-300 shadow-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-premium">
                            <span className="text-2xl">🎪</span>
                          </div>
                          <div>
                            <span className="font-bold text-lg text-yellow-200 block">Advanced AI Features</span>
                            <span className="text-pink-100">Next-generation optimization</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30 mb-6">
                        <div className="text-5xl font-bold mb-2">R59<span className="text-2xl font-normal text-pink-200">/month</span></div>
                        <div className="text-sm text-pink-200 flex items-center justify-center gap-2">
                          <span>💫</span>
                          <span>Cancel anytime • No setup fees • Instant activation</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href="/pricing"
                        className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-5 px-12 rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-xl shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-2xl">🚀</span>
                          <span>Upgrade to Pro Now</span>
                        </span>
                      </a>
                    </div>
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