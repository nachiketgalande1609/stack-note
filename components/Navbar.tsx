"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronDown, Search, Sun, Moon, MessageSquare, LogIn, LogOut } from "lucide-react";
import { SiPython, SiJavascript, SiReact, SiMysql, SiFastapi } from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import { useTheme } from "./ThemeProvider";
import { useAuth, getUserDisplayName, getUserInitials } from "./AuthProvider";
import { categories } from "../data/categories";

const iconMap: Record<string, React.ElementType> = {
  ai:         TbBrain,
  python:     SiPython,
  javascript: SiJavascript,
  react:      SiReact,
  mysql:      SiMysql,
  fastapi:    SiFastapi,
};

const iconColour: Record<string, string> = {
  ai:         "#a78bfa",
  python:     "#3b82f6",
  javascript: "#eab308",
  react:      "#38bdf8",
  mysql:      "#f97316",
  fastapi:    "#22c55e",
};

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuBtn?: boolean;
  chatOpen?: boolean;
  onChatToggle?: () => void;
  onSearchOpen?: () => void;
}

export default function Navbar({ onMenuClick, showMenuBtn, chatOpen, onChatToggle, onSearchOpen }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const { user, loading: authLoading, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
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
              const colour = iconColour[cat.icon] ?? "var(--accent-1)";
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
                  <Icon size={13} style={{ color: colour, flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{cat.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: search + theme toggle + user */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchOpen}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-colors"
          style={{
            width: 220,
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
        >
          <Search size={12} />
          <span className="text-xs">Search…</span>
        </button>

        <button
          onClick={onChatToggle}
          className="w-8 h-8 flex items-center justify-center rounded-md border transition-colors"
          style={{
            background: chatOpen ? "var(--accent-1)" : "var(--bg-surface)",
            borderColor: chatOpen ? "var(--accent-1)" : "var(--border)",
          }}
          aria-label="Toggle AI chat"
          title="Ask AI"
        >
          <MessageSquare size={14} style={{ color: chatOpen ? "var(--accent-icon-text)" : "var(--accent-1)" }} />
        </button>

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

        {/* User area */}
        {!authLoading && (
          user ? (
            <div className="relative flex-shrink-0" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: user.user_metadata?.avatar_url
                    ? "transparent"
                    : "var(--accent-1)",
                  color: "var(--accent-icon-text)",
                  boxShadow: userMenuOpen ? "0 0 0 2px var(--accent-1)" : "none",
                  overflow: "hidden",
                  border: "none",
                }}
                aria-label="User menu"
              >
                {user.user_metadata?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11 }}>
                    {getUserInitials(user)}
                  </span>
                )}
              </button>

              {userMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-52 rounded-xl border overflow-hidden z-50"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: "var(--border-strong)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
                  }}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {getUserDisplayName(user)}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {user.email}
                    </p>
                  </div>
                  {/* Sign out */}
                  <button
                    onClick={async () => { setUserMenuOpen(false); await signOut(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors"
                    style={{ color: "var(--text-secondary)", background: "transparent" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-surface-2)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut size={13} style={{ color: "var(--text-muted)" }} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all border flex-shrink-0"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-1)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
            >
              <LogIn size={12} />
              Sign in
            </Link>
          )
        )}
      </div>
    </header>
  );
}
