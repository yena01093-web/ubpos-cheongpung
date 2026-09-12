/**
 * 사이트 전역 정보.
 *
 * ⚠️ 여기 값들은 임시 초안입니다. 실제 상호 / 주소 / 연락처가 정해지면
 *    이 파일만 고치면 전체 사이트에 반영됩니다.
 */

export const BRAND = {
  /** 실제 상호로 교체하세요 */
  name: "청풍 세계여행 민박",
  nameShort: "청풍 세계여행",
  tagline: "청풍호로 떠나는 세계여행",
  subTagline: "방 문을 열면 다른 나라, 창을 열면 내륙의 바다",
  /** 실제 정보로 교체하세요 */
  address: "충북 제천시 청풍면 (상세 주소 준비 중)",
  phone: "010-0000-0000",
  email: "",
  kakaoUrl: "",
  instagramUrl: "",
  checkIn: "15:00",
  checkOut: "11:00",
} as const;

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/stay", label: "민박 소개" },
  { href: "/travel", label: "청풍 여행" },
  { href: "/story", label: "우리의 이야기" },
] as const;

export const CTA = { href: "/reserve", label: "예약 문의" } as const;
