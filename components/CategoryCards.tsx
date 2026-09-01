"use client";

import Link from "next/link";
import { Cpu, Code2, FileCode, Layers, Database, Zap, ArrowRight } from "lucide-react";
import { categories } from "../data/categories";
import { allNotes } from "../data";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Code2, FileCode, Layers, Database, Zap,
};

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const noteCount = allNotes.filter((n) => n.category === cat.slug).length;

        return (
          <Link
            key={cat.slug}
            href={`/notes/${cat.slug}`}
            className="group category-card block rounded-xl p-5 border"
            style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}
          >
            {/* Icon */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 border"
              style={{ background: "var(--bg-surface-2)", borderColor: "var(--border)" }}
            >
              <Icon size={16} style={{ color: "var(--accent-1)" }} />
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
              <span
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
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
