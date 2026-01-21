import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <section className="text-center py-24 sm:py-36 lg:py-44 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 p-1 bg-gradient-primary rounded-full mb-8 animate-glow shadow-warm">
            <div className="bg-surface px-5 py-2.5 rounded-full">
              <span className="text-primary font-bold text-sm tracking-wide">🚀 OUR MISSION</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight bg-gradient-primary bg-clip-text text-transparent mb-8 leading-[0.9]">
            About Vellon 2.0
          </h1>
          <p className="max-w-4xl mx-auto text-lg sm:text-xl lg:text-2xl text-text-muted mb-12 leading-relaxed font-light px-4 sm:px-0">
            We're on a mission to revolutionize CV creation and optimization using cutting-edge AI technology that empowers every professional to land their dream job.
          </p>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight">Our Story</h2>
              <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                Vellon 2.0 was born from the frustration of job seekers' struggling to create compelling CVs that stand out in today's hyper-competitive job market. We witnessed countless talented professionals being overlooked simply because their CVs couldn't pass basic ATS filters or failed to capture attention in the first few seconds.
              </p>
              <p className="text-text-muted mb-8 leading-relaxed text-lg font-light">
                Our diverse team of AI engineers, UX designers, career coaches, and hiring managers came together with a shared vision: to democratize professional CV creation. We leverage cutting-edge AI technology to make sophisticated optimization tools accessible to everyone, regardless of their technical background or budget.
              </p>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Founded in 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>10,000+ CVs Optimized</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 border border-border/50 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground">Our Mission</h3>
              </div>
              <p className="text-text-muted leading-relaxed text-lg font-light">
                To empower every professional to land their dream job by providing intelligent, accessible tools that transform how CVs are created and optimized. We believe that career success should be determined by talent and dedication, not by access to expensive services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
              Why Choose Vellon 2.0?
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted font-light max-w-3xl mx-auto leading-relaxed">
              What sets us apart from the competition and why professionals trust us with their careers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 h-full hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                  AI-Powered Optimization
                </h3>
                <p className="text-text-muted leading-relaxed text-lg font-light">
                  Our advanced algorithms analyze job descriptions in real-time and optimize your CV to pass ATS filters while highlighting your most relevant qualifications to human recruiters.
                </p>
              </div>
            </div>

            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 h-full hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30">
                <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                  Professional Templates
                </h3>
                <p className="text-text-muted leading-relaxed text-lg font-light">
                  Choose from a curated collection of modern, ATS-friendly templates designed by professional designers. Each template is optimized for both digital and print formats.
                </p>
              </div>
            </div>

            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-10 h-full hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30">
                <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-6 group-hover:text-primary transition-colors leading-tight">
                  Expert Guidance
                </h3>
                <p className="text-text-muted leading-relaxed text-lg font-light">
                  Get actionable insights and recommendations based on industry best practices, current hiring trends, and data from thousands of successful job applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
              Meet the Team
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted font-light max-w-3xl mx-auto leading-relaxed">
              The passionate individuals behind Vellon 2.0 who are dedicated to transforming careers across South Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-8 h-full hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30">
                <img
                  src="/WhatsApp Image 2025-10-19 at 07.47.06_09d44daa.jpg"
                  alt="Founder & CEO"
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
                />
                <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2">Founder & CEO</h3>
                <p className="text-primary font-semibold mb-4 text-sm sm:text-base">Rean v Aswegen</p>
                <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                  Visionary leader with a passion for leveraging AI to democratize career opportunities. Former tech entrepreneur with 10+ years in the industry.
                </p>
              </div>
            </div>

            <div className="text-center group animate-fade-in-up">
              <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-8 h-full hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/50 hover:border-primary/30">
                <img
                  src="/WhatsApp Image 2026-01-11 at 8.41.37 PM.jpeg"
                  alt="Co-Founder & CTO"
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-secondary/20"
                />
                <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2">Co-Founder & CTO</h3>
                <p className="text-secondary font-semibold mb-4 text-sm sm:text-base">Megan Smith</p>
                <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                  AI expert and software architect specializing in machine learning applications. PhD in Computer Science with focus on natural language processing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
              Proudly Sponsored by Vodacom
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              We're honored to partner with Vodacom, South Africa's leading telecommunications company, in our mission to connect talent with opportunity.
            </p>
            <div className="bg-surface-light backdrop-blur-sm rounded-3xl shadow-premium p-12 border border-border/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/png-clipart-vodafone-australia-business-vodafone-new-zealand-logo-business-text-people (1).png"
                  alt="Vodacom Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4">Vodacom Partnership</h3>
              <p className="text-text-muted leading-relaxed mb-6">
                Through our partnership with Vodacom, we're able to provide cutting-edge career tools to South African professionals at no cost, helping bridge the digital divide and create equal opportunities for all.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>Supporting Local Talent</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>Empowering Communities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
              Ready to Transform Your CV?
            </h2>
            <p className="text-xl sm:text-2xl text-text-muted mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              Join thousands of professionals who have already improved their job prospects with Vellon 2.0. Start your journey to career success today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/pricing"
                className="group inline-flex items-center gap-3 bg-gradient-primary text-white font-bold py-5 px-10 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-premium text-lg"
              >
                View Pricing Plans
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-surface-light backdrop-blur-sm text-foreground font-semibold py-5 px-10 rounded-2xl border-2 border-border hover:bg-surface hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-premium text-lg"
              >
                Explore Tools
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free basic tools</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-border/20">
            <p className="text-sm text-text-muted mb-6">Trusted by professionals at leading South African companies</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-semibold text-text-muted tracking-wider">FEATURED IN</div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Business Day</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="text-xs font-medium text-text-muted">Fin24</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-light/50 rounded-lg hover:bg-surface-light/70 transition-colors">
                  <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="text-xs font-medium text-text-muted">IOL</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}