"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, PenLine, Check, PanelLeftClose, PanelLeftOpen, Maximize2, Minimize2, Bold, Italic, Heading2, Heading3, List, Code, FileCode, Quote } from "lucide-react";
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

function ToolbarBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex items-center justify-center w-6 h-6 rounded transition-colors flex-shrink-0"
      style={{ color: "var(--text-muted)", background: "transparent" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-3.5 mx-0.5 flex-shrink-0" style={{ background: "var(--border)" }} />;
}

function PersonalNotesEditor({ noteSlug }: { noteSlug: string }) {
  const storageKey = `sn-personal-notes-${noteSlug}`;
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

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

  function applyFormat(type: string) {
    const el = taRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value: v } = el;
    const selected = v.slice(s, e);
    const lineStart = v.lastIndexOf('\n', s - 1) + 1;
    let nv = v, ns = s, ne = e;

    switch (type) {
      case 'bold': {
        const isBold = selected.startsWith('**') && selected.endsWith('**') && selected.length > 4;
        if (isBold) { const inner = selected.slice(2, -2); nv = v.slice(0, s) + inner + v.slice(e); ne = s + inner.length; }
        else { const ph = selected || 'bold text'; nv = v.slice(0, s) + `**${ph}**` + v.slice(e); ns = s + 2; ne = ns + ph.length; }
        break;
      }
      case 'italic': {
        const isItalic = selected.startsWith('*') && selected.endsWith('*') && !selected.startsWith('**');
        if (isItalic) { const inner = selected.slice(1, -1); nv = v.slice(0, s) + inner + v.slice(e); ne = s + inner.length; }
        else { const ph = selected || 'italic text'; nv = v.slice(0, s) + `*${ph}*` + v.slice(e); ns = s + 1; ne = ns + ph.length; }
        break;
      }
      case 'h2': {
        const lt = v.slice(lineStart);
        if (lt.startsWith('## ')) { nv = v.slice(0, lineStart) + lt.slice(3); ns = Math.max(lineStart, s - 3); ne = Math.max(lineStart, e - 3); }
        else if (lt.startsWith('### ')) { nv = v.slice(0, lineStart) + '## ' + lt.slice(4); ns = s - 1; ne = e - 1; }
        else { nv = v.slice(0, lineStart) + '## ' + v.slice(lineStart); ns = s + 3; ne = e + 3; }
        break;
      }
      case 'h3': {
        const lt = v.slice(lineStart);
        if (lt.startsWith('### ')) { nv = v.slice(0, lineStart) + lt.slice(4); ns = Math.max(lineStart, s - 4); ne = Math.max(lineStart, e - 4); }
        else if (lt.startsWith('## ')) { nv = v.slice(0, lineStart) + '### ' + lt.slice(3); ns = s + 1; ne = e + 1; }
        else { nv = v.slice(0, lineStart) + '### ' + v.slice(lineStart); ns = s + 4; ne = e + 4; }
        break;
      }
      case 'bullet': {
        const chunk = v.slice(lineStart, e);
        const lines = chunk.split('\n');
        const allBullet = lines.every(l => l.startsWith('- '));
        const replaced = lines.map(l => allBullet ? l.slice(2) : (l.startsWith('- ') ? l : `- ${l}`)).join('\n');
        nv = v.slice(0, lineStart) + replaced + v.slice(e);
        ne = lineStart + replaced.length;
        ns = Math.max(lineStart, s + (allBullet ? -2 : 2));
        break;
      }
      case 'code': {
        const isCoded = selected.startsWith('`') && selected.endsWith('`') && selected.length > 2;
        if (isCoded) { const inner = selected.slice(1, -1); nv = v.slice(0, s) + inner + v.slice(e); ne = s + inner.length; }
        else { const ph = selected || 'code'; nv = v.slice(0, s) + '`' + ph + '`' + v.slice(e); ns = s + 1; ne = ns + ph.length; }
        break;
      }
      case 'codeblock': {
        const ph = selected || 'code here';
        const pre = s > 0 && v[s - 1] !== '\n' ? '\n' : '';
        const suf = e < v.length && v[e] !== '\n' ? '\n' : '';
        const block = pre + '```\n' + ph + '\n```' + suf;
        nv = v.slice(0, s) + block + v.slice(e);
        ns = s + pre.length + 4;
        ne = ns + ph.length;
        break;
      }
      case 'quote': {
        const lt = v.slice(lineStart);
        if (lt.startsWith('> ')) { nv = v.slice(0, lineStart) + lt.slice(2); ns = Math.max(lineStart, s - 2); ne = Math.max(lineStart, e - 2); }
        else { nv = v.slice(0, lineStart) + '> ' + v.slice(lineStart); ns = s + 2; ne = e + 2; }
        break;
      }
    }

    handleChange(nv);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(ns, ne); });
  }

  if (!noteSlug) return null;

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Toolbar */}
      <div
        className="flex items-center gap-0.5 px-2 py-1.5 rounded-lg flex-shrink-0"
        style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)" }}
      >
        <ToolbarBtn onClick={() => applyFormat('bold')} title="Bold"><Bold size={12} /></ToolbarBtn>
        <ToolbarBtn onClick={() => applyFormat('italic')} title="Italic"><Italic size={12} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => applyFormat('h2')} title="Heading 2"><Heading2 size={12} /></ToolbarBtn>
        <ToolbarBtn onClick={() => applyFormat('h3')} title="Heading 3"><Heading3 size={12} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => applyFormat('bullet')} title="Bullet list"><List size={12} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => applyFormat('code')} title="Inline code"><Code size={12} /></ToolbarBtn>
        <ToolbarBtn onClick={() => applyFormat('codeblock')} title="Code block"><FileCode size={12} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => applyFormat('quote')} title="Blockquote"><Quote size={12} /></ToolbarBtn>
        {saved && (
          <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
            <Check size={10} /> Saved
          </span>
        )}
      </div>
      <textarea
        ref={taRef}
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder="Write your notes here… (supports markdown)"
        className="flex-1 w-full bg-transparent text-sm outline-none resize-none"
        style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif", lineHeight: 1.7, minHeight: 160 }}
      />
    </div>
  );
}

