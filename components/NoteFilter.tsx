"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, PenLine, Check, PanelLeftClose, PanelLeftOpen } from "lucide-react";
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

function PersonalNotesEditor({ noteSlug }: { noteSlug: string }) {
  const storageKey = `sn-personal-notes-${noteSlug}`;
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try { setText(localStorage.getItem(storageKey) ?? ""); } catch {}
    setSaved(false);
  }, [storageKey]);

  function handleChange(val: string) {
    setText(val);
    setSaved(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try { localStorage.setItem(storageKey, val); } catch {}
      setSaved(true);
    }, 600);
  }

  if (!noteSlug) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <PenLine size={12} style={{ color: "var(--accent-1)" }} />
          <span className="text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
            My Notes
          </span>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <Check size={10} /> Saved
          </span>
        )}
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder="Write your notes here… (auto-saved)"
        rows={12}
        className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none resize-y"
        style={{
          background: "var(--bg-base)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
          fontFamily: "Inter, sans-serif",
          lineHeight: 1.7,
          minHeight: 200,
          transition: "border-color 150ms",
        }}
        onFocus={e => (e.currentTarget.style.borderColor = "var(--accent-1)")}
        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
      />
      <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>Auto-saved to your browser.</p>
    </div>
  );
}

interface NoteFilterProps {
  notes: Note[];
  catSlug: string;
  catLabel: string;
}

const NAV_H = 56;

export default function NoteFilter({ notes, catSlug, catLabel }: NoteFilterProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(notes[0]?.slug ?? "");
  const [listVisible, setListVisible] = useState(true);
  const rightRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const listScrollRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? notes.filter(n => {
        const q = query.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      })
    : notes;

  const activeNote = notes.find(n => n.slug === activeSlug) ?? notes[0] ?? null;
  const activeIndex = activeNote ? notes.findIndex(n => n.slug === activeNote.slug) : 0;

  // Track which card is scrolled into view (in right panel)
  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    function onScroll() {
      let current = notes[0]?.slug ?? "";
      for (const note of notes) {
        const card = document.getElementById(note.slug);
        if (!card) continue;
        const cardTop = card.getBoundingClientRect().top - el!.getBoundingClientRect().top;
        if (cardTop <= 60) current = note.slug;
      }
      setActiveSlug(current);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [notes]);

  // Keep active item visible in left list
  useEffect(() => {
    const li = itemRefs.current[activeSlug];
    const container = listScrollRef.current;
    if (!li || !container) return;
    const liTop = li.offsetTop;
    const liBottom = liTop + li.offsetHeight;
    const cTop = container.scrollTop;
    const cBottom = cTop + container.clientHeight;
    if (liTop < cTop + 40) container.scrollTo({ top: liTop - 40, behavior: "smooth" });
    else if (liBottom > cBottom - 40) container.scrollTo({ top: liBottom - container.clientHeight + 40, behavior: "smooth" });
  }, [activeSlug]);

  function scrollToNote(slug: string) {
    setQuery("");
    const card = document.getElementById(slug);
    const container = rightRef.current;
    if (!card || !container) return;
    const offset = card.offsetTop - 24;
    container.scrollTo({ top: offset, behavior: "smooth" });
  }

  return (
    <div className="flex" style={{ height: "calc(100vh - 56px)" }}>

      {/* ── Left: compact note list ── */}
      <div
        className="flex-shrink-0 border-r flex flex-col overflow-hidden transition-all duration-200"
        style={{
          width: listVisible ? 260 : 0,
          borderColor: "var(--border)",
          background: "var(--bg-base)",
          opacity: listVisible ? 1 : 0,
        }}
      >
        {/* Search */}
        <div className="px-3 pt-4 pb-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
          <div
            className="flex items-center gap-2 rounded-lg border px-3 py-2"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            <Search size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter notes…"
              className="flex-1 bg-transparent text-xs outline-none"
              style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ color: "var(--text-muted)" }}>
                <X size={11} />
              </button>
            )}
          </div>
          {query && (
            <p className="text-xs mt-1.5 font-mono" style={{ color: "var(--text-muted)" }}>
              {filtered.length} of {notes.length} notes
            </p>
          )}
        </div>

        {/* Note list */}
        <div ref={listScrollRef} className="flex-1 overflow-y-auto py-1">
          <ul className="space-y-px">
            {filtered.map(note => {
              const idx = notes.indexOf(note);
              const isActive = note.slug === activeSlug;
              return (
                <li key={note.slug} ref={el => { itemRefs.current[note.slug] = el; }}>
                  <button
                    onClick={() => scrollToNote(note.slug)}
                    className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-md transition-all"
                    style={{
                      background: isActive
                        ? "color-mix(in srgb, var(--accent-1) 10%, transparent)"
                        : "transparent",
                      borderLeft: `2px solid ${isActive ? "var(--accent-1)" : "transparent"}`,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-2)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span
                      className="text-xs font-mono flex-shrink-0 mt-px"
                      style={{ color: isActive ? "var(--accent-1)" : "var(--text-muted)", opacity: isActive ? 1 : 0.7 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm leading-snug"
                        style={{ fontWeight: isActive ? 500 : 400, fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        <Highlight text={note.title} query={query} />
                      </p>
                      <p className="text-xs mt-0.5 leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
                        <Highlight text={note.description} query={query} />
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 && (
            <p className="text-xs px-4 py-6" style={{ color: "var(--text-muted)" }}>
              No notes match &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t text-xs font-mono flex-shrink-0"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)", opacity: 0.6 }}>
          stack<span style={{ color: "var(--accent-1)" }}>note</span> / {catSlug}
        </div>
      </div>

      {/* ── Right: cards + sticky editor ── */}
      <div ref={rightRef} className="flex-1 overflow-y-auto">
        <div className="flex gap-6 p-8 items-start">

          {/* Note cards */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Category header row */}
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setListVisible(v => !v)}
                className="flex items-center justify-center w-7 h-7 rounded-lg border transition-all flex-shrink-0"
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
                title={listVisible ? "Hide note list" : "Show note list"}
              >
                {listVisible ? <PanelLeftClose size={13} /> : <PanelLeftOpen size={13} />}
              </button>
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {catLabel}
              </h1>
            </div>
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                No notes match &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map(note => {
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
                      scrollMarginTop: "24px",
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

            {/* Comment box */}
            <div className="mt-2">
              <CommentBox slug={catSlug} />
            </div>
          </div>

          {/* Sticky notes editor — visible on xl+ screens */}
          <div className="hidden xl:block w-[300px] flex-shrink-0">
            <div className="sticky flex flex-col gap-3" style={{ top: 0 }}>
              {/* Active note chip */}
              {activeNote && (
                <div
                  className="rounded-xl border px-4 py-3"
                  style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold" style={{ color: "var(--accent-1)" }}>
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm font-semibold truncate"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
                    >
                      {activeNote.title}
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {activeNote.description}
                  </p>
                </div>
              )}

              {/* Editor */}
              <div
                className="rounded-xl border px-4 py-4"
                style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
              >
                <PersonalNotesEditor noteSlug={activeNote?.slug ?? ""} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
