'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  delay?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
}) => {
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>({ delay, threshold });

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    slideInLeft: 'animate-slide-in-left',
    slideInRight: 'animate-slide-in-right',
    scaleIn: 'animate-scale-in',
  };

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animationClasses[animation] : 'opacity-0'}`}
      style={{
        transform: isVisible ? 'none' : animation === 'fadeInUp' ? 'translateY(30px)' :
                                   animation === 'slideInLeft' ? 'translateX(-30px)' :
                                   animation === 'slideInRight' ? 'translateX(30px)' :
                                   'scale(0.95)',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;