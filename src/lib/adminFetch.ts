import { getClientAuth } from "./firebase/client";

/** 현재 로그인한 관리자의 ID 토큰을 붙여서 요청한다. */
export async function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const user = getClientAuth().currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  const token = await user.getIdToken();
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
