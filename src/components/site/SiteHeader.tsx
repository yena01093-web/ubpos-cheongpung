"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, CTA, NAV } from "@/content/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-sand-200 bg-sand-50/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[13px] font-bold transition-colors ${
              solid
                ? "border-lake-700 text-lake-800"
                : "border-sand-100/70 text-sand-50"
            }`}
            aria-hidden
          >
            淸
          </span>
          <span className="leading-tight">
            <span
              className={`block font-serif text-[15px] font-bold tracking-tight transition-colors sm:text-base ${
                solid ? "text-ink-900" : "text-sand-50"
              }`}
            >
              {BRAND.nameShort}
            </span>
            <span
              className={`block text-[10px] tracking-[0.22em] transition-colors ${
                solid ? "text-ink-300" : "text-sand-100/70"
              }`}
            >
              CHEONGPUNG STAY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  solid
                    ? active
                      ? "text-spice-600"
                      : "text-ink-700 hover:text-spice-600"
                    : active
                      ? "text-saffron"
                      : "text-sand-100/85 hover:text-sand-50"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-current" />
                )}
              </Link>
            );
          })}
          <Link
            href={CTA.href}
            className="ml-2 rounded-full bg-spice-600 px-5 py-2.5 text-sm font-bold text-sand-50 shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-spice-700"
          >
            {CTA.label}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="메뉴 열기"
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors md:hidden ${
            solid ? "border-sand-300 text-ink-900" : "border-sand-100/50 text-sand-50"
          }`}
        >
          <span className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-sand-200 bg-sand-50 px-4 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-sand-200/70 py-3.5 font-serif text-lg text-ink-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={CTA.href}
              className="mt-4 rounded-full bg-spice-600 px-5 py-3 text-center font-bold text-sand-50"
            >
              {CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
