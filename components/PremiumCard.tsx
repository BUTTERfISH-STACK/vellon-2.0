'use client';

import React from 'react';
import { useTilt } from '@/hooks/useTilt';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  variant?: 'default' | 'glass' | 'elevated';
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  tilt = true,
  glow = false,
  variant = 'default'
}) => {
  const { elementRef } = useTilt<HTMLDivElement>(tilt ? { maxTilt: 10, scale: 1.02, speed: 250 } : undefined);

  const baseClasses = 'relative overflow-hidden transition-all duration-300 group';

  const variantClasses = {
    default: 'bg-surface-light/30 backdrop-blur-sm border border-border/30 hover:border-accent/50',
    glass: 'bg-surface-light/20 backdrop-blur-md border border-white/10 hover:border-white/20',
    elevated: 'bg-gradient-elegant border border-border/50 shadow-premium hover:shadow-glow',
  };

  const glowClasses = glow ? 'hover:shadow-glow' : '';

  return (
    <div
      ref={tilt ? elementRef : undefined}
      className={`${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className} rounded-3xl p-8`}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PremiumCard;