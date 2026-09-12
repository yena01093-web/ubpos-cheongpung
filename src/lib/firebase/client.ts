import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getOrInitApp(): FirebaseApp {
  const existing = getApps().find((a) => a.name === "[DEFAULT]");
  return existing ?? initializeApp(firebaseConfig);
}

/** 관리자 로그인(이메일/비밀번호) 전용. 손님 화면에서는 Firebase를 쓰지 않습니다. */
export function getClientAuth(): Auth {
  return getAuth(getOrInitApp());
}
