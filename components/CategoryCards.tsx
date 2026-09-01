"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiPython, SiJavascript, SiReact, SiMysql, SiFastapi } from "react-icons/si";
import { TbBrain } from "react-icons/tb";
import { categories } from "../data/categories";
import { allNotes } from "../data";

const iconMap: Record<string, React.ElementType> = {
  ai:         TbBrain,
  python:     SiPython,
  javascript: SiJavascript,
  react:      SiReact,
  mysql:      SiMysql,
  fastapi:    SiFastapi,
};

// Official brand colours shown inside the icon badge
const iconColour: Record<string, string> = {
  ai:         "#a78bfa",   // purple-ish for AI/brain
  python:     "#3b82f6",   // Python blue
  javascript: "#eab308",   // JS yellow
  react:      "#38bdf8",   // React cyan
  mysql:      "#f97316",   // MySQL orange
  fastapi:    "#22c55e",   // FastAPI green
};

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const colour = iconColour[cat.icon] ?? "var(--accent-1)";
        const noteCount = allNotes.filter((n) => n.category === cat.slug).length;

        return (
          <Link
            key={cat.slug}
            href={`/notes/${cat.slug}`}
            className="group category-card block rounded-xl p-5 border"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            {/* Icon badge */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 border"
              style={{ background: "var(--bg-surface-2)", borderColor: "var(--border)" }}
            >
              <Icon size={18} style={{ color: colour }} />
            </div>

            {/* Label */}
            <h3
              className="text-sm font-bold mb-1.5 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}
            >
              {cat.label}
            </h3>

            {/* Description */}
            <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
              {cat.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                {String(noteCount).padStart(2, "0")} notes
              </span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                style={{ color: "var(--accent-1)" }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
