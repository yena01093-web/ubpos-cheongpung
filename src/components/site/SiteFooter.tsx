import Link from "next/link";
import { BRAND, CTA, NAV } from "@/content/site";
import { ROOMS } from "@/content/rooms";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-lake-900 text-sand-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-20">
        <svg viewBox="0 0 1200 100" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 70 L120 38 L220 66 L340 22 L470 62 L600 30 L740 64 L870 34 L1010 68 L1120 40 L1200 62 L1200 100 L0 100 Z"
            fill="#e5f1ee"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-bold text-sand-50">{BRAND.name}</p>
            <p className="mt-2 text-sm text-lake-300">{BRAND.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-lake-200/80">
              {BRAND.subTagline}
            </p>
            <Link
              href={CTA.href}
              className="mt-7 inline-flex rounded-full bg-spice-500 px-6 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-400"
            >
              {CTA.label} →
            </Link>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-lake-400">
              둘러보기
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-lake-200 hover:text-sand-50">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reserve" className="text-lake-200 hover:text-sand-50">
                  예약 문의
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-lake-400">
              안내
            </p>
            <dl className="mt-5 space-y-3 text-sm text-lake-200">
              <div>
                <dt className="text-lake-400">주소</dt>
                <dd>{BRAND.address}</dd>
              </div>
              <div>
                <dt className="text-lake-400">전화</dt>
                <dd>
                  <a href={`tel:${BRAND.phone}`} className="hover:text-sand-50">
                    {BRAND.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-lake-400">입실 / 퇴실</dt>
                <dd>
                  {BRAND.checkIn} / {BRAND.checkOut}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-lake-800 pt-8 text-[11px] tracking-[0.2em] text-lake-400">
          {ROOMS.map((r) => (
            <span key={r.id}>{r.countryEn}</span>
          ))}
        </div>

        <p className="mt-6 text-xs text-lake-500">
          © {new Date().getFullYear()} {BRAND.name}. 청풍호 앞에서.
        </p>
      </div>
    </footer>
  );
}
