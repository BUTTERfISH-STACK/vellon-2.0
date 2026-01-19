export default function About() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center py-20 sm:py-32 animate-fade-in-up">
          <div className="inline-block p-1 bg-gradient-primary rounded-full mb-6 animate-glow">
            <div className="bg-surface px-4 py-2 rounded-full">
              <span className="text-primary font-medium text-sm">🚀 Our Mission</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-6">
            About Vellon 2.0
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-text-muted mb-8 leading-relaxed">
            We're on a mission to revolutionize CV creation and optimization using cutting-edge AI technology.
          </p>
        </section>

        <section className="py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-text-muted mb-6 leading-relaxed">
                Vellon 2.0 was born from the frustration of job seekers struggling to create compelling CVs that stand out in today's competitive job market. We saw an opportunity to leverage AI to make professional CV creation accessible to everyone.
              </p>
              <p className="text-text-muted mb-6 leading-relaxed">
                Our team of AI experts, designers, and career coaches came together to build tools that not only optimize your CV for applicant tracking systems but also help you present your professional story in the most compelling way possible.
              </p>
            </div>
            <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 border border-border/50 animate-fade-in-up">
              <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-text-muted leading-relaxed">
                To empower every professional to land their dream job by providing intelligent, accessible tools that transform how CVs are created and optimized.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">Why Choose Vellon 2.0?</h2>
            <p className="text-xl text-text-muted">What sets us apart from the competition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 h-full hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">AI-Powered Optimization</h3>
                <p className="text-text-muted leading-relaxed">
                  Our advanced algorithms analyze job descriptions and optimize your CV to pass ATS filters and appeal to hiring managers.
                </p>
              </div>
            </div>

            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 h-full hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Professional Templates</h3>
                <p className="text-text-muted leading-relaxed">
                  Choose from a curated collection of modern, ATS-friendly templates designed by professional designers.
                </p>
              </div>
            </div>

            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-2xl shadow-premium p-8 h-full hover:shadow-glow hover:scale-105 transition-all duration-300 border border-border/50 hover:border-primary/30">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Expert Guidance</h3>
                <p className="text-text-muted leading-relaxed">
                  Get actionable insights and recommendations based on industry best practices and current hiring trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">Ready to Transform Your CV?</h2>
            <p className="text-xl text-text-muted mb-8">
              Join thousands of professionals who have already improved their job prospects with Vellon 2.0.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-block bg-gradient-primary text-white font-semibold py-4 px-8 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-200 shadow-premium"
              >
                View Pricing
              </a>
              <a
                href="/"
                className="inline-block bg-surface-light backdrop-blur-sm text-foreground font-semibold py-4 px-8 rounded-xl border border-border hover:bg-surface hover:scale-105 transition-all duration-200 shadow-premium"
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