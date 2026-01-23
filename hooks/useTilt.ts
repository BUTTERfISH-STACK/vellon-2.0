'use client';

import { useRef, useEffect } from 'react';

interface TiltOptions {
  maxTilt: number;
  perspective: number;
  scale: number;
  speed: number;
  glare: boolean;
  'max-glare': number;
}

const defaultOptions: TiltOptions = {
  maxTilt: 20,
  perspective: 1000,
  scale: 1.05,
  speed: 300,
  glare: false,
  'max-glare': 1,
};

export const useTilt = <T extends HTMLElement = HTMLElement>(options: Partial<TiltOptions> = {}) => {
  const elementRef = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const settings = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateTransform = () => {
      if (!element) return;

      // Smooth interpolation
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      const tiltX = (currentY / element.offsetHeight - 0.5) * settings.maxTilt;
      const tiltY = -(currentX / element.offsetWidth - 0.5) * settings.maxTilt;

      element.style.transform = `
        perspective(${settings.perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})
      `;

      // Update glare position if enabled
      if (settings.glare && glareRef.current) {
        const glareOpacity = Math.abs(tiltX) / settings.maxTilt + Math.abs(tiltY) / settings.maxTilt;
        glareRef.current.style.opacity = Math.min(glareOpacity * settings['max-glare'], 1).toString();
        glareRef.current.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(tiltY, tiltX)}rad)`;
      }

      animationId = requestAnimationFrame(updateTransform);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      element.style.transition = `transform ${settings.speed}ms ease-out`;
      updateTransform();
    };

    const handleMouseLeave = () => {
      targetX = element.offsetWidth / 2;
      targetY = element.offsetHeight / 2;

      // Reset transform after a delay
      setTimeout(() => {
        if (element) {
          element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          element.style.transition = `transform ${settings.speed}ms ease-out`;
        }
      }, 100);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [settings.maxTilt, settings.perspective, settings.scale, settings.speed, settings.glare, settings['max-glare']]);

  return { elementRef, glareRef };
};