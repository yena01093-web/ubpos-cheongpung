import type { Metadata } from "next";
import PhotoSlot from "@/components/site/PhotoSlot";
import { PageHero, Section, SectionHead } from "@/components/site/Section";
import { EATERIES, PARTNERS, SPOTS } from "@/content/travel";
import { BRAND } from "@/content/site";

export const metadata: Metadata = {
  title: "청풍 여행",
  description:
    "청풍호반 케이블카, 청풍문화재단지, 유람선까지 — 민박에서 가까운 청풍 여행 정보를 모았습니다.",
};

export default function TravelPage() {
  return (
    <>
      <PageHero
        eyebrow="Around Cheongpung"
        title={
          <>
            문 밖으로 나서면,
            <br />
            청풍
          </>
        }
        lead="케이블카에서 내려다보고, 배 위에서 올려다보고, 물가를 따라 걷습니다. 우리가 직접 다녀보고 추리는 중입니다."
      />

      {/* ───────── 관광지 ───────── */}
      <Section className="bg-sand-50">
        <SectionHead
          eyebrow="Places"
          title="가까운 곳부터"
          lead="아래 소요 시간은 민박 기준 대략적인 값입니다. 운영시간과 요금은 계절·날씨에 따라 자주 바뀌니 방문 전에 한 번 확인해 주세요."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SPOTS.map((spot) => (
            <article
              key={spot.id}
              className="group flex flex-col overflow-hidden rounded-card border border-sand-200 bg-sand-50 shadow-soft transition-shadow hover:shadow-lift"
            >
              <PhotoSlot
                src={spot.photos[0]}
                alt={spot.name}
                label={spot.name}
                ratio="4/3"
                className="!rounded-none"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-lake-100 px-2.5 py-1 text-[11px] font-bold text-lake-700">
                    {spot.category}
                  </span>
                  <span className="text-[11px] text-ink-300">{spot.distance}</span>
                </div>

                <h3 className="mt-3.5 font-serif text-xl font-bold text-ink-900">
                  {spot.name}
                </h3>
                <p className="mt-1.5 text-sm text-lake-700">{spot.summary}</p>
                <p className="mt-4 text-sm leading-[1.85] text-ink-700">{spot.detail}</p>

                {spot.tip && (
                  <p className="mt-auto flex gap-2 pt-5 text-xs leading-relaxed text-ink-500">
                    <span className="shrink-0 font-bold text-spice-600">TIP</span>
                    <span>{spot.tip}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ───────── 맛집 ───────── */}
      <Section className="bg-sand-100/70">
        <SectionHead
          eyebrow="Table"
          title="이 동네에서 뭘 먹지"
          lead="직접 가보고 좋았던 곳만 올릴 생각이라 천천히 채우고 있습니다. 빈 자리는 아직 안 가본 자리입니다."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EATERIES.map((e) =>
            e.ready ? (
              <article
                key={e.id}
                className="flex flex-col rounded-card border border-sand-200 bg-sand-50 p-6 shadow-soft"
              >
                <span className="text-[11px] font-bold tracking-[0.2em] text-spice-600">
                  {e.genre}
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold text-ink-900">
                  {e.name}
                </h3>
                <p className="mt-1 text-[11px] text-ink-300">{e.distance}</p>
                <p className="mt-4 text-sm leading-[1.8] text-ink-700">{e.note}</p>

                <dl className="mt-5 space-y-1.5 border-t border-sand-200 pt-4 text-xs text-ink-500">
                  {e.address && <dd>{e.address}</dd>}
                  {e.phone && (
                    <dd>
                      <a href={`tel:${e.phone}`} className="hover:text-spice-600">
                        {e.phone}
                      </a>
                    </dd>
                  )}
                </dl>

                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-bold text-spice-600 hover:text-spice-700"
                  >
                    홈페이지 →
                  </a>
                )}
              </article>
            ) : (
              <div
                key={e.id}
                className="paper flex min-h-[200px] flex-col items-center justify-center rounded-card border border-dashed border-sand-400 p-6 text-center"
              >
                <span className="text-2xl opacity-30" aria-hidden>
                  🍽
                </span>
                <p className="mt-3 text-sm font-bold text-ink-500">준비 중</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-300">
                  다녀와 보고
                  <br />
                  채워 넣겠습니다
                </p>
              </div>
            )
          )}
        </div>
      </Section>

      {/* ───────── 함께하는 숙소 ───────── */}
      <Section className="bg-sand-50">
        <SectionHead
          eyebrow="Neighbours"
          title="함께하는 청풍의 숙소들"
          lead="한 집이 다 채울 수 없는 날들이 있습니다. 근처의 좋은 숙소들과 함께 청풍을 소개하려고 자리를 비워 두었습니다."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PARTNERS.map((p) =>
            p.ready ? (
              <article
                key={p.id}
                className="rounded-card border border-sand-200 bg-sand-50 p-6 shadow-soft"
              >
                <span className="text-[11px] font-bold tracking-[0.2em] text-spice-600">
                  {p.type}
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold text-ink-900">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-lake-700">{p.keyword}</p>
                <p className="mt-4 text-sm leading-[1.8] text-ink-700">{p.note}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-bold text-spice-600"
                  >
                    보러 가기 →
                  </a>
                )}
              </article>
            ) : (
              <div
                key={p.id}
                className="paper flex min-h-[220px] flex-col items-center justify-center rounded-card border border-dashed border-lake-400/60 bg-lake-100/40 p-6 text-center"
              >
                <span className="text-2xl opacity-40" aria-hidden>
                  🏡
                </span>
                <p className="mt-3 text-sm font-bold text-lake-700">입점 자리</p>
                <p className="mt-1.5 text-xs leading-relaxed text-lake-600/80">
                  청풍의 숙소를
                  <br />
                  모시는 중입니다
                </p>
              </div>
            )
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-card bg-lake-900 px-7 py-7">
          <div>
            <p className="font-serif text-xl font-bold text-sand-50">
              청풍에서 숙소를 하고 계신가요?
            </p>
            <p className="mt-2 text-sm text-lake-200">
              함께 소개하고 싶습니다. 편하게 연락 주세요.
            </p>
          </div>
          <a
            href={`tel:${BRAND.phone}`}
            className="rounded-full bg-spice-500 px-6 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-400"
          >
            입점 문의 {BRAND.phone}
          </a>
        </div>
      </Section>
    </>
  );
}
