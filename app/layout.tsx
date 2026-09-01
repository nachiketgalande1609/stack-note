import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "StackNote — Your developer knowledge base",
  description: "Concise, code-first notes on Python, JavaScript, React, MySQL, and AI for developers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* Runs before hydration — reads localStorage and sets data-theme so returning
            dark-mode users never see a flash of light on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sn-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
