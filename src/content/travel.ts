/**
 * 청풍 여행 정보.
 *
 * ⚠️ 관광지 소요시간은 대략적인 값입니다. 운영시간·요금은 계절/사정에 따라 자주 바뀌므로
 *    사이트에는 적지 않고 "방문 전 확인" 안내만 두었습니다. 확정 정보가 있으면 note에 넣으세요.
 */

export type Spot = {
  id: string;
  name: string;
  category: "전망" | "문화" | "물길" | "산책" | "체험";
  /** 민박에서의 대략적 이동 시간 */
  distance: string;
  summary: string;
  detail: string;
  tip?: string;
  photos: string[];
};

export const SPOTS: Spot[] = [
  {
    id: "cablecar",
    name: "청풍호반 케이블카",
    category: "전망",
    distance: "차로 약 5분",
    summary: "비봉산 정상까지 올라 청풍호를 한눈에 내려다보는 길",
    detail:
      "청풍호 물길이 산 사이를 파고든 모양이 정상에서야 비로소 한 장면으로 보입니다. 올라가는 동안 발밑으로 물빛이 계속 바뀌어서, 도착하기 전부터 이미 전망이 시작됩니다.",
    tip: "해 지기 한 시간 전이 가장 좋습니다. 정상은 아래보다 바람이 셉니다.",
    photos: [],
  },
  {
    id: "heritage",
    name: "청풍문화재단지",
    category: "문화",
    distance: "차로 약 5분",
    summary: "물에 잠긴 마을에서 건져 올린 집과 비석들",
    detail:
      "충주댐으로 청풍 일대가 물에 잠길 때, 그곳에 있던 관아와 민가·비석을 이곳으로 옮겨 다시 세웠습니다. 건물 하나하나가 원래 서 있던 자리를 잃고 여기 모인 것이라, 걷다 보면 풍경보다 사연이 먼저 읽힙니다.",
    tip: "언덕 위 한벽루에서 내려다보는 호수 방향 전망을 놓치지 마세요.",
    photos: [],
  },
  {
    id: "cruise",
    name: "청풍호 유람선",
    category: "물길",
    distance: "차로 약 5분",
    summary: "물 위에서 올려다보는 기암절벽",
    detail:
      "육지에서 보는 청풍호와 배 위에서 보는 청풍호는 완전히 다릅니다. 물 높이에서 올려다볼 때 옥순봉과 구담봉의 높이가 제대로 느껴집니다.",
    tip: "운항은 수위와 날씨에 따라 조정됩니다. 출발 전 운항 여부를 꼭 확인하세요.",
    photos: [],
  },
  {
    id: "oksunbridge",
    name: "옥순봉 출렁다리",
    category: "체험",
    distance: "차로 약 15분",
    summary: "호수 위를 가로질러 걷는 흔들다리",
    detail:
      "물 위에 그대로 놓인 다리라 걸을 때마다 발밑에서 호수가 움직입니다. 다리 건너편 산책로까지 이어 걸으면 옥순봉을 가까이서 보게 됩니다.",
    photos: [],
  },
  {
    id: "jadarak",
    name: "청풍호 자드락길",
    category: "산책",
    distance: "코스별로 다름",
    summary: "호숫가를 따라 이어지는 낮은 둘레길",
    detail:
      "여러 코스로 나뉘어 있어 체력과 시간에 맞춰 고르면 됩니다. 물가를 따라 걷다가 능선으로 올라섰다가 다시 내려오는 구간이 반복돼, 같은 호수를 여러 높이에서 보게 됩니다.",
    tip: "가볍게 걷고 싶다면 짧은 코스 하나만. 등산화까지는 필요 없지만 운동화는 필수입니다.",
    photos: [],
  },
  {
    id: "neunggang",
    name: "능강계곡 · 정방사",
    category: "산책",
    distance: "차로 약 15분",
    summary: "여름에 가장 시원한 골짜기, 그리고 절벽에 붙은 절",
    detail:
      "계곡을 따라 올라가면 바위 절벽에 기대어 앉은 정방사가 나옵니다. 마당 끝에서 보는 청풍호 전망이 이 근방에서 손꼽히게 좋습니다.",
    tip: "올라가는 길이 좁습니다. 차량 교행이 어려운 구간이 있으니 천천히.",
    photos: [],
  },
  {
    id: "skywalk",
    name: "만천하 스카이워크",
    category: "전망",
    distance: "차로 약 30분",
    summary: "남한강을 발밑에 두고 서는 유리 전망대",
    detail:
      "청풍 바깥으로 조금 나가지만, 반나절 코스로 묶기 좋습니다. 전망대 아래로 흐르는 강 줄기가 청풍호와는 또 다른 물의 얼굴을 보여줍니다.",
    photos: [],
  },
];

/** 맛집 — 아직 뼈대. 실제로 다녀와 보고 한 곳씩 채워 나가는 자리입니다. */
export type Eatery = {
  id: string;
  name: string;
  genre: string;
  distance: string;
  note: string;
  address?: string;
  phone?: string;
  url?: string;
  /** false면 "준비 중" 카드로 표시됩니다 */
  ready: boolean;
};

export const EATERIES: Eatery[] = [
  {
    id: "yakchaerak",
    name: "약채락 성현",
    genre: "한식 · 약채 정식",
    distance: "차로 약 5분",
    note: "청풍면에 있는 건강 한식집. 코스로 나오는 약채 한 상이라 하루쯤 잘 먹고 싶은 날에 좋습니다.",
    address: "충북 제천시 청풍면 청풍호로54길 14-7",
    phone: "043-647-8892",
    url: "https://ubpos-restaurant.vercel.app",
    ready: true,
  },
  { id: "slot-2", name: "", genre: "", distance: "", note: "", ready: false },
  { id: "slot-3", name: "", genre: "", distance: "", note: "", ready: false },
  { id: "slot-4", name: "", genre: "", distance: "", note: "", ready: false },
];

/** 함께하는 숙소 — 입점 자리. 아직 비어 있습니다. */
export type Partner = {
  id: string;
  name: string;
  type: string;
  keyword: string;
  note: string;
  url?: string;
  ready: boolean;
};

export const PARTNERS: Partner[] = [
  { id: "p-1", name: "", type: "", keyword: "", note: "", ready: false },
  { id: "p-2", name: "", type: "", keyword: "", note: "", ready: false },
  { id: "p-3", name: "", type: "", keyword: "", note: "", ready: false },
];
