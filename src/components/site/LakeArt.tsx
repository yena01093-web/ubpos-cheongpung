/**
 * 청풍호 풍경 일러스트 (SVG).
 * 사진이 준비되기 전까지 히어로 영역을 채우는 그림이고, 사진이 생겨도
 * 배경 레이어로 계속 쓸 수 있게 순수 SVG로만 그렸습니다.
 */
export default function LakeArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07222b" />
          <stop offset="42%" stopColor="#103d4b" />
          <stop offset="72%" stopColor="#2a6470" />
          <stop offset="90%" stopColor="#c98a45" />
          <stop offset="100%" stopColor="#e0a12c" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d89a46" />
          <stop offset="18%" stopColor="#4b7d84" />
          <stop offset="100%" stopColor="#0b2f3a" />
        </linearGradient>
        <radialGradient id="sun" cx="0.66" cy="0.98" r="0.42">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e0a12c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e0a12c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5f1ee" stopOpacity="0" />
          <stop offset="55%" stopColor="#e5f1ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e5f1ee" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 하늘 */}
      <rect width="1440" height="620" fill="url(#sky)" />
      <rect width="1440" height="620" fill="url(#sun)" />

      {/* 먼 능선 */}
      <path
        d="M0 470 L150 402 L268 452 L404 366 L540 440 L690 352 L826 432 L980 372 L1120 446 L1260 388 L1440 452 L1440 620 L0 620 Z"
        fill="#0b2f3a"
        opacity="0.42"
      />
      {/* 안개 띠 */}
      <rect y="430" width="1440" height="130" fill="url(#mist)" />
      {/* 중간 능선 */}
      <path
        d="M0 520 L128 462 L250 512 L392 434 L520 498 L668 424 L800 500 L944 440 L1090 506 L1236 452 L1440 512 L1440 620 L0 620 Z"
        fill="#0b2f3a"
        opacity="0.68"
      />
      {/* 가까운 능선 */}
      <path
        d="M0 566 L110 528 L232 566 L360 512 L494 560 L630 506 L768 562 L910 516 L1052 566 L1200 524 L1330 566 L1440 538 L1440 620 L0 620 Z"
        fill="#07222b"
      />

      {/* 물 */}
      <rect y="620" width="1440" height="280" fill="url(#water)" />

      {/* 물 위 빛 반사 */}
      <g fill="#ffe2a8" opacity="0.5">
        <rect x="900" y="640" width="150" height="3" rx="1.5" />
        <rect x="860" y="660" width="230" height="3" rx="1.5" opacity="0.8" />
        <rect x="920" y="684" width="120" height="2.5" rx="1.2" opacity="0.6" />
        <rect x="840" y="710" width="270" height="3" rx="1.5" opacity="0.45" />
        <rect x="910" y="742" width="140" height="2.5" rx="1.2" opacity="0.3" />
      </g>

      {/* 잔물결 */}
      <g stroke="#9ccbcb" strokeWidth="1.5" opacity="0.16" fill="none">
        <path d="M-40 676 q60 -9 120 0 t120 0 t120 0 t120 0 t120 0 t120 0" />
        <path d="M-40 726 q70 -10 140 0 t140 0 t140 0 t140 0 t140 0" />
        <path d="M-40 782 q80 -11 160 0 t160 0 t160 0 t160 0 t160 0" />
        <path d="M-40 842 q90 -12 180 0 t180 0 t180 0 t180 0" />
      </g>
    </svg>
  );
}
