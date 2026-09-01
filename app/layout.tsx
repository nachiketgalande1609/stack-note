import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "StackNote — Your developer knowledge base",
  description: "Concise, code-first notes on Python, JavaScript, React, MySQL, and AI for developers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
