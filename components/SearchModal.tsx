"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { allNotes } from "../data";
import { categories } from "../data/categories";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const catLabel = (slug: string) =>
  categories.find((c) => c.slug === slug)?.label ?? slug;

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? allNotes.filter((n) => {
        const q = query.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const navigate = useCallback((note: { category: string; slug: string }) => {
    router.push(`/notes/${note.category}#${note.slug}`);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (results.length === 0) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { navigate(results[selected]); }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, results, selected, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl rounded-2xl border overflow-hidden shadow-2xl mx-4"
        style={{ background: "var(--bg-surface)", borderColor: "var(--border-strong)" }}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <Search size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "var(--text-muted)" }}>
              <X size={14} />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 rounded text-xs font-mono flex-shrink-0"
            style={{ background: "var(--bg-surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((note, i) => (
              <li key={`${note.category}-${note.slug}`}>
                <button
                  className="w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors"
                  style={{
                    background: i === selected ? "var(--bg-surface-2)" : "transparent",
                  }}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => navigate(note)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {note.title}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {note.description}
                    </p>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                    style={{ background: "color-mix(in srgb, var(--accent-1) 12%, transparent)", color: "var(--accent-1)" }}>
                    {catLabel(note.category)}
                  </span>
                  {i === selected && <ArrowRight size={12} style={{ color: "var(--accent-1)", flexShrink: 0 }} />}
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="py-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No notes found for &ldquo;{query}&rdquo;
          </div>
        )}

        {!query && (
          <div className="py-8 text-center text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            Type to search across all notes
          </div>
        )}
      </div>
    </div>
  );
}
