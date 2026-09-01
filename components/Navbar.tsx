"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronDown, Search, Sun, Moon, Cpu, Code2, FileCode, Layers, Database } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { categories } from "../data/categories";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Code2, FileCode, Layers, Database,
};

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuBtn?: boolean;
}

export default function Navbar({ onMenuClick, showMenuBtn }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center px-5 border-b gap-4"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--border)",
        transition: "background 200ms ease",
      }}
    >
      {/* Hamburger (mobile, sidebar pages) */}
      {showMenuBtn && (
        <button
          onClick={onMenuClick}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 rounded-md border flex-shrink-0"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
          aria-label="Toggle sidebar"
        >
          {[0,1,2].map(i => (
            <span key={i} className="block mx-auto rounded-full"
              style={{ width: 14, height: 1.5, background: "var(--text-primary)" }} />
          ))}
        </button>
      )}

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: "var(--accent-1)", boxShadow: "0 0 12px rgba(0,255,65,0.3)" }}
        >
          <span style={{ color: "var(--accent-icon-text)", display: "flex" }}>
            <Terminal size={14} strokeWidth={2.5} />
          </span>
        </div>
        <span
          className="font-bold text-base tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
        >
          Stack<span style={{ color: "var(--accent-1)" }}>Note</span>
        </span>
      </Link>

      {/* Divider */}
      <div className="h-5 w-px flex-shrink-0" style={{ background: "var(--border-strong)" }} />

      {/* Technologies dropdown — left-aligned after logo */}
      <div className="relative flex-shrink-0" ref={dropRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
          style={{
            background: dropdownOpen ? "var(--bg-surface-2)" : "transparent",
            color: dropdownOpen ? "var(--text-primary)" : "var(--text-secondary)",
          }}
        >
          Technologies
          <ChevronDown
            size={13}
            style={{
              color: "var(--accent-1)",
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          />
        </button>

        {dropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 w-56 rounded-xl border overflow-hidden z-50"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-strong)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
            }}
          >
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link
                  key={cat.slug}
                  href={`/notes/${cat.slug}`}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm border-b last:border-b-0 transition-colors"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  <span className="font-mono text-xs w-5 text-center flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon size={13} style={{ color: "var(--accent-1)", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{cat.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: search + theme toggle */}
      <div className="flex items-center gap-2">
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-default"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <Search size={12} />
          <span className="hidden md:inline text-xs">Search…</span>
          <kbd
            className="ml-1 px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--bg-surface-2)", color: "var(--accent-1)", border: "1px solid var(--border)" }}
          >
            ⌘K
          </kbd>
        </div>

        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-md border transition-colors"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark"
            ? <Sun size={14} style={{ color: "var(--accent-1)" }} />
            : <Moon size={14} style={{ color: "var(--accent-1)" }} />}
        </button>
      </div>
    </header>
  );
}
