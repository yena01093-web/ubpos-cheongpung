import Image from "next/image";

type Ratio = "16/9" | "4/3" | "3/4" | "1/1" | "21/9";

const RATIO_CLASS: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * 사진 자리.
 * src가 있으면 사진을, 없으면 "사진 준비 중" 액자를 그립니다.
 * 나중에 public/ 아래에 이미지를 넣고 경로만 넘기면 그대로 채워집니다.
 */
export default function PhotoSlot({
  src,
  alt = "",
  label,
  ratio = "4/3",
  tone = "light",
  className = "",
  priority = false,
}: {
  src?: string | null;
  alt?: string;
  label: string;
  ratio?: Ratio;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const base = `relative overflow-hidden rounded-card ${RATIO_CLASS[ratio]} ${className}`;

  if (src) {
    return (
      <div className={base}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  const dark = tone === "dark";

  return (
    <div
      className={`${base} paper flex items-center justify-center border border-dashed ${
        dark
          ? "border-lake-400/40 bg-lake-800/40 text-lake-200"
          : "border-sand-400/70 bg-sand-100 text-ink-300"
      }`}
      role="img"
      aria-label={`${label} — 사진 준비 중`}
    >
      <div className="px-6 text-center">
        <svg
          viewBox="0 0 48 40"
          className="mx-auto h-9 w-9 opacity-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
        >
          <rect x="1" y="7" width="46" height="32" rx="4" />
          <path d="M15 7l3-5h12l3 5" />
          <circle cx="24" cy="23" r="8" />
        </svg>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] opacity-70">
          Coming soon
        </p>
        <p className="mt-1.5 text-xs leading-relaxed opacity-80">{label}</p>
      </div>
    </div>
  );
}
