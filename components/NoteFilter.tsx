"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import CommentBox from "./CommentBox";
import type { Note } from "../data/types";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: "color-mix(in srgb, var(--accent-1) 25%, transparent)", color: "inherit", borderRadius: 2 }}>
            {part}
          </mark>
        ) : part
      )}
    </>
  );
}

export default function NoteFilter({ notes }: { notes: Note[] }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onSidebarNav(e: Event) {
      const slug = (e as CustomEvent<string>).detail;
      setQuery("");
      setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    window.addEventListener("sidebar-nav", onSidebarNav);
    return () => window.removeEventListener("sidebar-nav", onSidebarNav);
  }, []);

  const filtered = query.trim()
    ? notes.filter((n) => {
        const q = query.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      })
    : notes;

  return (
    <>
      {/* Inline search bar */}
      <div
        className="flex items-center gap-2 rounded-xl border px-3 py-2 mb-8"
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <Search size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter notes…"
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ color: "var(--text-muted)" }}>
            <X size={13} />
          </button>
        )}
        {query && (
          <span className="text-xs font-mono flex-shrink-0" style={{ color: "var(--text-muted)" }}>
            {filtered.length} of {notes.length}
          </span>
        )}
      </div>

      {/* Note cards */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No notes match &ldquo;{query}&rdquo;
          </div>
        ) : (
          filtered.map((note, i) => {
            const originalIndex = notes.indexOf(note);
            return (
              <div
                key={note.slug}
                id={note.slug}
                className="rounded-2xl border p-8"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--glow)",
                  scrollMarginTop: "72px",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold font-mono flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,var(--accent-1),var(--accent-2))",
                      color: "var(--accent-icon-text)",
                    }}
                  >
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="text-xl font-bold leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
                  >
                    <Highlight text={note.title} query={query} />
                  </h2>
                </div>

                <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-secondary)" }}>
                  <Highlight text={note.description} query={query} />
                </p>

                <div className="h-px mb-7"
                  style={{ background: "linear-gradient(90deg,var(--border-strong),transparent)" }} />

                <MarkdownContent content={note.content.replace(/^##\s+[^\n]+\n?/, "")} highlight={query} />
              </div>
            );
          })
        )}
      </div>

      {/* Page-level comment box */}
      <div className="mt-8">
        <CommentBox slug={notes[0]?.category ?? "general"} />
      </div>
    </>
  );
}
