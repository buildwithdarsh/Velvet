'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

interface WaveDividerProps {
  variant?: 'white-to-dark' | 'dark-to-white' | 'white-to-gray' | 'gray-to-white' | 'white-to-dark-cta' | 'dark-cta-to-white';
  className?: string;
}

const config: Record<string, { wave: string; bg: string }> = {
  'white-to-dark': { wave: '#0A0A0A', bg: '#FFFFFF' },
  'dark-to-white': { wave: '#FFFFFF', bg: '#0A0A0A' },
  'white-to-gray': { wave: '#F5F5F7', bg: '#FFFFFF' },
  'gray-to-white': { wave: '#FFFFFF', bg: '#F5F5F7' },
  'white-to-dark-cta': { wave: '#0A0A0A', bg: '#FFFFFF' },
  'dark-cta-to-white': { wave: '#FFFFFF', bg: '#0A0A0A' },
};

export function WaveDivider({ variant = 'dark-to-white', className }: WaveDividerProps) {
  const [ref, visible] = useReveal({ threshold: 0.1 });
  const { wave, bg } = config[variant] || config['dark-to-white'];

  return (
    <div
      ref={ref}
      className={cn('relative w-full overflow-hidden -mb-px', className)}
      style={{ backgroundColor: bg }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn(
          'w-full h-14 md:h-20 lg:h-24 block transition-opacity duration-1000',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        fill="none"
      >
        {/* Strand 1 — slow, wide, soft */}
        <path
          d="M0,60 C120,90 240,30 360,60 C480,90 600,35 720,60 C840,85 960,40 1080,60 C1200,80 1320,45 1440,60 L1440,120 L0,120 Z"
          fill={wave}
          opacity="0.2"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;-40,0;0,0" dur="10s" repeatCount="indefinite" />
        </path>

        {/* Strand 2 — medium flow */}
        <path
          d="M0,70 C180,100 320,40 500,70 C680,100 780,42 960,70 C1140,95 1280,48 1440,70 L1440,120 L0,120 Z"
          fill={wave}
          opacity="0.4"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="7s" repeatCount="indefinite" />
        </path>

        {/* Strand 3 — primary crisp wave */}
        <path
          d="M0,80 C200,108 360,52 540,80 C720,108 840,55 1020,80 C1200,105 1340,58 1440,80 L1440,120 L0,120 Z"
          fill={wave}
          opacity="0.6"
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;-18,0;0,0" dur="5s" repeatCount="indefinite" />
        </path>

        {/* Strand 4 — foreground, solid fill to bottom */}
        <path
          d="M0,90 C160,110 320,70 480,90 C640,110 800,72 960,90 C1120,108 1280,75 1440,90 L1440,120 L0,120 Z"
          fill={wave}
        >
          <animateTransform attributeName="transform" type="translate" values="0,0;12,0;0,0" dur="4s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
