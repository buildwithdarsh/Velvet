'use client';

import { cn } from '@/lib/utils';

interface HairBackgroundProps {
  variant?: 'light' | 'dark';
  density?: 'sparse' | 'normal' | 'dense';
  className?: string;
}

/**
 * Full-background animated hair strands — sketch-style flowing lines
 * that drift gently like scattered/spread hair across the section.
 */
export function HairBackground({ variant = 'light', density = 'normal', className }: HairBackgroundProps) {
  const stroke = variant === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const strokeAccent = variant === 'dark' ? 'rgba(201,169,110,0.06)' : 'rgba(201,169,110,0.05)';

  // Each strand is a long flowing cubic bezier path — like a single hair
  const strands = [
    // Long flowing strands — sweeping left to right
    { d: 'M-100,120 C200,80 400,200 700,140 C1000,80 1200,180 1540,100', dur: '25s', delay: '0s', w: 1.2, accent: false },
    { d: 'M-50,200 C150,260 450,140 750,220 C1050,300 1250,160 1540,240', dur: '30s', delay: '-5s', w: 0.8, accent: true },
    { d: 'M-80,320 C250,280 500,380 800,300 C1100,220 1300,340 1540,280', dur: '22s', delay: '-8s', w: 1.0, accent: false },
    { d: 'M-60,440 C200,500 480,380 780,460 C1080,540 1280,400 1540,480', dur: '28s', delay: '-3s', w: 0.7, accent: true },
    { d: 'M-40,560 C300,510 550,600 850,540 C1150,480 1350,580 1540,520', dur: '24s', delay: '-12s', w: 1.1, accent: false },
    { d: 'M-90,680 C180,720 420,640 720,700 C1020,760 1220,660 1540,720', dur: '26s', delay: '-7s', w: 0.9, accent: false },

    // Shorter curving strands — like loose scattered hair
    { d: 'M200,50 C350,120 500,30 650,100 C800,170 950,60 1100,130', dur: '20s', delay: '-2s', w: 0.6, accent: true },
    { d: 'M100,350 C280,300 460,400 640,340 C820,280 1000,380 1180,320', dur: '18s', delay: '-9s', w: 0.7, accent: false },
    { d: 'M300,550 C450,600 620,500 790,570 C960,640 1130,530 1300,590', dur: '21s', delay: '-4s', w: 0.5, accent: true },
    { d: 'M50,750 C250,700 450,800 650,730 C850,660 1050,770 1250,700', dur: '23s', delay: '-11s', w: 0.8, accent: false },

    // Wispy thin strands — top layer
    { d: 'M-20,180 C180,150 380,220 580,170 C780,120 980,200 1180,160 C1380,120 1440,180 1540,150', dur: '32s', delay: '-6s', w: 0.4, accent: false },
    { d: 'M-30,480 C220,440 440,520 660,460 C880,400 1100,500 1320,440 C1440,400 1500,460 1540,430', dur: '35s', delay: '-14s', w: 0.4, accent: true },
    { d: 'M-10,620 C200,660 400,580 600,640 C800,700 1000,600 1200,660 C1400,720 1500,640 1540,680', dur: '29s', delay: '-10s', w: 0.3, accent: false },
  ];

  // Dense adds extra strands
  const extraStrands = density === 'dense' ? [
    { d: 'M-70,80 C130,140 330,60 530,120 C730,180 930,80 1130,140 C1330,200 1440,120 1540,160', dur: '27s', delay: '-1s', w: 0.5, accent: false },
    { d: 'M-50,400 C200,360 400,440 600,380 C800,320 1000,420 1200,360 C1400,300 1500,380 1540,350', dur: '31s', delay: '-13s', w: 0.6, accent: true },
    { d: 'M100,700 C300,740 500,680 700,740 C900,800 1100,700 1300,760', dur: '19s', delay: '-8s', w: 0.7, accent: false },
    { d: 'M-40,260 C160,220 360,300 560,240 C760,180 960,280 1160,220 C1360,160 1440,240 1540,200', dur: '33s', delay: '-15s', w: 0.4, accent: true },
  ] : [];

  const sparseStrands = density === 'sparse' ? strands.filter((_, i) => i % 2 === 0) : [...strands, ...extraStrands];

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        {sparseStrands.map((strand, i) => (
          <path
            key={i}
            d={strand.d}
            stroke={strand.accent ? strokeAccent : stroke}
            strokeWidth={strand.w}
            strokeLinecap="round"
            fill="none"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0;${i % 2 === 0 ? '30' : '-25'},${i % 3 === 0 ? '8' : '-6'};0,0`}
              dur={strand.dur}
              begin={strand.delay}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  );
}
