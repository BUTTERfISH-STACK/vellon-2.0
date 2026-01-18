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
              href="/apps"
              className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/apps"
              className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Apps
            </a>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CV Optimizer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Optimize your CV for applicant tracking systems (ATS) and improve your chances of getting noticed by recruiters.
              </p>
              <a
                href="/apps/cv-optimizer"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Try Now
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CV Redo</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Completely redesign your CV with modern templates and layouts that make a lasting impression.
              </p>
              <a
                href="/apps/cv-redo"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Try Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
