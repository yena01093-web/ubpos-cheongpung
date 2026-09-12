import type { Metadata } from "next";
import { Suspense } from "react";
import ReserveForm from "@/components/reserve/ReserveForm";
import { PageHero, Section } from "@/components/site/Section";
import { BRAND } from "@/content/site";

export const metadata: Metadata = {
  title: "예약 문의",
  description:
    "날짜와 인원, 원하는 나라를 알려 주시면 확인 후 연락드립니다. 청풍호 앞 세계여행 민박 예약 문의.",
};

const GUIDE = [
  {
    title: "지금은 문의 접수로 받습니다",
    body: "온라인 결제는 아직 준비 중입니다. 문의를 남겨 주시면 가능 여부와 요금을 확인해 연락드리고, 그때 최종 확정합니다.",
  },
  {
    title: "방을 못 정하셨어도 괜찮습니다",
    body: "‘상담 후 결정’으로 남겨 주시면 날짜에 비어 있는 방 중에서 일행 구성에 맞는 곳을 골라 안내해 드립니다.",
  },
  {
    title: "인원이 많다면",
    body: "한 방의 최대 인원을 넘는 일행은 여러 방을 묶어 안내해 드릴 수 있습니다. 남기실 말씀에 일행 구성을 적어 주세요.",
  },
];

export default function ReservePage() {
  return (
    <>
      <PageHero
        eyebrow="Reservation"
        title={
          <>
            떠날 날짜만 정해 오세요.
            <br />
            나라는 함께 고르면 됩니다
          </>
        }
        lead="아래 내용을 남겨 주시면 확인한 뒤 연락드립니다. 급하시면 전화가 가장 빠릅니다."
      />

      <Section className="bg-sand-50">
        <Suspense
          fallback={
            <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-card bg-sand-100" />
          }
        >
          <ReserveForm />
        </Suspense>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="grid gap-px overflow-hidden rounded-card border border-sand-200 bg-sand-200 sm:grid-cols-3">
            {GUIDE.map((g) => (
              <div key={g.title} className="bg-sand-50 p-6">
                <h3 className="font-serif text-base font-bold text-ink-900">{g.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.8] text-ink-700">{g.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-card bg-lake-900 px-6 py-6">
            <div>
              <p className="font-serif text-lg font-bold text-sand-50">전화로 문의하기</p>
              <p className="mt-1 text-sm text-lake-200">
                입실 {BRAND.checkIn} · 퇴실 {BRAND.checkOut}
              </p>
            </div>
            <a
              href={`tel:${BRAND.phone}`}
              className="rounded-full bg-spice-500 px-6 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-400"
            >
              {BRAND.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
