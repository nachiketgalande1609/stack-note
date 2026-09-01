import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Hash } from "lucide-react";
import { categories } from "../data/categories";
import { allNotes } from "../data";
import CategoryCards from "../components/CategoryCards";

export default function HomePage() {
  const totalNotes = allNotes.length;
  const totalCategories = categories.length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Hero */}
      <div className="mb-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--accent-1)" }}
          >
            &gt; developer_knowledge_base
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent-1)" }}
          />
        </div>

        <h1
          className="text-5xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
        >
          Stack
          <span style={{ color: "var(--accent-1)" }}>Note</span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-xl mb-10" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
          Concept-first technical notes on Python, JavaScript, React, MySQL, and AI.
          Written for developers who want precision without noise.
        </p>

        {/* Stats row */}
        <div
          className="inline-flex items-center gap-0 rounded-lg border overflow-hidden text-sm font-mono"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { icon: BookOpen, label: `${totalNotes} notes` },
            { icon: Hash, label: `${totalCategories} categories` },
            { icon: Zap, label: "Always expanding" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 border-r last:border-r-0"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              <Icon size={13} style={{ color: "var(--accent-1)" }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs" style={{ color: "var(--accent-1)" }}>01</span>
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            Browse by category
          </h2>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        <CategoryCards />
      </div>

      {/* Featured AI */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs" style={{ color: "var(--accent-1)" }}>02</span>
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            Featured
          </h2>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div
          className="rounded-xl p-8 border relative overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border-strong)",
            boxShadow: "var(--glow)",
          }}
        >
          {/* Decorative corner accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(0,255,65,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative">
            <div>
              <div
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--accent-1)" }}
              >
                22 concepts · zero math
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
              >
                The AI Handbook
              </h3>
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
                A concept-first tour of modern AI for full-stack developers. LLMs, RAG,
                agents, embeddings, fine-tuning, safety — all the mental models you need
                to build and reason about AI-powered products.
              </p>
            </div>
            <Link
              href="/notes/ai"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-mono hover:opacity-85 transition-opacity"
              style={{
                background: "var(--accent-1)",
                color: "#000",
                boxShadow: "0 0 20px rgba(0,255,65,0.25)",
              }}
            >
              Read now
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
