import type { Metadata } from "next";
import Link from "next/link";
import Motif from "@/components/site/Motif";
import PhotoSlot from "@/components/site/PhotoSlot";
import { PageHero, Section, SectionHead } from "@/components/site/Section";
import { ROOMS, ROOM_COUNT } from "@/content/rooms";
import { BRAND } from "@/content/site";

export const metadata: Metadata = {
  title: "민박 소개",
  description: `${ROOM_COUNT}개의 방, ${ROOM_COUNT}개의 나라. 방마다 다른 나라를 담은 청풍호 앞 민박입니다.`,
};

const HOUSE_INFO = [
  { label: "입실 / 퇴실", value: `${BRAND.checkIn} / ${BRAND.checkOut}` },
  { label: "객실 수", value: `${ROOM_COUNT}개 (나라별 테마)` },
  { label: "취사", value: "공용 주방 이용" },
  { label: "주차", value: "건물 앞 무료 주차" },
];

export default function StayPage() {
  return (
    <>
      <PageHero
        eyebrow={`${ROOM_COUNT} Rooms`}
        title={
          <>
            일곱 개의 문,
            <br />
            일곱 개의 나라
          </>
        }
        lead="타일 한 장, 등불 하나, 패브릭의 짜임까지 방마다 따로 골랐습니다. 어느 방을 고르든 창을 열면 청풍호가 있습니다."
      />

      {/* 방 목록 인덱스 */}
      <div className="border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 sm:px-6">
          {ROOMS.map((room) => (
            <a
              key={room.id}
              href={`#${room.id}`}
              className="shrink-0 rounded-full border border-sand-300 bg-sand-50 px-4 py-2 text-xs font-bold text-ink-700 transition-colors hover:border-spice-400 hover:text-spice-600"
            >
              <span aria-hidden>{room.emoji}</span> {room.country} · {room.roomName}
            </a>
          ))}
        </div>
      </div>

      {/* 객실 상세 */}
      <Section className="bg-sand-50">
        <div className="space-y-24 sm:space-y-32">
          {ROOMS.map((room, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={room.id}
                id={room.id}
                className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* 비주얼 */}
                <div className={flipped ? "lg:order-2" : ""}>
                  <div
                    className="relative overflow-hidden rounded-card shadow-soft"
                    style={{
                      background: `linear-gradient(140deg, ${room.colors.from}, ${room.colors.to})`,
                    }}
                  >
                    <Motif
                      kind={room.motif}
                      id={`detail-${room.id}`}
                      color={room.colors.ink}
                      className="absolute inset-0 h-full w-full"
                      opacity={0.26}
                    />
                    <div className="relative p-5">
                      <div className="mb-5 flex items-start justify-between">
                        <div>
                          <p
                            className="text-[11px] font-bold uppercase tracking-[0.3em]"
                            style={{ color: room.colors.ink }}
                          >
                            {room.countryEn}
                          </p>
                          <p
                            className="mt-1 font-serif text-2xl font-bold"
                            style={{ color: room.colors.ink }}
                          >
                            {room.roomName}
                          </p>
                        </div>
                        <span
                          className="stamp px-3 py-1.5 text-[10px] font-bold"
                          style={{ color: room.colors.accent }}
                        >
                          {room.stamp}
                        </span>
                      </div>
                      <PhotoSlot
                        src={room.photos[0]}
                        alt={`${room.country} ${room.roomName} 객실`}
                        label={`${room.country} · ${room.roomName} 객실 사진`}
                        ratio="4/3"
                        tone="dark"
                      />
                    </div>
                  </div>
                </div>

                {/* 텍스트 */}
                <div className={flipped ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>
                      {room.emoji}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.28em] text-spice-600">
                      ROOM {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
                    {room.country} · {room.roomName}
                  </h2>
                  <p className="mt-3 font-serif text-lg text-lake-700">{room.concept}</p>

                  <p className="mt-6 text-[15px] leading-[1.9] text-ink-700 text-pretty">
                    {room.description}
                  </p>

                  <div
                    className="mt-7 rounded-2xl border-l-2 bg-sand-100/70 py-4 pl-5 pr-4"
                    style={{ borderColor: room.colors.to }}
                  >
                    <p className="text-[11px] font-bold tracking-[0.2em] text-ink-300">
                      이 방에서의 하루
                    </p>
                    <p className="mt-2 font-serif text-[15px] leading-[1.8] text-ink-900">
                      {room.moment}
                    </p>
                  </div>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-sand-200 pt-6 text-sm">
                    <div>
                      <dt className="text-[11px] tracking-[0.16em] text-ink-300">인원</dt>
                      <dd className="mt-1 text-ink-900">
                        기준 {room.capacity.standard}인 / 최대 {room.capacity.max}인
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] tracking-[0.16em] text-ink-300">잠자리</dt>
                      <dd className="mt-1 text-ink-900">{room.bed}</dd>
                    </div>
                  </dl>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {room.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-sand-300 px-3 py-1.5 text-xs text-ink-700"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/reserve?room=${room.id}`}
                    className="mt-8 inline-flex rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-600"
                  >
                    이 방으로 문의하기
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* 이용 안내 */}
      <Section className="bg-sand-100/70">
        <SectionHead
          eyebrow="House Info"
          title="머무시기 전에"
          lead="아직 정리 중인 항목이 있습니다. 확정되는 대로 이 자리에 채워 넣겠습니다."
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-sand-200 bg-sand-200 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSE_INFO.map((item) => (
            <div key={item.label} className="bg-sand-50 p-6">
              <dt className="text-[11px] font-bold tracking-[0.2em] text-ink-300">
                {item.label}
              </dt>
              <dd className="mt-2 font-serif text-lg text-ink-900">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 rounded-card border border-dashed border-sand-400 bg-sand-50 p-6 text-sm leading-[1.9] text-ink-700">
          <p className="font-bold text-ink-900">요금 안내</p>
          <p className="mt-2">
            객실 요금은 성수기·비수기와 인원에 따라 달라집니다. 지금은 문의를 남겨
            주시면 날짜에 맞춰 안내해 드리고 있습니다. 온라인 결제는 준비 중입니다.
          </p>
        </div>
      </Section>
    </>
  );
}
