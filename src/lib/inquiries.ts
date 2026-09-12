import { getRoom, ROOMS } from "@/content/rooms";
import type { InquiryInput } from "@/types";

export const UNDECIDED_ROOM = "undecided";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

export function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** 두 날짜 사이 숙박 일수. 잘못된 입력이면 0. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) return 0;
  const a = new Date(`${checkIn}T00:00:00`).getTime();
  const b = new Date(`${checkOut}T00:00:00`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  const diff = Math.round((b - a) / 86_400_000);
  return diff > 0 ? diff : 0;
}

export function roomLabelOf(roomId: string): string {
  if (roomId === UNDECIDED_ROOM) return "상담 후 결정";
  const room = getRoom(roomId);
  return room ? `${room.country} · ${room.roomName}` : "알 수 없는 객실";
}

export function formatKoreanDate(iso: string): string {
  if (!DATE_RE.test(iso)) return iso;
  const [y, m, d] = iso.split("-");
  const day = ["일", "월", "화", "수", "목", "금", "토"][
    new Date(`${iso}T00:00:00`).getDay()
  ];
  return `${y}. ${Number(m)}. ${Number(d)} (${day})`;
}

export type ValidationResult =
  | { ok: true; value: InquiryInput }
  | { ok: false; error: string };

/** 클라이언트와 API 라우트가 같이 쓰는 검증. 서버에서 한 번 더 돌립니다. */
export function validateInquiry(raw: Partial<InquiryInput>): ValidationResult {
  const roomId = String(raw.roomId ?? "").trim();
  const validRoom = roomId === UNDECIDED_ROOM || ROOMS.some((r) => r.id === roomId);
  if (!validRoom) return { ok: false, error: "객실을 선택해 주세요." };

  const checkIn = String(raw.checkIn ?? "").trim();
  const checkOut = String(raw.checkOut ?? "").trim();
  if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
    return { ok: false, error: "체크인·체크아웃 날짜를 선택해 주세요." };
  }
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1) return { ok: false, error: "체크아웃은 체크인 다음 날부터 가능합니다." };
  if (nights > 30) return { ok: false, error: "30박을 넘는 문의는 전화로 상담해 주세요." };

  const adults = Number(raw.adults ?? 0);
  const children = Number(raw.children ?? 0);
  if (!Number.isInteger(adults) || adults < 1 || adults > 20) {
    return { ok: false, error: "성인 인원을 확인해 주세요." };
  }
  if (!Number.isInteger(children) || children < 0 || children > 20) {
    return { ok: false, error: "아동 인원을 확인해 주세요." };
  }

  const room = getRoom(roomId);
  if (room && adults + children > room.capacity.max) {
    return {
      ok: false,
      error: `${room.country} 방은 최대 ${room.capacity.max}명까지 묵을 수 있어요. 인원이 많다면 객실을 "상담 후 결정"으로 두고 문의해 주세요.`,
    };
  }

  const name = String(raw.name ?? "").trim();
  if (name.length < 1 || name.length > 30) {
    return { ok: false, error: "성함을 입력해 주세요." };
  }

  const phone = String(raw.phone ?? "").trim();
  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: "연락처를 정확히 입력해 주세요. (예: 010-1234-5678)" };
  }

  const message = String(raw.message ?? "").trim();
  if (message.length > 1000) {
    return { ok: false, error: "남기실 말씀은 1000자 이내로 부탁드립니다." };
  }

  return {
    ok: true,
    value: { roomId, checkIn, checkOut, adults, children, name, phone, message },
  };
}
