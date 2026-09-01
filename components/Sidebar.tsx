"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { categories } from "../data/categories";
import { getNotesByCategory } from "../data";

interface SidebarProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_H = 56; // height of fixed navbar in px

export default function Sidebar({ category, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const cat = categories.find((c) => c.slug === category);
  const notes = getNotesByCategory(category);

  const [activeSlug, setActiveSlug] = useState<string>(notes[0]?.slug ?? "");
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      let current = notes[0]?.slug ?? "";
      for (const note of notes) {
        const el = document.getElementById(note.slug);
        if (!el) continue;
        if (el.getBoundingClientRect().top - NAV_H <= 40) {
          current = note.slug;
        }
      }
      setActiveSlug(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [notes]);

  // Keep active item scrolled into view inside the sidebar
  useEffect(() => {
    const li = itemRefs.current[activeSlug];
    const container = scrollRef.current;
    if (!li || !container) return;
    const liTop = li.offsetTop;
    const liBottom = liTop + li.offsetHeight;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    if (liTop < containerTop + 40) {
      container.scrollTo({ top: liTop - 40, behavior: "smooth" });
    } else if (liBottom > containerBottom - 40) {
      container.scrollTo({ top: liBottom - container.clientHeight + 40, behavior: "smooth" });
    }
  }, [activeSlug]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-30 md:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-14 left-0 bottom-0 z-40 flex flex-col border-r
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{
          width: "260px",
          background: "var(--sidebar-bg)",
          borderColor: "var(--border)",
          transition: "transform 250ms ease, background 200ms ease",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={12} />
            Categories
          </Link>
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: "var(--accent-1)" }}
          >
            {cat?.label}
          </span>
        </div>

        {/* Notes list */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-px">
            {notes.map((note, i) => {
              const isActive = note.slug === activeSlug;
              return (
                <li
                  key={note.slug}
                  ref={(el) => { itemRefs.current[note.slug] = el; }}
                >
                  <Link
                    href={`/notes/${category}#${note.slug}`}
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(new CustomEvent("sidebar-nav", { detail: note.slug }));
                    }}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-md text-sm transition-all"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      background: isActive
                        ? "color-mix(in srgb, var(--accent-1) 10%, transparent)"
                        : "transparent",
                      borderLeft: `2px solid ${isActive ? "var(--accent-1)" : "transparent"}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    <span
                      className="text-xs font-mono flex-shrink-0 mt-px"
                      style={{ color: isActive ? "var(--accent-1)" : "var(--text-secondary)", opacity: isActive ? 1 : 0.7 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug" style={{ fontWeight: isActive ? 500 : 400 }}>
                      {note.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="px-4 py-2.5 border-t text-xs font-mono"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)", opacity: 0.6 }}
        >
          stack<span style={{ color: "var(--accent-1)" }}>note</span> / {cat?.slug}
        </div>
      </aside>
    </>
  );
}
