# ubpos-cheongpung — 청풍호로 떠나는 세계여행

충북 제천 청풍호 앞, 방마다 다른 나라를 테마로 한 민박 + 청풍 여행 정보 플랫폼.

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Firebase(Firestore + Auth).

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
```

`.env.local`이 필요합니다. `.env.example`을 복사해서 채우세요.

## 페이지

| 경로       | 내용                                                        |
| ---------- | ----------------------------------------------------------- |
| `/`        | 메인 — 청풍호 이야기, "숙소가 목적지가 되는" 컨셉, 객실 미리보기 |
| `/stay`    | 민박 소개 — 7개 객실 상세 (나라별 테마)                      |
| `/reserve` | 예약 문의 — 날짜·인원·객실 선택 → 문의 접수                  |
| `/travel`  | 청풍 여행 — 관광지 / 맛집(뼈대) / 함께하는 숙소(뼈대)        |
| `/story`   | 우리의 이야기 — 챕터별 스토리 + 수리 기록(Before/After)      |
| `/admin`   | 관리자 — 접수된 문의 확인·상태 관리 (검색엔진 비노출)        |

## 내용 고치기 — 코드를 몰라도 되는 부분

모든 문구와 데이터는 `src/content/` 아래 네 개 파일에 모여 있습니다.

- `site.ts` — 상호, 주소, 전화번호, 입·퇴실 시간, 메뉴 구성
- `rooms.ts` — 7개 객실 (나라, 방 이름, 설명, 정원, 침구, 색상, 사진 경로)
- `travel.ts` — 관광지 / 맛집 / 제휴 숙소
- `story.ts` — "우리의 이야기" 원고 + 수리 과정 기록

### 사진 넣기

사진은 `public/` 아래에 두고, 각 content 파일의 `photos` 배열(또는
`beforePhoto` / `afterPhoto`)에 경로를 적으면 됩니다.

```ts
photos: ["/rooms/mexico-1.jpg"];
```

비어 있는 동안에는 "사진 준비 중" 액자가 대신 표시되므로, 사진이 없어도
화면이 깨지지 않습니다.

### 이야기 원고

`src/content/story.ts`의 본문은 **톤을 잡기 위한 초안**입니다. 실제 이야기로
바꾼 뒤 같은 파일의 `IS_DRAFT`를 `false`로 두면 개발 모드 경고 배지가
사라집니다.

## 예약 문의 흐름

1. 손님이 `/reserve`에서 객실·날짜·인원·연락처를 남깁니다.
2. `POST /api/inquiries`가 검증 후 Firestore `cheongpung_inquiries`에 저장합니다.
3. 사장님이 `/admin`에서 목록을 보고 상태(신규 / 연락함 / 예약 확정 / 취소)와
   메모를 관리합니다.

결제 연동은 아직 없습니다. 나중에 붙일 때는 `status`가 `confirmed`로 바뀌는
지점에 결제 단계를 끼워 넣으면 됩니다.

## Firebase 사용 방식

기존 Firebase 프로젝트를 공유해서 씁니다. 다른 앱과 데이터가 섞이지 않도록:

- 모든 컬렉션은 **`cheongpung_` 접두사**를 씁니다 (`src/lib/firebase/admin.ts`의
  `COLLECTIONS` 참고).
- 브라우저는 Firestore에 직접 접근하지 않습니다. 읽기·쓰기는 전부 서버의 API
  라우트를 거치므로 이 앱 때문에 Firestore 보안 규칙을 건드릴 일이 없습니다.
- 관리자 구분은 ID 토큰의 `sign_in_provider === 'password'`로 합니다. 관리자
  계정은 Firebase 콘솔에서 이메일/비밀번호로 직접 만들어 주세요.

> ⚠️ `firebase-admin`은 **13.x로 고정**되어 있습니다. 14.x는 Vercel 프로덕션에서
> `ERR_REQUIRE_ESM`으로 빌드가 깨집니다 (로컬에서는 재현되지 않습니다).

## 스팸 대응

`/api/inquiries`는 인증 없이 열려 있습니다. 현재는 입력값 검증 + 봇 미끼
필드(honeypot)만 두었습니다. 문의가 많아지면 reCAPTCHA나 IP 기준 제한을
추가하는 것이 좋습니다.
