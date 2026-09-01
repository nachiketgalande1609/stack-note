"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { createHighlighter, type Highlighter } from "shiki";

// ── Singleton Shiki highlighter ──────────────────────────────────────────────
let _hl: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!_hl) {
    _hl = createHighlighter({
      themes: ["tokyo-night"],
      langs: [
        "javascript", "typescript", "jsx", "tsx",
        "python", "sql", "bash", "sh",
        "json", "html", "css", "text",
      ],
    });
  }
  return _hl;
}

// ── CodeBlock ────────────────────────────────────────────────────────────────
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>("");

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((hl) => {
      if (cancelled) return;
      const safeLang = hl.getLoadedLanguages().includes(lang as never) ? lang! : "text";
      try {
        const highlighted = hl.codeToHtml(code, { lang: safeLang, theme: "tokyo-night" });
        setHtml(highlighted);
      } catch {
        // leave html empty → fallback to plain rendering
      }
    });
    return () => { cancelled = true; };
  }, [code, lang]);

  return (
    <div
      className="relative rounded-lg my-5 overflow-hidden"
      style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b text-xs font-mono"
        style={{ background: "var(--code-bar)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
      >
        <span>{lang ?? "code"}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2 py-1 rounded transition-colors"
          style={{ color: copied ? "var(--accent-1)" : "var(--text-secondary)", background: "var(--bg-surface-2)" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code area */}
      {html ? (
        <div className="sn-shiki" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre
          className="p-4 overflow-x-auto text-sm leading-relaxed"
          style={{ color: "#a8d8a8", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

// ── Inline text helpers ───────────────────────────────────────────────────────
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: "color-mix(in srgb, var(--accent-1) 25%, transparent)", color: "inherit", borderRadius: 2 }}>
            {part}
          </mark>
        ) : part
      )}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MarkdownContent({ content, highlight = "" }: { content: string; highlight?: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  function inline(text: string): React.ReactNode {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pi} className="sn-bold" style={{ fontWeight: 600 }}>
            {highlightText(part.slice(2, -2), highlight)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={pi} className="sn-inline-code px-1.5 py-0.5 rounded text-[0.85em] font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={pi} style={{ color: "var(--text-secondary)" }}>{highlightText(part.slice(1, -1), highlight)}</em>;
      }
      return highlightText(part, highlight);
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(<CodeBlock key={key++} code={codeLines.join("\n")} lang={lang} />);
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="sn-prose-heading text-xl font-bold mt-10 mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
          {inline(line.slice(3))}
        </h2>
      );
      i++; continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="sn-prose-heading text-base font-semibold mt-7 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {inline(line.slice(4))}
        </h3>
      );
      i++; continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-| ]+\|$/));
      const headerRow = rows[0];
      const bodyRows  = rows.slice(1);
      elements.push(
        <div key={key++} className="overflow-x-auto my-5 rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: `1px solid var(--border)`, background: "var(--bg-surface-2)" }}>
                {headerRow.split("|").filter(Boolean).map((cell, ci) => (
                  <th key={ci} className="px-4 py-2.5 text-left sn-prose-heading"
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                    {inline(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid var(--border)` }}>
                  {row.split("|").filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-left sn-prose-body"
                      style={{ fontWeight: 400, fontSize: "0.875rem" }}>
                      {inline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="sn-prose-body flex gap-3 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ background: "var(--accent-1)" }} />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    elements.push(
      <p key={key++} className="sn-prose-body text-sm leading-relaxed mb-4" style={{ maxWidth: "70ch", lineHeight: "1.8" }}>
        {inline(line)}
      </p>
    );
    i++;
  }

  return <div className="mt-2">{elements}</div>;
}
