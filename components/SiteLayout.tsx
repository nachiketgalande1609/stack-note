"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Extract category from /notes/[category] or /notes/[category]/[slug]
  const match = pathname.match(/^\/notes\/([^/]+)/);
  const activeCategory = match ? match[1] : null;
  const showSidebar = activeCategory !== null;

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", transition: "background 200ms ease" }}>
      <Navbar
        showMenuBtn={showSidebar}
        onMenuClick={() => setSidebarOpen((v) => !v)}
      />

      {showSidebar && (
        <Sidebar
          category={activeCategory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <main
        className="pt-14 min-h-screen"
        style={{
          marginLeft: showSidebar ? undefined : 0,
          color: "var(--text-primary)",
          transition: "color 200ms ease",
        }}
      >
        {/* On md+ screens, offset content when sidebar is shown */}
        <div className={showSidebar ? "md:ml-[272px]" : ""}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
  );
}
