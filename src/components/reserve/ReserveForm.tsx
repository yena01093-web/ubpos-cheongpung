"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ROOMS, getRoom } from "@/content/rooms";
import { BRAND } from "@/content/site";
import {
  UNDECIDED_ROOM,
  addDays,
  formatKoreanDate,
  nightsBetween,
  todayISO,
  validateInquiry,
} from "@/lib/inquiries";

type Status = "idle" | "sending" | "done";

export default function ReserveForm() {
  const params = useSearchParams();
  const initialRoom = params.get("room");
  const today = todayISO();

  const [roomId, setRoomId] = useState(
    initialRoom && ROOMS.some((r) => r.id === initialRoom) ? initialRoom : UNDECIDED_ROOM
  );
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  /** 봇 잡는 미끼 필드 — 사람 눈에는 보이지 않습니다 */
  const [trap, setTrap] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const nights = nightsBetween(checkIn, checkOut);
  const room = getRoom(roomId);
  const guests = adults + children;
  const overCapacity = !!room && guests > room.capacity.max;

  const summary = useMemo(
    () => ({
      roomLabel: room ? `${room.country} · ${room.roomName}` : "상담 후 결정",
      stamp: room?.stamp ?? "CHEONGPUNG",
      countryEn: room?.countryEn ?? "ANYWHERE",
    }),
    [room]
  );

  function onCheckInChange(value: string) {
    setCheckIn(value);
    if (value && (!checkOut || nightsBetween(value, checkOut) < 1)) {
      setCheckOut(addDays(value, 1));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("개인정보 수집·이용에 동의해 주세요.");
      return;
    }

    const payload = { roomId, checkIn, checkOut, adults, children, name, phone, message };
    const check = validateInquiry(payload);
    if (!check.ok) {
      setError(check.error);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: trap }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "문의 접수에 실패했습니다.");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error ? err.message : "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-sand-200 bg-sand-50 p-8 text-center shadow-soft sm:p-12">
        <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-lake-100 text-3xl">
          ✈
        </span>
        <h2 className="mt-6 font-serif text-2xl font-bold text-ink-900">
          문의가 접수되었습니다
        </h2>
        <p className="mt-4 text-[15px] leading-[1.9] text-ink-700">
          확인한 뒤 남겨 주신 번호로 연락드리겠습니다.
          <br />
          급하시면 <a href={`tel:${BRAND.phone}`} className="font-bold text-spice-600">
            {BRAND.phone}
          </a>
          로 전화 주셔도 됩니다.
        </p>

        <dl className="mt-8 space-y-3 rounded-2xl bg-sand-100 p-6 text-left text-sm">
          <Row label="객실" value={summary.roomLabel} />
          <Row
            label="일정"
            value={`${formatKoreanDate(checkIn)} → ${formatKoreanDate(checkOut)} (${nights}박)`}
          />
          <Row
            label="인원"
            value={`성인 ${adults}명${children > 0 ? ` · 아동 ${children}명` : ""}`}
          />
          <Row label="연락처" value={`${name} · ${phone}`} />
        </dl>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-sand-300 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:border-spice-400 hover:text-spice-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
      {/* 탑승권 머리 */}
      <div className="overflow-hidden rounded-card border border-sand-200 bg-sand-50 shadow-soft">
        <div className="flex items-center justify-between gap-4 bg-lake-900 px-6 py-5 sm:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-lake-400">
              Boarding Pass
            </p>
            <p className="mt-1.5 font-serif text-xl font-bold text-sand-50">
              {BRAND.nameShort} → {summary.countryEn}
            </p>
          </div>
          <span className="stamp shrink-0 px-3 py-1.5 text-[10px] font-bold text-spice-300">
            {summary.stamp}
          </span>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          {/* 객실 */}
          <FieldGroup
            label="어느 나라로 가시겠어요?"
            hint="정하지 못했다면 상담 후 결정을 선택해 주세요."
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <RoomOption
                selected={roomId === UNDECIDED_ROOM}
                onSelect={() => setRoomId(UNDECIDED_ROOM)}
                emoji="🧭"
                title="상담 후 결정"
                sub="날짜에 맞춰 가능한 방을 안내"
              />
              {ROOMS.map((r) => (
                <RoomOption
                  key={r.id}
                  selected={roomId === r.id}
                  onSelect={() => setRoomId(r.id)}
                  emoji={r.emoji}
                  title={`${r.country} · ${r.roomName}`}
                  sub={`기준 ${r.capacity.standard}인 / 최대 ${r.capacity.max}인`}
                />
              ))}
            </div>
          </FieldGroup>

          {/* 날짜 */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="체크인">
              <input
                type="date"
                required
                min={today}
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="체크아웃">
              <input
                type="date"
                required
                min={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          {nights > 0 && (
            <p className="-mt-2 text-sm text-lake-700">
              {formatKoreanDate(checkIn)} → {formatKoreanDate(checkOut)} ·{" "}
              <strong className="font-bold">{nights}박</strong>
            </p>
          )}

          {/* 인원 */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldGroup label="성인">
              <Counter value={adults} min={1} max={20} onChange={setAdults} label="성인" />
            </FieldGroup>
            <FieldGroup label="아동">
              <Counter value={children} min={0} max={20} onChange={setChildren} label="아동" />
            </FieldGroup>
          </div>

          {overCapacity && room && (
            <p className="-mt-2 rounded-xl bg-spice-200/50 px-4 py-3 text-sm leading-relaxed text-spice-900">
              {room.country} 방은 최대 {room.capacity.max}명까지 묵을 수 있어요. 인원이
              많다면 <b>상담 후 결정</b>으로 두고 문의해 주시면 방을 나눠 안내해
              드리겠습니다.
            </p>
          )}
        </div>

        {/* 절취선 */}
        <div className="relative px-6 sm:px-8">
          <div className="perforation h-1.5 w-full text-sand-300" />
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="성함">
              <input
                type="text"
                required
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className={inputClass}
              />
            </Field>
            <Field label="연락처">
              <input
                type="tel"
                required
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="남기실 말씀" hint="도착 예정 시간, 일행 구성, 궁금한 점 무엇이든.">
            <textarea
              rows={4}
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="저녁 늦게 도착할 것 같아요. 주차 가능한가요?"
              className={`${inputClass} resize-y`}
            />
          </Field>

          {/* 봇 미끼 — 화면에 보이지 않습니다 */}
          <div aria-hidden className="hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-700">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-spice-600"
            />
            <span>
              예약 상담을 위해 성함·연락처·일정 정보를 수집하는 데 동의합니다. 수집한
              정보는 상담 목적으로만 쓰이며, 상담이 끝나면 파기합니다.
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-spice-200/60 px-4 py-3 text-sm text-spice-900">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-spice-600 px-7 py-4 text-sm font-bold text-sand-50 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-spice-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "sending" ? "접수 중…" : "예약 문의 보내기"}
          </button>

          <p className="text-center text-xs leading-relaxed text-ink-300">
            지금은 문의 접수로 예약을 받고 있습니다. 접수 후 연락드려 최종 확정합니다.
            <br />
            온라인 결제는 준비 중입니다.
          </p>
        </div>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-spice-500 focus:ring-2 focus:ring-spice-500/20";

/** 입력 하나를 감싸는 필드. label로 감싸므로 라벨을 눌러도 입력에 포커스가 갑니다. */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-bold tracking-[0.14em] text-ink-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block text-xs text-ink-300">{hint}</span>}
    </label>
  );
}

/**
 * 버튼 여러 개처럼 복합 컨트롤을 담는 필드.
 * label로 감싸면 라벨 클릭이 첫 번째 버튼으로 전달되므로 여기서는 div + 그룹 라벨을 씁니다.
 */
function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={label}>
      <span className="mb-2 block text-[12px] font-bold tracking-[0.14em] text-ink-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block text-xs text-ink-300">{hint}</span>}
    </div>
  );
}

