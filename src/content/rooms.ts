/**
 * 7개 객실 — 방마다 다른 나라.
 *
 * ⚠️ 아래 설명 문구는 초안입니다. 실제 방 구성/정원/침구가 확정되면 이 파일만 고치면 됩니다.
 *    사진은 `photos` 배열에 경로를 넣으면 자동으로 사진 슬롯 자리에 들어갑니다.
 *    (아메리카 / 멕시코 / 케냐 3개는 주신 테마, 나머지 4개는 제안이니 자유롭게 바꾸세요.)
 */

export type Motif =
  | "route"
  | "papel"
  | "savanna"
  | "zellige"
  | "aegean"
  | "jaali"
  | "lantern";

export type Room = {
  id: string;
  country: string;
  countryEn: string;
  emoji: string;
  /** 방 이름 — 객실 문패에 붙는 이름 */
  roomName: string;
  /** 한 줄 컨셉 */
  concept: string;
  /** 2~3문장 소개 */
  description: string;
  /** 이 방에서의 하루 — 감각적인 한 문장 */
  moment: string;
  capacity: { standard: number; max: number };
  bed: string;
  features: string[];
  /** 여권 스탬프에 찍히는 문구 */
  stamp: string;
  motif: Motif;
  colors: { from: string; to: string; accent: string; ink: string };
  /** 사진이 준비되면 public/ 아래 경로를 넣으세요. 비어 있으면 사진 자리 표시가 나옵니다. */
  photos: string[];
};

