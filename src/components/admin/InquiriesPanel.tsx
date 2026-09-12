"use client";

import { useCallback, useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminFetch";
import { formatKoreanDate } from "@/lib/inquiries";
import { INQUIRY_STATUS_LABEL, type Inquiry, type InquiryStatus } from "@/types";

const FILTERS: { key: InquiryStatus | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "new", label: "신규" },
  { key: "contacted", label: "연락함" },
  { key: "confirmed", label: "예약 확정" },
  { key: "cancelled", label: "취소" },
];

const STATUS_STYLE: Record<InquiryStatus, string> = {
  new: "bg-spice-200 text-spice-900",
  contacted: "bg-lake-100 text-lake-800",
  confirmed: "bg-lake-700 text-sand-50",
  cancelled: "bg-sand-200 text-ink-500",
};

export default function InquiriesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch("/api/admin/inquiries");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "목록을 불러오지 못했습니다.");
      setInquiries(data.inquiries as Inquiry[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function patch(id: string, body: Partial<Pick<Inquiry, "status" | "adminNote">>) {
    // 낙관적 갱신 — 실패하면 다시 불러와 되돌린다.
    setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, ...body } : q)));
    try {
      const res = await adminFetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("변경 사항을 저장하지 못했습니다.");
      void load();
    }
  }

  const shown = filter === "all" ? inquiries : inquiries.filter((q) => q.status === filter);
  const newCount = inquiries.filter((q) => q.status === "new").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.3em] text-spice-600">ADMIN</p>
          <h1 className="mt-2 font-serif text-2xl font-bold text-ink-900">예약 문의</h1>
          <p className="mt-1.5 text-sm text-ink-500">
            전체 {inquiries.length}건 · 신규 {newCount}건
          </p>
        </div>
        <button
          onClick={() => void load()}
          className="rounded-full border border-sand-300 px-5 py-2.5 text-sm font-bold text-ink-700 transition-colors hover:border-spice-400 hover:text-spice-600"
        >
          새로고침
        </button>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              filter === f.key
                ? "bg-ink-900 text-sand-50"
                : "border border-sand-300 text-ink-700 hover:border-spice-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-spice-200/60 px-4 py-3 text-sm text-spice-900">
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-8 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-card bg-sand-100" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-300">
          {filter === "all" ? "아직 접수된 문의가 없습니다." : "해당 상태의 문의가 없습니다."}
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {shown.map((q) => (
            <li
              key={q.id}
              className="rounded-card border border-sand-200 bg-sand-50 p-5 shadow-soft sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[q.status]}`}
                    >
                      {INQUIRY_STATUS_LABEL[q.status]}
                    </span>
                    <span className="text-[11px] text-ink-300">
                      {new Date(q.createdAt).toLocaleString("ko-KR")} 접수
                    </span>
                  </div>
                  <p className="mt-2.5 font-serif text-xl font-bold text-ink-900">
                    {q.name}{" "}
                    <a href={`tel:${q.phone}`} className="text-base font-normal text-spice-600">
                      {q.phone}
                    </a>
                  </p>
                </div>

                <select
                  value={q.status}
                  onChange={(e) => void patch(q.id, { status: e.target.value as InquiryStatus })}
                  className="rounded-xl border border-sand-300 bg-white px-3 py-2 text-sm outline-none focus:border-spice-500"
                  aria-label="상태 변경"
                >
                  {(Object.keys(INQUIRY_STATUS_LABEL) as InquiryStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {INQUIRY_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>

              <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-sand-200 pt-5 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] tracking-[0.16em] text-ink-300">객실</dt>
                  <dd className="mt-1 text-ink-900">{q.roomLabel}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.16em] text-ink-300">일정</dt>
                  <dd className="mt-1 text-ink-900">
                    {formatKoreanDate(q.checkIn)} → {formatKoreanDate(q.checkOut)} ({q.nights}박)
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.16em] text-ink-300">인원</dt>
                  <dd className="mt-1 text-ink-900">
                    성인 {q.adults}명{q.children > 0 ? ` · 아동 ${q.children}명` : ""}
                  </dd>
                </div>
              </dl>

              {q.message && (
                <p className="mt-4 rounded-xl bg-sand-100 px-4 py-3 text-sm leading-[1.8] text-ink-700">
                  {q.message}
                </p>
              )}

              <NoteField
                value={q.adminNote}
                onSave={(adminNote) => void patch(q.id, { adminNote })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NoteField({
  value,
  onSave,
}: {
  value: string;
  onSave: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const dirty = draft !== value;

  return (
    <div className="mt-4">
      <label className="text-[11px] tracking-[0.16em] text-ink-300">메모</label>
      <div className="mt-1.5 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="통화 내용, 확정 요금 등"
          className="w-full rounded-xl border border-sand-300 bg-white px-3 py-2 text-sm outline-none focus:border-spice-500"
        />
        <button
          type="button"
          disabled={!dirty}
          onClick={() => onSave(draft)}
          className="shrink-0 rounded-xl bg-ink-900 px-4 py-2 text-sm font-bold text-sand-50 transition-opacity disabled:opacity-30"
        >
          저장
        </button>
      </div>
    </div>
  );
}
