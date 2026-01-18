export default function CVOptimizerPage() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            CV Optimizer
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
            Unlock premium CV optimization powered by AI to get noticed by recruiters and pass ATS filters.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Premium Feature</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                CV Optimizer is available with our Pro and Enterprise plans. Upgrade now to access AI-powered CV optimization that helps you stand out to employers.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What you'll get:</h3>
                <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
                  <li>✓ AI-powered keyword optimization</li>
                  <li>✓ ATS compatibility analysis</li>
                  <li>✓ Industry-specific recommendations</li>
                  <li>✓ Multiple optimization suggestions</li>
                  <li>✓ Download optimized CV</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pricing"
                  className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Upgrade to Pro - $9.99/month
                </a>
                <a
                  href="/"
                  className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}