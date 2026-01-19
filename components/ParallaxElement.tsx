'use client';

import { useEffect, useRef } from 'react';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  children,
  speed = -2,
  className = '',
  style = {}
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rellax: any = null;

    const initRellax = async () => {
      try {
        const Rellax = (await import('rellax')).default as any;
        if (elementRef.current) {
          rellax = new Rellax(elementRef.current, {
            speed: speed,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
          });
        }
      } catch (error) {
        console.warn('Rellax.js failed to load:', error);
      }
    };

    initRellax();

    return () => {
      if (rellax) {
        rellax.destroy();
      }
    };
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={style}
      data-rellax-speed={speed}
    >
      {children}
    </div>
  );
}