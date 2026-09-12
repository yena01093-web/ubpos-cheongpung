import { NextRequest, NextResponse } from "next/server";
import { COLLECTIONS, adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth";
import { INQUIRY_STATUS_LABEL, type InquiryStatus } from "@/types";

export const dynamic = "force-dynamic";

const STATUSES = Object.keys(INQUIRY_STATUS_LABEL) as InquiryStatus[];

/** 문의 상태 변경 / 사장님 메모 저장. 관리자 전용. */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });

  let body: { status?: string; adminNote?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const patch: Record<string, string> = { updatedAt: new Date().toISOString() };

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status as InquiryStatus)) {
      return NextResponse.json({ error: "알 수 없는 상태값입니다." }, { status: 400 });
    }
    patch.status = body.status;
  }

  if (body.adminNote !== undefined) {
    patch.adminNote = String(body.adminNote).slice(0, 2000);
  }

  if (Object.keys(patch).length === 1) {
    return NextResponse.json({ error: "변경할 내용이 없습니다." }, { status: 400 });
  }

  try {
    await adminDb().collection(COLLECTIONS.inquiries).doc(params.id).update(patch);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/inquiries] 수정 실패", err);
    return NextResponse.json({ error: "수정하지 못했습니다." }, { status: 500 });
  }
}

/** 문의 삭제. 관리자 전용. */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });

  try {
    await adminDb().collection(COLLECTIONS.inquiries).doc(params.id).delete();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/inquiries] 삭제 실패", err);
    return NextResponse.json({ error: "삭제하지 못했습니다." }, { status: 500 });
  }
}
