import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-secondary">
      <header className="backdrop-blur-md bg-surface/80 border-b border-border/50 sticky top-0 z-50 shadow-premium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                Vellon 2.0
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-text-muted hover:text-primary transition-all duration-200 hover:scale-105 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="text-text-muted hover:text-primary transition-all duration-200 hover:scale-105 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link href="/pricing" className="text-text-muted hover:text-primary transition-all duration-200 hover:scale-105 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="backdrop-blur-md bg-surface/60 border-t border-border/30 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-muted">© 2024 Vellon 2.0. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}