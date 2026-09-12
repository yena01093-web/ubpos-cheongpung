import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-32 text-center">
      <span className="stamp px-4 py-2 text-[11px] font-bold text-spice-600">
        NO ENTRY
      </span>
      <h1 className="mt-8 font-serif text-3xl font-bold text-ink-900">
        이 나라로는 아직 길이 없습니다
      </h1>
      <p className="mt-4 max-w-sm text-[15px] leading-[1.85] text-ink-700">
        찾으시는 페이지를 찾지 못했습니다. 일곱 개의 방으로 돌아가시겠어요?
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-600"
        >
          홈으로
        </Link>
        <Link
          href="/stay"
          className="rounded-full border border-sand-300 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:border-spice-400 hover:text-spice-600"
        >
          객실 보기
        </Link>
      </div>
    </div>
  );
}
