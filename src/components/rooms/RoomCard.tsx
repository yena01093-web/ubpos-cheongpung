import Link from "next/link";
import Motif from "@/components/site/Motif";
import type { Room } from "@/content/rooms";

/** 여권 페이지처럼 생긴 객실 요약 카드. */
export default function RoomCard({ room, href }: { room: Room; href?: string }) {
  const inner = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-sand-50 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* 나라 색 밴드 + 패턴 */}
      <div
        className="relative h-32 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${room.colors.from}, ${room.colors.to})`,
        }}
      >
        <Motif
          kind={room.motif}
          id={`card-${room.id}`}
          color={room.colors.ink}
          className="absolute inset-0 h-full w-full"
          opacity={0.32}
        />
        <div className="absolute inset-0 flex items-start justify-between p-4">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ color: room.colors.ink }}
          >
            {room.countryEn}
          </span>
          <span className="text-2xl leading-none" aria-hidden>
            {room.emoji}
          </span>
        </div>
        <span
          className="stamp absolute bottom-3 right-4 px-2.5 py-1 text-[9px] font-bold"
          style={{ color: room.colors.accent }}
        >
          {room.stamp}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold tracking-[0.2em] text-spice-600">
          {room.country}
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-bold text-ink-900">
          {room.roomName}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">{room.concept}</p>

        <div className="mt-auto flex items-center gap-3 pt-5 text-[11px] text-ink-300">
          <span>
            기준 {room.capacity.standard}인 / 최대 {room.capacity.max}인
          </span>
          <span className="h-3 w-px bg-sand-300" />
          <span>{room.bed}</span>
        </div>
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
