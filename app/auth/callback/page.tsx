"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabase } from "../../../lib/supabase";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      getSupabase()
        .auth.exchangeCodeForSession(code)
        .finally(() => router.replace("/"));
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  return (
    <div
      className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center gap-3"
      style={{ background: "var(--bg-base)" }}
    >
      <Loader2 size={20} className="animate-spin" style={{ color: "var(--accent-1)" }} />
      <p className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "Inter, sans-serif" }}>
        Signing you in…
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-56px)] flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
        <Loader2 size={20} className="animate-spin" style={{ color: "var(--accent-1)" }} />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
