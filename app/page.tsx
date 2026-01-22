import React from 'react';
import StarRating from '@/components/StarRating';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Space Background */}
          <div className="absolute inset-0 bg-black/90" style={{backgroundImage: 'url("/space-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          
          {/* Cinematic Noise Overlay */}
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          
          {/* Ghosted V Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[20rem] lg:text-[30rem] font-black text-white/5 opacity-10 blur-sm animate-pulse-slow" style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}>
              V
            </div>
          </div>
          
          {/* Orbital Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 450C200 674.5 425.5 850 720 850C1014.5 850 1240 674.5 1240 450C1240 225.5 1014.5 50 720 50C425.5 50 200 225.5 200 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <path d="M300 450C300 612.5 462.5 750 680 750C897.5 750 1060 612.5 1060 450C1060 287.5 897.5 150 680 150C462.5 150 300 287.5 300 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              <path d="M400 450C400 549.5 509.5 650 650 650C790.5 650 890 549.5 890 450C890 350.5 790.5 250 650 250C509.5 250 400 350.5 400 450Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                    Vellon × The Future<br/>
                    <span className="text-white/80">of Talent</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/60 max-w-lg leading-relaxed font-light">
                    From Earth to orbit — talent without borders.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/apps/cv-optimizer-free"
                    className="inline-flex items-center justify-center gap-3 bg-red-600/20 backdrop-blur-sm text-red-400 font-semibold py-4 px-8 rounded-lg border border-red-600/30 hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 text-lg shadow-premium"
                  >
                    Launch Talent Scan
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#network"
                    className="inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm text-white/80 font-medium py-4 px-8 rounded-lg border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300 text-lg shadow-premium"
                  >
                    View Global Network
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="relative h-96 lg:h-full min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl transform rotate-3"></div>
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <img
                    src="/earth-night.jpg"
                    alt="Earth from space at night"
                    className="w-full h-full object-cover rounded-full border border-white/10 shadow-2xl shadow-blue-900/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight">
              <span className="text-gradient-gold">Elevate</span> <span className="animate-flicker-slow">Your Career</span>
              <br />
              <span className="text-foreground">With Precision</span>
            </h1>

            <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-text-muted mb-8 leading-relaxed font-light">
              Sophisticated AI-powered CV optimization — engineered for discerning professionals in competitive South African markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a
                href="/apps/cv-optimizer-free"
                className="inline-flex items-center gap-4 bg-gradient-primary text-background font-bold py-6 px-12 rounded-2xl hover:shadow-glow transition-all duration-300 text-xl shadow-premium transform hover:scale-105"
              >
                Optimize My CV
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-4 bg-surface-light text-foreground font-semibold py-6 px-12 rounded-2xl border-2 border-border/50 hover:border-accent/50 hover:bg-surface transition-all duration-300 text-xl shadow-premium"
              >
                Discover Excellence
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
        </section>
      </main>
  );
}
