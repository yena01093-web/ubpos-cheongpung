import { NextRequest, NextResponse } from "next/server";
import { COLLECTIONS, adminDb } from "@/lib/firebase/admin";
import { nightsBetween, roomLabelOf, validateInquiry } from "@/lib/inquiries";
import type { Inquiry } from "@/types";

export const dynamic = "force-dynamic";

/** 손님이 남기는 예약 문의 접수. 인증 없이 열려 있는 엔드포인트입니다. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 봇 미끼 필드가 채워져 있으면 조용히 성공 처리하고 저장하지 않는다.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const check = validateInquiry(body);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: 400 });
  }

  const input = check.value;
  const now = new Date().toISOString();

  const doc: Omit<Inquiry, "id"> = {
    ...input,
    roomLabel: roomLabelOf(input.roomId),
    nights: nightsBetween(input.checkIn, input.checkOut),
    status: "new",
    adminNote: "",
    createdAt: now,
    updatedAt: now,
  };

  try {
    const ref = await adminDb().collection(COLLECTIONS.inquiries).add(doc);
    return NextResponse.json({ ok: true, id: ref.id }, { status: 201 });
  } catch (err) {
    console.error("[inquiries] 저장 실패", err);
    return NextResponse.json(
      { error: "문의 접수 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나 전화 주세요." },
      { status: 500 }
    );
  }
}
