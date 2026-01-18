export default function About() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            About Vellon 2.0
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
            We're on a mission to revolutionize CV creation and optimization using cutting-edge AI technology.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Vellon 2.0 was born from the frustration of job seekers struggling to create compelling CVs that stand out in today's competitive job market. We saw an opportunity to leverage AI to make professional CV creation accessible to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our team of AI experts, designers, and career coaches came together to build tools that not only optimize your CV for applicant tracking systems but also help you present your professional story in the most compelling way possible.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To empower every professional to land their dream job by providing intelligent, accessible tools that transform how CVs are created and optimized.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Vellon 2.0?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">What sets us apart from the competition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced algorithms analyze job descriptions and optimize your CV to pass ATS filters and appeal to hiring managers.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Professional Templates</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from a curated collection of modern, ATS-friendly templates designed by professional designers.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expert Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get actionable insights and recommendations based on industry best practices and current hiring trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Ready to Transform Your CV?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of professionals who have already improved their job prospects with Vellon 2.0.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                View Pricing
              </a>
              <a
                href="/"
                className="inline-block bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}