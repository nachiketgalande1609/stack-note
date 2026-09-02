"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { getSupabase } from "../../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");

    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        className="w-full max-w-[400px] rounded-2xl border p-8"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ background: "var(--accent-1)", boxShadow: "0 0 12px rgba(0,255,65,0.25)" }}
          >
            <Terminal size={15} style={{ color: "var(--accent-icon-text)" }} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
            Stack<span style={{ color: "var(--accent-1)" }}>Note</span>
          </span>
        </div>

        {sent ? (
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "color-mix(in srgb, var(--accent-1) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-1) 25%, transparent)" }}
            >
              <Mail size={20} style={{ color: "var(--accent-1)" }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
              Reset link sent
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              Check <strong style={{ color: "var(--text-primary)" }}>{email}</strong> for a link to reset your password.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--accent-1)" }}
            >
              <ArrowLeft size={13} /> Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Forgot password?
            </h1>
            <p className="text-sm mb-7" style={{ color: "var(--text-secondary)" }}>
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
                <div
                  className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
                  style={{ background: "var(--bg-surface-2)", borderColor: "var(--border)" }}
                >
                  <Mail size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(255,68,68,0.08)", color: "#ff4444", border: "1px solid rgba(255,68,68,0.2)" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: loading ? "var(--bg-surface-2)" : "var(--accent-1)",
                  color: loading ? "var(--text-muted)" : "var(--accent-icon-text)",
                  opacity: loading ? 0.7 : 1,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {loading ? "Sending…" : <><span>Send reset link</span><ArrowRight size={14} /></>}
              </button>
            </form>

            <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
              <Link href="/auth/login" className="inline-flex items-center gap-1 font-medium transition-opacity hover:opacity-70" style={{ color: "var(--accent-1)" }}>
                <ArrowLeft size={11} /> Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
