"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for interactive background
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const particleCount = 100;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 50%)`,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-30"
        style={{ pointerEvents: "none" }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-light to-surface -z-20"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 opacity-30"
        style={{ pointerEvents: "none" }}
      />
      <header className="bg-gradient-elegant border-b border-border/30 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-4 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300">
                  <img src="/new-logo.png" alt="Vellon Logo" className="w-12 h-12 object-contain" />
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
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-2xl bg-surface-light border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-premium"
              >
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/50 bg-surface-light/95 backdrop-blur-xl">
              <div className="px-6 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="block text-text-muted hover:text-accent transition-all duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="pt-4 border-t border-border/50">
                  <a
                    href="/pricing"
                    className="inline-flex items-center gap-3 bg-gradient-primary text-background font-bold py-3 px-6 rounded-2xl hover:shadow-glow transition-all duration-300 w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gradient-elegant border-t border-border/30 mt-24 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-premium">
                  <img src="/new-logo.png" alt="Vellon Logo" className="w-12 h-12 object-contain" />
                </div>
                <span className="text-3xl font-bold text-gradient-gold">
                  Vellon
                </span>
              </div>
              <p className="text-text-muted leading-relaxed max-w-lg text-lg">
                Empowering South African job seekers with professional CV tools. Transform your career with tools designed to help you land your dream job.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-6 text-xl tracking-wide">Product</h3>
              <ul className="space-y-4">
                <li><Link href="/apps/cv-optimizer" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">CV Optimizer</Link></li>
                <li><Link href="/pricing" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-6 text-xl tracking-wide">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">About</Link></li>
                <li><a href="#" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Contact</a></li>
                <li><Link href="/terms" className="text-text-muted hover:text-accent transition-all duration-300 text-lg">Terms & Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-10 text-center">
            <p className="text-text-muted font-medium text-lg">
              © 2024 Vellon. All rights reserved. Empowering South African careers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}