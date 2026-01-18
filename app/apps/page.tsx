export default function AppsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Our Apps</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">CV Optimizer</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Optimize your CV for better job opportunities.</p>
            <a href="/apps/cv-optimizer" className="inline-block bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Go to CV Optimizer
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">CV Redo</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Redesign your CV for a modern look.</p>
            <a href="/apps/cv-redo" className="inline-block bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Go to CV Redo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}