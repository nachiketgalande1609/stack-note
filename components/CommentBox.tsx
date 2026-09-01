"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  created_at: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30)  return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function CommentBox({ slug }: { slug: string }) {
  const [comments, setComments]   = useState<Comment[]>([]);
  const [loading, setLoading]     = useState(true);
  const [text, setText]           = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      const data = await res.json() as Comment[];
      setComments(Array.isArray(data) ? data : []);
    } catch {
      // silently fail — no comments shown
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  async function submit() {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: text.trim() }),
      });
      if (!res.ok) {
        const e = await res.json() as { error: string };
        setError(e.error ?? "Failed to post comment.");
        return;
      }
      const newComment = await res.json() as Comment;
      setComments((prev) => [...prev, newComment]);
      setText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-10 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare size={14} style={{ color: "var(--accent-1)" }} />
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
          Suggestions & Improvements
        </span>
        {comments.length > 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded font-mono"
            style={{ background: "rgba(0,255,65,0.1)", color: "var(--accent-1)", border: "1px solid rgba(0,255,65,0.18)" }}>
            {comments.length}
          </span>
        )}
      </div>

      {/* Existing comments */}
      {loading ? (
        <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "var(--text-muted)" }}>
          <Loader2 size={12} className="animate-spin" /> Loading comments…
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-3 mb-6">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: "var(--bg-surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                lineHeight: 1.6,
              }}
            >
              <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{c.content}</p>
              <span className="text-xs mt-2 block" style={{ color: "var(--text-muted)" }}>
                Anonymous · {timeAgo(c.created_at)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
          No suggestions yet — be the first to leave one.
        </p>
      )}

      {/* Input */}
      <div className="rounded-xl border overflow-hidden"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submit(); }}
          placeholder="Suggest an improvement or correction… (Ctrl+Enter to send)"
          rows={3}
          maxLength={1000}
          className="w-full bg-transparent text-sm px-4 pt-3 pb-2 outline-none resize-none"
          style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
        />
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs" style={{ color: "#ff4444" }}>{error}</span>
            )}
            {submitted && !error && (
              <span className="text-xs" style={{ color: "var(--accent-1)" }}>Comment posted!</span>
            )}
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {text.length}/1000
            </span>
          </div>
          <button
            onClick={submit}
            disabled={!text.trim() || submitting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: text.trim() && !submitting ? "var(--accent-1)" : "var(--bg-surface-2)",
              color: text.trim() && !submitting ? "var(--accent-icon-text)" : "var(--text-muted)",
              border: "1px solid var(--border)",
              cursor: text.trim() && !submitting ? "pointer" : "not-allowed",
            }}
          >
            {submitting
              ? <><Loader2 size={11} className="animate-spin" /> Posting…</>
              : <><Send size={11} /> Post anonymously</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
