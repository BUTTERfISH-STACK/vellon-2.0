'use client';

import { useState } from 'react';

export default function CVRedoPage() {
  const [isPro, setIsPro] = useState(false); // In a real app, this would come from user authentication
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Success! Your CV has been redesigned with a standard template. Check your email for the download link. Upgrade to Pro for premium templates and advanced customization!');
    }, 2000);
  };

  if (!isPro) {
    return (
      <div className="bg-zinc-50 dark:bg-black">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <section className="text-center py-20 sm:py-32">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              CV Redo
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
              Redesign your CV with basic templates and layouts for free.
            </p>
          </section>

          <section className="py-16 sm:py-24">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Free Plan:</strong> Basic templates with standard layouts. Upgrade to Pro for premium templates and advanced customization.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Your CV
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                  <div>
                    <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Choose Template
                    </label>
                    <select
                      id="template"
                      name="template"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="classic">Classic Professional</option>
                      <option value="modern">Modern Clean</option>
                      <option value="minimal">Minimalist</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Redesigning...' : 'Redo My CV (Free)'}
                  </button>
                </form>

                {submitMessage && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-green-800 dark:text-green-200 text-sm">{submitMessage}</p>
                  </div>
                )}

                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Upgrade to Pro for:</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                    <li>✓ 20+ premium templates</li>
                    <li>✓ Custom color schemes</li>
                    <li>✓ Advanced font options</li>
                    <li>✓ Multiple layout variations</li>
                    <li>✓ Export in all formats</li>
                  </ul>
                  <a
                    href="/pricing"
                    className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
                  >
                    Upgrade to Pro - $9.99/month
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Pro user interface would go here
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            CV Redo Pro
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-8">
            Professional CV redesign with premium templates and advanced customization.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                  ✓ Pro Plan Active - Full access to premium templates
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Your CV
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <div>
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose Premium Template
                  </label>
                  <select
                    id="template"
                    name="template"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="executive">Executive Suite</option>
                    <option value="creative">Creative Professional</option>
                    <option value="tech">Tech Innovator</option>
                    <option value="academic">Academic Excellence</option>
                    <option value="startup">Startup Founder</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Scheme
                  </label>
                  <select
                    id="colorScheme"
                    name="colorScheme"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="blue">Professional Blue</option>
                    <option value="green">Modern Green</option>
                    <option value="purple">Creative Purple</option>
                    <option value="gray">Minimal Gray</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
                >
                  Redo My CV (Pro)
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}