export const ROOMS: Room[] = [
  {
    id: "america",
    country: "아메리카",
    countryEn: "AMERICA",
    emoji: "🛻",
    roomName: "루트 66",
    concept: "끝없이 뻗은 길 위에서 하룻밤",
    description:
      "빈티지 사인과 데님 블루, 낡은 가죽의 질감으로 채운 아메리칸 로드트립 방입니다. 창밖으로는 고속도로 대신 청풍호가 길게 뻗어 있습니다. 짐을 풀기보다 잠깐 차를 세워둔 느낌으로 머무는 방.",
    moment: "아침에 진하게 내린 커피 한 잔, 창가에 걸터앉아 호수 위로 번지는 빛을 보는 시간.",
    capacity: { standard: 2, max: 4 },
    bed: "퀸 침대 1 + 소파베드",
    features: ["호수 전망", "빈티지 사인 조명", "원목 테이블", "레코드 플레이어"],
    stamp: "ROUTE 66",
    motif: "route",
    colors: { from: "#1f3a52", to: "#2f5a78", accent: "#d9762f", ink: "#f4efe6" },
    photos: [],
  },
  {
    id: "mexico",
    country: "멕시코",
    countryEn: "MEXICO",
    emoji: "🌵",
    roomName: "탈라베라",
    concept: "축제의 색을 그대로 들여놓은 방",
    description:
      "마리골드 옐로와 코발트 블루, 손으로 그린 듯한 타일 패턴이 벽을 채웁니다. 천장에는 종이 장식(파펠 피카도)이 걸려 있어 창문을 열면 바람에 살랑입니다. 가장 밝고, 가장 소란스럽게 즐거운 방.",
    moment: "해 질 무렵 창을 활짝 열고, 종이 장식이 흔들리는 소리를 배경으로 맥주 한 캔.",
    capacity: { standard: 2, max: 3 },
    bed: "더블 침대 1",
    features: ["패턴 타일 벽", "파펠 피카도 장식", "야외 의자", "간이 주방"],
    stamp: "¡HOLA!",
    motif: "papel",
    colors: { from: "#0f6f78", to: "#1f9aa0", accent: "#e8a32b", ink: "#fff7e8" },
    photos: [],
  },
  {
    id: "kenya",
    country: "케냐",
    countryEn: "KENYA",
    emoji: "🦒",
    roomName: "사바나",
    concept: "해가 크게 지는 초원의 방",
    description:
      "흙빛 벽과 라탄, 거친 직조 패브릭으로 사바나의 질감을 옮겨왔습니다. 붉은 마사이 체크가 포인트로 들어가고, 조명은 모닥불처럼 낮고 따뜻하게 깔립니다. 조용히 오래 머물고 싶은 사람에게 어울리는 방.",
    moment: "해가 산 뒤로 내려앉을 때, 불 꺼진 방에서 호수가 붉어지는 걸 끝까지 지켜보는 저녁.",
    capacity: { standard: 2, max: 4 },
    bed: "퀸 침대 1 + 바닥 요",
    features: ["선셋 전망", "라탄 가구", "마사이 체크 패브릭", "간접 조명"],
    stamp: "JAMBO",
    motif: "savanna",
    colors: { from: "#6b3a1c", to: "#a05a2a", accent: "#e05c3c", ink: "#fdf0df" },
    photos: [],
  },
  {
    id: "morocco",
    country: "모로코",
    countryEn: "MOROCCO",
    emoji: "🕌",
    roomName: "리야드",
    concept: "미로 같은 골목 끝, 조용한 안뜰",
    description:
      "제리주 타일의 기하 패턴과 아치형 실루엣, 놋쇠 램프가 만드는 무늬 그림자로 채운 방입니다. 낮에는 서늘하고 밤에는 램프 불빛이 벽에 별을 흩뿌립니다. 문을 닫으면 바깥과 완전히 분리되는 은신처 같은 공간.",
    moment: "민트티를 우리고, 램프가 천장에 만든 무늬를 한참 올려다보는 밤.",
    capacity: { standard: 2, max: 3 },
    bed: "더블 침대 1 + 좌식 소파",
    features: ["기하 패턴 타일", "놋쇠 램프", "아치 장식", "좌식 티테이블"],
    stamp: "MARHABA",
    motif: "zellige",
    colors: { from: "#123f5c", to: "#1d6a7a", accent: "#d9903a", ink: "#f2efe4" },
    photos: [],
  },
  {
    id: "greece",
    country: "그리스",
    countryEn: "GREECE",
    emoji: "⛵",
    roomName: "에게",
    concept: "내륙의 바다와 가장 잘 어울리는 방",
    description:
      "회벽처럼 매끈한 흰 벽에 코발트 블루 문과 창틀. 군더더기 없이 비워낸 구성이라 창밖 청풍호가 그대로 방의 그림이 됩니다. 일곱 개 방 중 가장 단순하고, 가장 물빛에 가까운 방.",
    moment: "창틀에 팔을 걸치고, 물빛이 흰 벽에 반사돼 천천히 움직이는 걸 보는 오후.",
    capacity: { standard: 2, max: 4 },
    bed: "싱글 침대 2 (합침 가능)",
    features: ["파노라마 호수 전망", "화이트 톤 인테리어", "블루 셔터", "작은 발코니"],
    stamp: "KALIMERA",
    motif: "aegean",
    colors: { from: "#12518f", to: "#2f7fc4", accent: "#f2f6fa", ink: "#f7fbff" },
    photos: [],
  },
  {
    id: "india",
    country: "인도",
    countryEn: "INDIA",
    emoji: "🪷",
    roomName: "라자스탄",
    concept: "향신료의 색으로 물든 방",
    description:
      "메리골드 오렌지와 자홍빛, 금색 자수가 겹겹이 쌓인 방입니다. 창살(자알리) 패턴의 가림막이 빛을 잘게 나눠 바닥에 무늬를 그립니다. 색이 가장 많고, 그래서 오래 봐도 새로운 방.",
    moment: "창살 사이로 들어온 햇빛 무늬가 하루 종일 바닥을 건너가는 걸 눈으로 따라가는 날.",
    capacity: { standard: 2, max: 4 },
    bed: "퀸 침대 1 + 바닥 요",
    features: ["자알리 창살 가림막", "자수 패브릭", "좌식 공간", "향 피우는 자리"],
    stamp: "NAMASTE",
    motif: "jaali",
    colors: { from: "#8c2f4a", to: "#c0472f", accent: "#e8b53c", ink: "#fdf1e0" },
    photos: [],
  },
  {
    id: "vietnam",
    country: "베트남",
    countryEn: "VIETNAM",
    emoji: "🏮",
    roomName: "호이안",
    concept: "등불이 물 위에 뜨는 방",
    description:
      "노란 벽과 비취색 창틀, 천장에 낮게 매달린 비단 등불로 호이안의 밤을 옮겨왔습니다. 불을 하나씩 끄면 등불만 남아 방이 강물 위처럼 흔들립니다. 밤이 가장 예쁜 방.",
    moment: "불을 다 끄고 등불만 켠 채, 창밖 호수와 방 안 등불이 같은 색이 되는 순간.",
    capacity: { standard: 2, max: 3 },
    bed: "더블 침대 1",
    features: ["비단 등불", "비취색 창틀", "라탄 체어", "야경 전망"],
    stamp: "XIN CHÀO",
    motif: "lantern",
    colors: { from: "#8a5a12", to: "#c9922a", accent: "#d94f3d", ink: "#fff6e2" },
    photos: [],
  },
];

export const ROOM_COUNT = ROOMS.length;

export function getRoom(id: string): Room | undefined {
  return ROOMS.find((r) => r.id === id);
}
