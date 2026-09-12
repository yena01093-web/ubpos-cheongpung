import type { Motif as MotifKind } from "@/content/rooms";

/**
 * 나라별 장식 패턴. 사진이 없는 동안 각 방의 성격을 시각적으로 구분해 주는 장치입니다.
 * `id`는 SVG pattern id 충돌을 막기 위해 방마다 다른 값을 넘겨야 합니다.
 */
export default function Motif({
  kind,
  id,
  color,
  className = "",
  opacity = 0.5,
}: {
  kind: MotifKind;
  id: string;
  color: string;
  className?: string;
  opacity?: number;
}) {
  const pid = `motif-${id}`;
  return (
    <svg className={className} aria-hidden opacity={opacity}>
      <defs>
        <pattern
          id={pid}
          width={TILE[kind].w}
          height={TILE[kind].h}
          patternUnits="userSpaceOnUse"
        >
          <g stroke={color} fill="none" strokeWidth="1.6" strokeLinecap="round">
            {TILE[kind].render(color)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

const TILE: Record<
  MotifKind,
  { w: number; h: number; render: (c: string) => React.ReactNode }
> = {
  // 아메리카 — 도로 중앙선과 이정표
  route: {
    w: 72,
    h: 48,
    render: () => (
      <>
        <path d="M0 24 H26 M46 24 H72" />
        <path d="M32 16 l8 8 l-8 8" />
      </>
    ),
  },
  // 멕시코 — 파펠 피카도 삼각 깃발
  papel: {
    w: 60,
    h: 48,
    render: (c) => (
      <>
        <path d="M0 8 q30 12 60 0" />
        <path d="M12 12 l18 0 l-9 18 Z" fill={c} fillOpacity="0.35" />
        <path d="M36 14 l18 0 l-9 18 Z" fill={c} fillOpacity="0.2" />
      </>
    ),
  },
  // 케냐 — 초원의 아카시아와 지평선
  savanna: {
    w: 80,
    h: 56,
    render: (c) => (
      <>
        <path d="M0 44 H80" strokeOpacity="0.5" />
        <path d="M20 44 V28 M10 28 q10 -12 20 0" />
        <circle cx="62" cy="18" r="6" fill={c} fillOpacity="0.28" stroke="none" />
      </>
    ),
  },
  // 모로코 — 제리주 8각 별
  zellige: {
    w: 56,
    h: 56,
    render: (c) => (
      <>
        <path d="M28 6 L38 18 L50 28 L38 38 L28 50 L18 38 L6 28 L18 18 Z" />
        <rect
          x="20"
          y="20"
          width="16"
          height="16"
          transform="rotate(45 28 28)"
          fill={c}
          fillOpacity="0.22"
          stroke="none"
        />
      </>
    ),
  },
  // 그리스 — 에게해의 물결과 아치
  aegean: {
    w: 64,
    h: 44,
    render: () => (
      <>
        <path d="M0 30 q16 -12 32 0 t32 0" />
        <path d="M18 18 a14 14 0 0 1 28 0" strokeOpacity="0.55" />
      </>
    ),
  },
  // 인도 — 자알리 격자
  jaali: {
    w: 48,
    h: 48,
    render: (c) => (
      <>
        <path d="M24 2 a22 22 0 0 1 0 44 a22 22 0 0 1 0 -44" strokeOpacity="0.45" />
        <path d="M2 24 H46 M24 2 V46" strokeOpacity="0.3" />
        <circle cx="24" cy="24" r="5" fill={c} fillOpacity="0.3" stroke="none" />
      </>
    ),
  },
  // 베트남 — 매달린 등불
  lantern: {
    w: 56,
    h: 64,
    render: (c) => (
      <>
        <path d="M14 0 V12 M42 0 V22" strokeOpacity="0.5" />
        <ellipse cx="14" cy="22" rx="9" ry="11" fill={c} fillOpacity="0.28" />
        <ellipse cx="42" cy="34" rx="7" ry="9" fill={c} fillOpacity="0.18" />
        <path d="M14 33 V39 M42 43 V48" strokeOpacity="0.5" />
      </>
    ),
  },
};
