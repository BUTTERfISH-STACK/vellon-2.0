import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center">
                  <img src="/logo.png" alt="Vellon Logo" className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  Vellon
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-text-muted hover:text-accent transition-colors font-semibold text-lg">
                Home
              </Link>
              <Link href="/apps" className="text-text-muted hover:text-accent transition-colors font-semibold text-lg">
                Apps
              </Link>
              <Link href="/about" className="text-text-muted hover:text-accent transition-colors font-semibold text-lg">
                About
              </Link>
              <Link href="/pricing" className="text-text-muted hover:text-accent transition-colors font-semibold text-lg">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <a
                href="/pricing"
                className="hidden sm:inline-flex items-center gap-2 bg-accent text-white font-bold py-3 px-6 rounded-2xl hover:bg-accent/90 transition-colors"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-xl bg-surface border border-border hover:border-accent transition-colors">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-surface border-t border-border mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center">
                  <img src="/logo.png" alt="Vellon Logo" className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  Vellon
                </span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-md">
                AI-powered CV optimization for modern hiring systems. Get hired faster with professional tools.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/apps/cv-optimizer" className="text-text-muted hover:text-accent transition-colors">CV Optimizer</Link></li>
                <li><Link href="/apps/cv-redo" className="text-text-muted hover:text-accent transition-colors">CV Redo</Link></li>
                <li><Link href="/pricing" className="text-text-muted hover:text-accent transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-text-muted hover:text-accent transition-colors">About</Link></li>
                <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-text-muted font-medium">
              © 2024 Vellon. All rights reserved. Built for career success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}