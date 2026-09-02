"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { getSupabase } from "../../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError]         = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");

    const { error } = await getSupabase().auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  async function handleGoogle() {
    setOauthLoading(true);
    setError("");
    const { error } = await getSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setOauthLoading(false); }
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

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Welcome back
        </h1>
        <p className="text-sm mb-7" style={{ color: "var(--text-secondary)" }}>
          Sign in to your account to continue.
        </p>

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          disabled={oauthLoading}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border text-sm font-medium transition-all mb-5"
          style={{
            background: "var(--bg-surface-2)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            opacity: oauthLoading ? 0.6 : 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          {/* Google icon */}
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {oauthLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Email
            </label>
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

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Password</label>
              <Link href="/auth/forgot-password" className="text-xs transition-opacity hover:opacity-70" style={{ color: "var(--accent-1)" }}>
                Forgot password?
              </Link>
            </div>
            <div
              className="flex items-center gap-2 rounded-xl border px-3 py-2.5"
              style={{ background: "var(--bg-surface-2)", borderColor: "var(--border)" }}
            >
              <Lock size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ color: "var(--text-muted)" }}>
                {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(255,68,68,0.08)", color: "#ff4444", border: "1px solid rgba(255,68,68,0.2)" }}>
              {error}
            </p>
          )}

          {/* Submit */}
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
            {loading ? "Signing in…" : <><span>Sign in</span><ArrowRight size={14} /></>}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium transition-opacity hover:opacity-70" style={{ color: "var(--accent-1)" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
