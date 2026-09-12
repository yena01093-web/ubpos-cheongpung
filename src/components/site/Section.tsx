export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${tone === "dark" ? "!text-spice-300" : ""}`}>
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-serif text-3xl font-bold leading-[1.28] tracking-tight text-balance sm:text-4xl ${
          tone === "dark" ? "text-sand-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-[15px] leading-[1.85] text-pretty sm:text-base ${
            tone === "dark" ? "text-lake-200" : "text-ink-700"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/** 페이지 상단 공통 헤더 (홈 제외한 서브 페이지용) */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-lake-900 px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 200 L160 150 L300 190 L450 128 L620 186 L780 132 L940 192 L1100 140 L1280 196 L1440 154 L1440 300 L0 300 Z"
            fill="#9ccbcb"
          />
        </svg>
      </div>
      <div className="relative mx-auto max-w-6xl">
        <span className="eyebrow !text-spice-300">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.22] tracking-tight text-sand-50 text-balance sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-lake-200 text-pretty sm:text-base">
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}
