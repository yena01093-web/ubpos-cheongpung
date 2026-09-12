import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * 기존 Firebase 프로젝트를 공유해서 씁니다. 다른 앱(유람선/식당)의 데이터와 절대
 * 섞이지 않도록 이 프로젝트의 모든 컬렉션은 `cheongpung_` 접두사를 씁니다.
 * 브라우저는 Firestore에 직접 접근하지 않고 전부 API 라우트를 통해서만 오갑니다.
 */
export const COLLECTIONS = {
  inquiries: "cheongpung_inquiries",
} as const;

function getAdminApp(): App {
  const existing = getApps().find((a) => a.name === "admin");
  if (existing) return existing;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin 환경변수(FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY)가 설정되지 않았습니다. .env.local을 확인하세요."
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) }, "admin");
}

export function adminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function adminAuth(): Auth {
  return getAuth(getAdminApp());
}
