"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import type { Note } from "../data/types";

export default function NoteFilter({ notes }: { notes: Note[] }) {
  const [query, setQuery] = useState("");

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
                    {note.title}
                  </h2>
                </div>

                <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-secondary)" }}>
                  {note.description}
                </p>

                <div className="h-px mb-7"
                  style={{ background: "linear-gradient(90deg,var(--border-strong),transparent)" }} />

                <MarkdownContent content={note.content.replace(/^##\s+[^\n]+\n?/, "")} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
