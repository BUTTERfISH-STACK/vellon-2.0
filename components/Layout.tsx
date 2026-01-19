import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-pandora">
      <header className="backdrop-blur-xl bg-surface/95 border-b border-border/30 sticky top-0 z-50 shadow-premium">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200 tracking-tight">
                  Vellon 2.0
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="group relative text-text-muted hover:text-primary transition-all duration-300 hover:scale-105 font-semibold text-lg">
                Home
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/apps" className="group relative text-text-muted hover:text-primary transition-all duration-300 hover:scale-105 font-semibold text-lg">
                Apps
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="group relative text-text-muted hover:text-primary transition-all duration-300 hover:scale-105 font-semibold text-lg">
                About
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/pricing" className="group relative text-text-muted hover:text-primary transition-all duration-300 hover:scale-105 font-semibold text-lg">
                Pricing
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <a
                href="/pricing"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-primary text-white font-bold py-3 px-6 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 shadow-premium"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-xl bg-surface border border-border hover:border-primary/50 transition-colors">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="backdrop-blur-xl bg-surface/90 border-t border-border/20 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  Vellon 2.0
                </span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-md">
                Premium AI-powered CV optimization platform. Transform your career with professional tools that get results.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/apps/cv-optimizer" className="text-text-muted hover:text-primary transition-colors">CV Optimizer</Link></li>
                <li><Link href="/apps/cv-redo" className="text-text-muted hover:text-primary transition-colors">CV Redo</Link></li>
                <li><Link href="/pricing" className="text-text-muted hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-text-muted hover:text-primary transition-colors">About</Link></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-text-muted hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/20 pt-8 text-center">
            <p className="text-text-muted font-medium">
              © 2024 Vellon 2.0. All rights reserved. Built with ❤️ for career success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}