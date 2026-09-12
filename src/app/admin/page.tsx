"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import LoginForm from "@/components/admin/LoginForm";
import InquiriesPanel from "@/components/admin/InquiriesPanel";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(getClientAuth(), (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24">
        <div className="h-40 animate-pulse rounded-card bg-sand-100" />
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="truncate text-xs text-ink-500">{user.email}</span>
          <button
            onClick={() => void signOut(getClientAuth())}
            className="shrink-0 text-xs font-bold text-spice-600 hover:text-spice-700"
          >
            로그아웃
          </button>
        </div>
      </div>
      <InquiriesPanel />
    </>
  );
}
