import type { Metadata } from "next";
import Link from "next/link";
import PhotoSlot from "@/components/site/PhotoSlot";
import { PageHero, Section, SectionHead } from "@/components/site/Section";
import { CHAPTERS, IS_DRAFT, RENOVATION } from "@/content/story";

export const metadata: Metadata = {
  title: "우리의 이야기",
  description:
    "물에 잠긴 마을, 다시 떠오른 물빛, 오래 비어 있던 집. 이 민박이 생기기까지의 기록입니다.",
};

export default function StoryPage() {
  const showDraftBadge = IS_DRAFT && process.env.NODE_ENV === "development";

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            왜 하필 청풍에서,
            <br />
            왜 하필 세계여행이었나
          </>
        }
        lead="물에 잠긴 마을에서 시작해, 오래 비어 있던 집을 지나, 일곱 개의 문까지. 순서대로 적어 두었습니다."
      />

      {showDraftBadge && (
        <div className="border-b border-spice-300 bg-spice-200/60 px-4 py-3 text-center text-xs text-spice-900 sm:px-6">
          ⚠️ <strong>개발 모드 안내</strong> — 아래 본문은 톤을 잡기 위한 <b>초안</b>입니다.
          실제 이야기로 교체한 뒤 <code>src/content/story.ts</code>의{" "}
          <code>IS_DRAFT</code>를 <code>false</code>로 바꾸면 이 배지가 사라집니다.
        </div>
      )}

      {/* ───────── 챕터 ───────── */}
      <Section className="bg-sand-50">
        <div className="space-y-24 sm:space-y-32">
          {CHAPTERS.map((ch, i) => (
            <article key={ch.no} className="relative">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-5xl font-bold text-spice-300">
                      {ch.no}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                      {ch.title}
                    </h2>
                  </div>

                  <p className="mt-6 font-serif text-lg leading-[1.75] text-lake-800 text-pretty sm:text-xl">
                    {ch.lead}
                  </p>

                  <div className="mt-6 space-y-5">
                    {ch.body.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] leading-[1.95] text-ink-700 text-pretty"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {ch.pull && (
                    <blockquote className="mt-8 border-l-2 border-spice-500 pl-5">
                      <p className="font-serif text-xl leading-[1.6] text-ink-900">
                        “{ch.pull}”
                      </p>
                    </blockquote>
                  )}
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <PhotoSlot
                    src={ch.photos[0]}
                    label={`${ch.no}. ${ch.title}`}
                    ratio={i % 2 === 0 ? "4/3" : "3/4"}
                    className="shadow-soft"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ───────── 수리 기록 ───────── */}
      <Section className="bg-sand-100/70">
        <SectionHead
          eyebrow="Renovation Log"
          title="고치는 중입니다"
          lead="사진을 하나씩 모으고 있습니다. Before / After가 준비되는 대로 이 자리에 붙입니다."
        />

        <ol className="mt-14 space-y-6">
          {RENOVATION.map((step) => (
            <li
              key={step.phase}
              className="grid gap-6 rounded-card border border-sand-200 bg-sand-50 p-6 shadow-soft sm:p-7 lg:grid-cols-[1fr_1.2fr] lg:gap-10"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold tracking-[0.24em] text-spice-600">
                    {step.phase}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      step.done
                        ? "bg-lake-100 text-lake-700"
                        : "bg-sand-200 text-ink-500"
                    }`}
                  >
                    {step.done ? "완료" : "진행 중"}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-bold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-ink-700">{step.note}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <figure>
                  <PhotoSlot
                    src={step.beforePhoto}
                    label="Before"
                    ratio="4/3"
                    alt={`${step.title} 전`}
                  />
                  <figcaption className="mt-2 text-center text-[11px] font-bold tracking-[0.2em] text-ink-300">
                    BEFORE
                  </figcaption>
                </figure>
                <figure>
                  <PhotoSlot
                    src={step.afterPhoto}
                    label="After"
                    ratio="4/3"
                    alt={`${step.title} 후`}
                  />
                  <figcaption className="mt-2 text-center text-[11px] font-bold tracking-[0.2em] text-spice-600">
                    AFTER
                  </figcaption>
                </figure>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 rounded-card bg-lake-900 px-7 py-10 text-center">
          <p className="font-serif text-2xl font-bold leading-[1.5] text-sand-50 text-balance">
            아직 고치는 중인 집이지만,
            <br />
            창밖 풍경은 이미 완성되어 있습니다.
          </p>
          <Link
            href="/reserve"
            className="mt-7 inline-flex rounded-full bg-spice-500 px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-400"
          >
            예약 문의하기
          </Link>
        </div>
      </Section>
    </>
  );
}
