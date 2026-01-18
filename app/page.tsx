import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Premium SaaS Platform for CV Optimization
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
            Transform your CV into a professional masterpiece with our AI-powered tools. Stand out in the job market and land your dream role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pricing"
              className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Tools</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Free basic tools with premium upgrades powered by AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">Free</span>
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full">Pro Upgrade</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CV Optimizer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Optimize your CV for applicant tracking systems (ATS) and improve your chances of getting noticed by recruiters.
              </p>
              <div className="flex gap-3">
                <a
                  href="/apps/cv-optimizer"
                  className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Try Free
                </a>
                <a
                  href="/pricing"
                  className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Go Pro
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">Free</span>
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full">Pro Upgrade</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CV Redo</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Completely redesign your CV with modern templates and layouts that make a lasting impression.
              </p>
              <div className="flex gap-3">
                <a
                  href="/apps/cv-redo"
                  className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Try Free
                </a>
                <a
                  href="/pricing"
                  className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Go Pro
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
