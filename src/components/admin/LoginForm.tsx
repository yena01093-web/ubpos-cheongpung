"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signInWithEmailAndPassword(getClientAuth(), email.trim(), password);
    } catch {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-24">
      <p className="text-[11px] font-bold tracking-[0.3em] text-spice-600">ADMIN</p>
      <h1 className="mt-3 font-serif text-2xl font-bold text-ink-900">관리자 로그인</h1>
      <p className="mt-2 text-sm text-ink-500">
        접수된 예약 문의를 확인하고 상태를 관리합니다.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          required
          autoComplete="username"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-[15px] outline-none focus:border-spice-500 focus:ring-2 focus:ring-spice-500/20"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-[15px] outline-none focus:border-spice-500 focus:ring-2 focus:ring-spice-500/20"
        />

        {error && (
          <p role="alert" className="rounded-xl bg-spice-200/60 px-4 py-3 text-sm text-spice-900">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-ink-900 px-6 py-3.5 text-sm font-bold text-sand-50 transition-colors hover:bg-spice-600 disabled:opacity-60"
        >
          {busy ? "로그인 중…" : "로그인"}
        </button>
      </form>
    </div>
  );
}
