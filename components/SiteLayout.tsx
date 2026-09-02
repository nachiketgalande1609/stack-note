"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatDrawer, { PANEL_WIDTH, PANEL_WIDTH_MAX } from "./ChatDrawer";
import SearchModal from "./SearchModal";

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Extract category from /notes/[category] or /notes/[category]/[slug]
  const match = pathname.match(/^\/notes\/([^/]+)/);
  const activeCategory = match ? match[1] : null;
  const showSidebar = activeCategory !== null;

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", transition: "background 200ms ease" }}>
      <Navbar
        showMenuBtn={showSidebar}
        onMenuClick={() => setSidebarOpen((v) => !v)}
        chatOpen={chatOpen}
        onChatToggle={() => setChatOpen((v) => !v)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {showSidebar && (
        <Sidebar
          category={activeCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

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
        <div className={showSidebar ? "md:ml-[272px]" : ""}>
          {children}
        </div>
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
