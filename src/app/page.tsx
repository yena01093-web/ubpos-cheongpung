import Link from "next/link";
import LakeArt from "@/components/site/LakeArt";
import PhotoSlot from "@/components/site/PhotoSlot";
import RoomCard from "@/components/rooms/RoomCard";
import { Section, SectionHead } from "@/components/site/Section";
import { BRAND } from "@/content/site";
import { ROOMS, ROOM_COUNT } from "@/content/rooms";
import { SPOTS } from "@/content/travel";

const CONCEPT_POINTS = [
  {
    no: "01",
    title: "여정의 쉼표가 아니라, 목적지",
    body: "잠만 자고 나가는 방이 아니라 이 방에 묵으려고 오는 곳. 숙소가 여행의 이유가 되도록 만들었습니다.",
  },
  {
    no: "02",
    title: "문마다 다른 나라",
    body: `일곱 개의 방, 일곱 개의 나라. 이번엔 멕시코, 다음엔 모로코 — 같은 집에 다시 와도 완전히 다른 곳에 묵게 됩니다.`,
  },
  {
    no: "03",
    title: "창밖은 언제나 청풍호",
    body: "어느 나라를 고르든 창을 열면 같은 호수가 있습니다. 그 대비가 이 집이 가진 전부입니다.",
  },
];

