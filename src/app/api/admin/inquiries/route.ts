import { NextRequest, NextResponse } from "next/server";
import { COLLECTIONS, adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth";
import type { Inquiry } from "@/types";

export const dynamic = "force-dynamic";

/** 접수된 문의 목록 (최신순). 관리자 전용. */
export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });

  try {
    const snap = await adminDb()
      .collection(COLLECTIONS.inquiries)
      .orderBy("createdAt", "desc")
      .limit(300)
      .get();

    const inquiries: Inquiry[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Inquiry, "id">),
    }));

    return NextResponse.json({ inquiries });
  } catch (err) {
    console.error("[admin/inquiries] 조회 실패", err);
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }
}