function NoteRow({ note, originalIndex, query, editorOpen, editorExpanded }: {
  note: Note; originalIndex: number; query: string; editorOpen: boolean; editorExpanded: boolean;
}) {
  const cardFlex = !editorOpen ? "1 1 100%" : editorExpanded ? "0 0 0px" : "1 1 50%";
  const editorFlex = editorExpanded ? "1 1 100%" : "1 1 50%";

  return (
    <div id={note.slug} className="flex gap-4 items-start" style={{ scrollMarginTop: "24px" }}>

      {/* Note card */}
      <div
        className="min-w-0 rounded-2xl p-8 transition-all duration-200"
        style={{
          flex: cardFlex,
          overflow: editorOpen && editorExpanded ? "hidden" : undefined,
          maxWidth: editorOpen && editorExpanded ? 0 : undefined,
          padding: editorOpen && editorExpanded ? 0 : undefined,
          border: editorOpen && editorExpanded ? "none" : "1px solid var(--border)",
          background: "var(--bg-surface)",
          boxShadow: editorOpen && editorExpanded ? "none" : "var(--glow)",
          opacity: editorOpen && editorExpanded ? 0 : 1,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold font-mono flex-shrink-0"
            style={{ background: "linear-gradient(135deg,var(--accent-1),var(--accent-2))", color: "var(--accent-icon-text)" }}
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

        <div className="h-px mb-7" style={{ background: "linear-gradient(90deg,var(--border-strong),transparent)" }} />

        <MarkdownContent content={note.content.replace(/^##\s+[^\n]+\n?/, "")} highlight={query} />
      </div>

      {/* Per-card notes editor */}
      {editorOpen && (
        <div
          className="hidden lg:flex flex-col rounded-2xl transition-all duration-200"
          style={{
            flex: editorFlex,
            minWidth: 0,
            border: "1px solid var(--border)",
            background: "var(--bg-surface)",
          }}
        >
          {/* Title bar — richer when expanded */}
          {editorExpanded ? (
            <div
              className="flex items-center gap-3 px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--accent-1) 5%, var(--bg-surface))" }}
            >
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold font-mono flex-shrink-0"
                style={{ background: "linear-gradient(135deg,var(--accent-1),var(--accent-2))", color: "var(--accent-icon-text)" }}
              >
                {String(originalIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
                  {note.title}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{note.description}</p>
              </div>
              <PenLine size={13} style={{ color: "var(--accent-1)", flexShrink: 0 }} />
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: "var(--border)" }}
            >
              <PenLine size={12} style={{ color: "var(--accent-1)" }} />
              <span className="text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
                My Notes — {note.title}
              </span>
            </div>
          )}
          <div className="flex-1 p-4">
            <PersonalNotesEditor noteSlug={note.slug} />
          </div>
        </div>
      )}

    </div>
  );
}


interface NoteFilterProps {
  notes: Note[];
  catSlug: string;
  catLabel: string;
}

export default function NoteFilter({ notes, catSlug, catLabel }: NoteFilterProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(notes[0]?.slug ?? "");
  const [listVisible, setListVisible] = useState(true);
  const [editorOpen, setEditorOpen] = useState(true);
  const [editorExpanded, setEditorExpanded] = useState(false);
  const rightRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const listScrollRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? notes.filter(n => {
        const q = query.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      })
    : notes;

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

      {/* ── Right: cards, each with its own editor ── */}
      <div ref={rightRef} className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-6">

          {/* Category header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setListVisible(v => !v)}
              className="flex items-center justify-center w-7 h-7 rounded-lg border transition-all flex-shrink-0"
              style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}
              title={listVisible ? "Hide note list" : "Show note list"}
            >
              {listVisible ? <PanelLeftClose size={13} /> : <PanelLeftOpen size={13} />}
            </button>
            <h1
              className="text-3xl font-bold flex-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              {catLabel}
            </h1>
            {/* Expand notes to full width */}
            {editorOpen && (
              <button
                onClick={() => setEditorExpanded(v => !v)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex-shrink-0"
                style={{
                  background: editorExpanded ? "color-mix(in srgb, var(--accent-1) 10%, var(--bg-surface))" : "var(--bg-surface)",
                  borderColor: editorExpanded ? "var(--accent-1)" : "var(--border)",
                  color: editorExpanded ? "var(--accent-1)" : "var(--text-muted)",
                }}
                title={editorExpanded ? "Collapse notes" : "Expand notes to full width"}
              >
                {editorExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                {editorExpanded ? "Collapse" : "Expand"}
              </button>
            )}
            {/* Global notes toggle */}
            <button
              onClick={() => { setEditorOpen(v => !v); setEditorExpanded(false); }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex-shrink-0"
              style={{
                background: editorOpen ? "color-mix(in srgb, var(--accent-1) 10%, var(--bg-surface))" : "var(--bg-surface)",
                borderColor: editorOpen ? "var(--accent-1)" : "var(--border)",
                color: editorOpen ? "var(--accent-1)" : "var(--text-muted)",
              }}
              title={editorOpen ? "Hide notes editor" : "Show notes editor"}
            >
              <PenLine size={12} />
              {editorOpen ? "Hide Notes" : "Show Notes"}
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: "var(--text-muted)" }}>
              No notes match &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map(note => {
              const originalIndex = notes.indexOf(note);
              return (
                <NoteRow
                  key={note.slug}
                  note={note}
                  originalIndex={originalIndex}
                  query={query}
                  editorOpen={editorOpen}
                  editorExpanded={editorExpanded}
                />
              );
            })
          )}

          {/* Comment box */}
          <div className="mt-2">
            <CommentBox slug={catSlug} />
          </div>

        </div>
      </div>
    </div>
  );
}