export default function HomePage() {
  const previewSpots = SPOTS.slice(0, 3);

  return (
    <>
      {/* ───────── 히어로 ───────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <LakeArt className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-lake-900/70 via-lake-900/10 to-lake-900/60" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <div className="animate-driftIn">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-sand-100/30 bg-lake-900/30 px-4 py-2 text-[11px] tracking-[0.22em] text-sand-100 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
              충북 제천 · 청풍호
            </span>

            <h1 className="mt-7 max-w-3xl font-serif text-[2.6rem] font-bold leading-[1.16] tracking-tight text-sand-50 text-balance sm:text-6xl">
              {BRAND.tagline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.85] text-sand-100/85 text-pretty sm:text-lg">
              {BRAND.subTagline}. 일곱 개의 방이 각각 다른 나라의 얼굴을 하고
              손님을 기다립니다.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/reserve"
                className="rounded-full bg-spice-600 px-7 py-3.5 text-sm font-bold text-sand-50 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-spice-500"
              >
                예약 문의하기
              </Link>
              <Link
                href="/stay"
                className="rounded-full border border-sand-100/40 px-7 py-3.5 text-sm font-bold text-sand-50 backdrop-blur-sm transition-colors hover:bg-sand-100/10"
              >
                일곱 개의 방 보기
              </Link>
            </div>
          </div>

          {/* 나라 스트립 */}
          <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-sand-100/15 pt-6">
            {ROOMS.map((r) => (
              <span
                key={r.id}
                className="text-[11px] tracking-[0.24em] text-sand-100/55"
              >
                {r.countryEn}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 청풍호 이야기 ───────── */}
      <Section className="bg-sand-50">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Cheongpung Lake"
              title={
                <>
                  잠긴 마을 위에 고인 물,
                  <br />
                  사람들은 이곳을 <em className="not-italic text-lake-700">내륙의 바다</em>
                  라 부릅니다
                </>
              }
              lead="충주댐이 들어서면서 청풍 일대는 물에 잠겼습니다. 논과 집과 학교가 지도에서 사라졌고, 그곳에 살던 사람들은 태어난 자리를 두고 떠나야 했습니다."
            />
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-700 text-pretty">
              그리고 시간이 지나, 잃어버린 자리 위에 다른 풍경이 생겼습니다. 산이
              물을 감싸고 물이 산 사이로 파고들면서 바다도 강도 아닌 모양이
              되었습니다. 아침이면 안개가 수면에 낮게 깔리고, 해 질 무렵에는 물
              전체가 한 번에 색을 바꿉니다.
            </p>
            <p className="mt-5 max-w-2xl font-serif text-lg leading-[1.7] text-lake-800">
              “슬픔 위에 생긴 풍경이라고 해서 덜 아름다운 것은 아닙니다. 다만 그
              내력을 알고 보면, 이 물빛이 조금 다르게 보입니다.”
            </p>
            <Link
              href="/story"
              className="mt-8 inline-flex items-center gap-2 border-b border-spice-500 pb-1 text-sm font-bold text-spice-600 transition-colors hover:border-spice-700 hover:text-spice-700"
            >
              우리의 이야기 읽기 <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="space-y-4">
            <PhotoSlot
              label="청풍호 전경 — 아침 안개가 낮게 깔린 수면"
              ratio="4/3"
              className="shadow-soft"
            />
            <div className="grid grid-cols-2 gap-4">
              <PhotoSlot label="청풍문화재단지" ratio="1/1" />
              <PhotoSlot label="해 질 무렵 호수" ratio="1/1" />
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── 컨셉 ───────── */}
      <section className="relative overflow-hidden bg-lake-900 px-4 py-20 sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-10">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 120 L180 70 L340 118 L520 56 L700 116 L880 62 L1060 122 L1240 74 L1440 118 L1440 0 L0 0 Z"
              fill="#9ccbcb"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            tone="dark"
            align="center"
            eyebrow="Stay as Destination"
            title="숙소가 목적지가 되는 여행"
            lead="이 근처에서 숙소는 대부분 '잠만 자는 곳'이었습니다. 우리는 반대로 생각했습니다. 방 자체가 여기 올 이유가 되면 어떨까."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-lake-800 bg-lake-800 sm:grid-cols-3">
            {CONCEPT_POINTS.map((p) => (
              <div key={p.no} className="bg-lake-900 p-8">
                <span className="font-serif text-3xl font-bold text-spice-500/70">
                  {p.no}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-sand-50">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.8] text-lake-200/85">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 일곱 개의 방 ───────── */}
      <Section className="bg-sand-100/60">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow={`${ROOM_COUNT} Rooms · ${ROOM_COUNT} Countries`}
            title={
              <>
                복도를 걸으면 문마다
                <br />
                다른 나라의 이름이 붙어 있습니다
              </>
            }
          />
          <Link
            href="/stay"
            className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:border-spice-500 hover:text-spice-600"
          >
            전체 객실 보기
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} href={`/stay#${room.id}`} />
          ))}

          {/* 일곱 개 방 끝에 붙는 문의 카드 */}
          <Link
            href="/reserve"
            className="group flex min-h-[260px] flex-col items-center justify-center rounded-card border border-dashed border-spice-400/60 bg-spice-200/25 p-8 text-center transition-colors hover:bg-spice-200/45"
          >
            <span className="font-serif text-4xl text-spice-600">✈</span>
            <p className="mt-4 font-serif text-lg font-bold text-ink-900">
              어느 나라로 가시겠어요?
            </p>
            <p className="mt-2 text-sm text-ink-700">
              날짜와 인원을 알려 주시면
              <br />
              가능한 방을 안내해 드립니다
            </p>
            <span className="mt-5 text-sm font-bold text-spice-600">
              예약 문의하기 →
            </span>
          </Link>
        </div>
      </Section>

      {/* ───────── 청풍 여행 ───────── */}
      <Section className="bg-sand-50">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Around Cheongpung"
            title="문 밖으로 나서면, 청풍"
            lead="케이블카에서 내려다보고, 배 위에서 올려다보고, 물가를 따라 걷습니다. 차로 10분 안쪽에 볼 것이 모여 있습니다."
          />
          <Link
            href="/travel"
            className="rounded-full border border-ink-900/15 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:border-spice-500 hover:text-spice-600"
          >
            여행 정보 전체 보기
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {previewSpots.map((spot) => (
            <article key={spot.id} className="group">
              <PhotoSlot label={spot.name} ratio="4/3" />
              <div className="mt-5 flex items-center gap-2.5">
                <span className="rounded-full bg-lake-100 px-2.5 py-1 text-[11px] font-bold text-lake-700">
                  {spot.category}
                </span>
                <span className="text-[11px] text-ink-300">{spot.distance}</span>
              </div>
              <h3 className="mt-3 font-serif text-xl font-bold text-ink-900">
                {spot.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{spot.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ───────── 마무리 CTA ───────── */}
      <section className="relative overflow-hidden bg-spice-700 px-4 py-20 text-center sm:px-6 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #fdfaf5 0 2px, transparent 2px 22px)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="eyebrow !text-spice-200">Reservation</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.3] text-sand-50 text-balance sm:text-4xl">
            떠날 날짜만 정해 오세요.
            <br />
            나라는 저희가 함께 골라 드릴게요.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-spice-200">
            지금은 문의 접수로 예약을 받고 있습니다. 남겨 주시면 확인 후 연락드립니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/reserve"
              className="rounded-full bg-sand-50 px-7 py-3.5 text-sm font-bold text-spice-700 transition-transform hover:-translate-y-0.5"
            >
              예약 문의하기
            </Link>
            <a
              href={`tel:${BRAND.phone}`}
              className="rounded-full border border-sand-100/40 px-7 py-3.5 text-sm font-bold text-sand-50 transition-colors hover:bg-sand-50/10"
            >
              전화 {BRAND.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
