"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categories } from "../data/categories";
import { getNotesByCategory } from "../data";

interface SidebarProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ category, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const cat = categories.find((c) => c.slug === category);
  const notes = getNotesByCategory(category);

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

        {/* Notes */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-px">
            {notes.map((note, i) => {
              const href = `/notes/${category}#${note.slug}`;
              return (
                <li key={note.slug}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-md text-sm transition-colors hover:opacity-80"
                    style={{
                      color: "var(--text-secondary)",
                      background: "transparent",
                      borderLeft: "2px solid transparent",
                    }}
                  >
                    <span
                      className="text-xs font-mono flex-shrink-0 mt-px"
                      style={{ color: "var(--text-secondary)", opacity: 0.7 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug">{note.title}</span>
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
