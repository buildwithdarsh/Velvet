'use client';

/**
 * Full-page loader — animated scissors snipping a golden hair strand.
 * All animations use CSS @keyframes so they start instantly on mount.
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[200] bg-[var(--c-black)] flex flex-col items-center justify-center gap-8">
      <div className="relative w-52 h-52">
        {/* Ambient floating hair strands */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
          <path className="loader-strand-1" d="M10,85 C50,65 100,110 150,80 C180,65 195,90 200,78" stroke="var(--c-gold)" strokeWidth="1" strokeLinecap="round" opacity="0.12" />
          <path className="loader-strand-2" d="M5,115 C45,100 95,130 145,105 C175,90 195,115 200,105" stroke="var(--c-gold)" strokeWidth="0.8" strokeLinecap="round" opacity="0.1" />
          <path className="loader-strand-3" d="M0,100 C50,78 100,122 150,92 C180,75 195,102 200,90" stroke="var(--c-gold)" strokeWidth="0.6" strokeLinecap="round" opacity="0.08" />
        </svg>

        {/* Main animation: strand + scissors */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" fill="none">
          {/* Golden hair strand — draws itself continuously */}
          <path
            d="M10,100 C50,75 100,125 150,95 C175,80 195,105 200,92"
            stroke="var(--c-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="loader-draw-strand"
          />

          {/* Scissors group — slides across and snips */}
          <g className="loader-scissors-slide">
            {/* Top blade */}
            <g className="loader-blade-top">
              <path d="M0,-14 L22,-24 L24,-20 L4,-10 Z" fill="white" opacity="0.9" />
              <circle cx="-4" cy="-16" r="7" stroke="white" strokeWidth="1.8" fill="none" opacity="0.6" />
            </g>
            {/* Bottom blade */}
            <g className="loader-blade-bottom">
              <path d="M0,10 L22,20 L24,16 L4,6 Z" fill="white" opacity="0.9" />
              <circle cx="-4" cy="12" r="7" stroke="white" strokeWidth="1.8" fill="none" opacity="0.6" />
            </g>
            {/* Pivot */}
            <circle cx="4" cy="-2" r="2.5" fill="var(--c-gold)" />
          </g>

          {/* Sparkle particles */}
          <circle className="loader-particle-1" r="1.2" fill="var(--c-gold)" />
          <circle className="loader-particle-2" r="0.9" fill="var(--c-gold-light)" />
          <circle className="loader-particle-3" r="0.7" fill="var(--c-gold)" />
        </svg>

        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--c-gold)]/[0.06] loader-glow-ring" />
      </div>

      {/* Brand */}
      <div className="text-center">
        <p className="font-heading text-xl text-white/90 tracking-tight">Glamour Waves</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="loader-dot w-1.5 h-1.5 rounded-full bg-[var(--c-gold)]" style={{ animationDelay: '0s' }} />
          <span className="loader-dot w-1.5 h-1.5 rounded-full bg-[var(--c-gold)]" style={{ animationDelay: '0.15s' }} />
          <span className="loader-dot w-1.5 h-1.5 rounded-full bg-[var(--c-gold)]" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>

      {/* All animations via CSS — instant start, no SMIL delays */}
      <style>{`
        /* Hair strand draws itself in a loop */
        .loader-draw-strand {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: drawStrand 2s ease-in-out infinite;
        }
        @keyframes drawStrand {
          0%   { stroke-dashoffset: 260; opacity: 0; }
          10%  { opacity: 1; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { opacity: 0; }
          100% { stroke-dashoffset: -260; opacity: 0; }
        }

        /* Scissors slide from left to right across the strand */
        .loader-scissors-slide {
          animation: scissorsSlide 2s ease-in-out infinite;
        }
        @keyframes scissorsSlide {
          0%   { transform: translate(30px, 100px); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translate(130px, 96px); opacity: 1; }
          70%  { transform: translate(160px, 94px); opacity: 1; }
          85%  { opacity: 0; }
          100% { transform: translate(180px, 92px); opacity: 0; }
        }

        /* Blade snip — top blade rotates up and down */
        .loader-blade-top {
          transform-origin: 4px -2px;
          animation: snipTop 0.4s ease-in-out infinite;
        }
        @keyframes snipTop {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-12deg); }
        }

        /* Bottom blade mirrors top */
        .loader-blade-bottom {
          transform-origin: 4px -2px;
          animation: snipBottom 0.4s ease-in-out infinite;
        }
        @keyframes snipBottom {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(10deg); }
        }

        /* Particles spray out from the cut point */
        .loader-particle-1 {
          animation: particle1 2s ease-out infinite;
        }
        @keyframes particle1 {
          0%, 40%  { cx: 100; cy: 98; opacity: 0; }
          45%      { opacity: 0.9; }
          70%      { cx: 125; cy: 68; opacity: 0.4; }
          100%     { cx: 140; cy: 55; opacity: 0; }
        }

        .loader-particle-2 {
          animation: particle2 2s ease-out infinite;
        }
        @keyframes particle2 {
          0%, 42%  { cx: 102; cy: 102; opacity: 0; }
          48%      { opacity: 0.8; }
          75%      { cx: 130; cy: 130; opacity: 0.3; }
          100%     { cx: 145; cy: 145; opacity: 0; }
        }

        .loader-particle-3 {
          animation: particle3 2s ease-out infinite;
        }
        @keyframes particle3 {
          0%, 44%  { cx: 98; cy: 96; opacity: 0; }
          50%      { opacity: 0.7; }
          72%      { cx: 118; cy: 60; opacity: 0.3; }
          100%     { cx: 135; cy: 48; opacity: 0; }
        }

        /* Ambient strand float */
        .loader-strand-1 { animation: strandFloat1 4s ease-in-out infinite; }
        .loader-strand-2 { animation: strandFloat2 5s ease-in-out infinite; }
        .loader-strand-3 { animation: strandFloat3 6s ease-in-out infinite; }

        @keyframes strandFloat1 {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(8px); }
        }
        @keyframes strandFloat2 {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(-6px); }
        }
        @keyframes strandFloat3 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }

        /* Glow ring pulse */
        .loader-glow-ring {
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50%      { transform: scale(1.06); opacity: 0.12; }
        }

        /* Loading dots */
        .loader-dot {
          animation: loaderDot 1s ease-in-out infinite;
        }
        @keyframes loaderDot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