function RoomOption({
  selected,
  onSelect,
  emoji,
  title,
  sub,
}: {
  selected: boolean;
  onSelect: () => void;
  emoji: string;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
        selected
          ? "border-spice-500 bg-spice-200/35"
          : "border-sand-300 bg-white hover:border-sand-400"
      }`}
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-ink-900">{title}</span>
        <span className="block truncate text-[11px] text-ink-300">{sub}</span>
      </span>
    </button>
  );
}

function Counter({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div className="flex items-center justify-between rounded-xl border border-sand-300 bg-white px-3 py-2">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label={`${label} 줄이기`}
        className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 text-lg text-ink-700 transition-colors hover:border-spice-400 hover:text-spice-600 disabled:opacity-35 disabled:hover:border-sand-300 disabled:hover:text-ink-700"
      >
        −
      </button>
      <span className="font-serif text-lg font-bold text-ink-900">{value}명</span>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label={`${label} 늘리기`}
        className="grid h-9 w-9 place-items-center rounded-full border border-sand-300 text-lg text-ink-700 transition-colors hover:border-spice-400 hover:text-spice-600 disabled:opacity-35"
      >
        +
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-[11px] tracking-[0.16em] text-ink-300">{label}</dt>
      <dd className="text-right text-ink-900">{value}</dd>
    </div>
  );
}
