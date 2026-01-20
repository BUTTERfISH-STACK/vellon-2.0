import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-gradient-elegant border-b border-border/30 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-4 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <img src="/logo.png" alt="Vellon Logo" className="w-7 h-7 filter brightness-0 invert" />
                </div>
                <span className="text-3xl font-bold text-gradient-gold tracking-tight">
                  Vellon
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-12">
              <Link href="/" className="text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/apps" className="text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg relative group">
                Apps
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/pricing" className="text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="flex items-center gap-6">
              <a
                href="/pricing"
                className="hidden sm:inline-flex items-center gap-3 bg-gradient-primary text-background font-bold py-3 px-8 rounded-2xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 shadow-premium"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              {/* Mobile menu button */}
              <button className="md:hidden p-3 rounded-2xl bg-surface-light border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-premium">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gradient-elegant border-t border-border/30 mt-24 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium">
                  <img src="/logo.png" alt="Vellon Logo" className="w-7 h-7 filter brightness-0 invert" />
                </div>
                <span className="text-3xl font-bold text-gradient-gold">
                  Vellon
                </span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-lg text-lg">
                Premium AI-powered CV optimization for discerning professionals. Elevate your career with sophisticated tools designed for success.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-6 text-xl tracking-wide">Product</h3>
              <ul className="space-y-4">
                <li><Link href="/apps/cv-optimizer" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">CV Optimizer</Link></li>
                <li><Link href="/apps/cv-redo" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">CV Redo</Link></li>
                <li><Link href="/pricing" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-6 text-xl tracking-wide">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">About</Link></li>
                <li><a href="#" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Contact</a></li>
                <li><a href="#" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-10 text-center">
            <p className="text-text-muted font-medium text-lg">
              © 2024 Vellon. All rights reserved. Crafted for professional excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}