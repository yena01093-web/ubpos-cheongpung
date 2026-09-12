import type { Metadata } from "next";
import { Gowun_Batang, Gowun_Dodum } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/content/site";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const batang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-batang",
});

const dodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dodum",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.nameShort}`,
  },
  description:
    "충북 제천 청풍호, 방마다 다른 나라를 담은 일곱 개의 방. 숙소가 목적지가 되는 경험형 민박과 청풍 여행 정보를 한곳에.",
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: "방 문을 열면 다른 나라, 창을 열면 내륙의 바다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${batang.variable} ${dodum.variable}`}>
      <body className="min-h-screen bg-sand-50 text-ink-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
