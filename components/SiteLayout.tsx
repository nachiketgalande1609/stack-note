"use client";

import { useState, useEffect } from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import Navbar from "./Navbar";
import ChatDrawer, { PANEL_WIDTH, PANEL_WIDTH_MAX } from "./ChatDrawer";
import SearchModal from "./SearchModal";

function LayoutInner({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMaximized, setChatMaximized] = useState(false);
  const [chatFullScreen, setChatFullScreen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", transition: "background 200ms ease" }}>
      <Navbar
        chatOpen={chatOpen}
        onChatToggle={() => setChatOpen((v) => !v)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <ChatDrawer
        isOpen={chatOpen}
        onClose={() => { setChatOpen(false); setChatMaximized(false); setChatFullScreen(false); }}
        maximized={chatMaximized}
        onMaximize={() => setChatMaximized((v) => !v)}
        fullScreen={chatFullScreen}
        onFullScreen={() => { setChatFullScreen((v) => !v); setChatMaximized(false); }}
      />

      <main
        className="pt-14 min-h-screen"
        style={{
          color: "var(--text-primary)",
          transition: "padding-right 260ms cubic-bezier(0.4,0,0.2,1), color 200ms ease",
          paddingRight: chatOpen && !chatFullScreen ? (chatMaximized ? PANEL_WIDTH_MAX : PANEL_WIDTH) : 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutInner>{children}</LayoutInner>
      </ThemeProvider>
    </AuthProvider>
  );
}
