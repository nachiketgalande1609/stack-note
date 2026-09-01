"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg my-5 overflow-hidden"
      style={{ background: "var(--code-bg)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between px-4 py-2 border-b text-xs font-mono"
        style={{ background: "var(--code-bar)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
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
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed"
        style={{ color: "#a8d8a8", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MarkdownContent({ content }: { content: string }) {
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
            {part.slice(2, -2)}
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
        return <em key={pi} style={{ color: "var(--text-secondary)" }}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
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
      elements.push(
        <div key={key++} className="overflow-x-auto my-5 rounded-lg border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm border-collapse">
            {rows.map((row, ri) => {
              const cells = row.split("|").filter(Boolean).map((c) => c.trim());
              const Tag = ri === 0 ? "th" : "td";
              return (
                <tr key={ri} style={{ borderBottom: `1px solid var(--border)`, background: ri === 0 ? "var(--bg-surface-2)" : "transparent" }}>
                  {cells.map((cell, ci) => (
                    <Tag key={ci} className={`px-4 py-2.5 text-left ${ri === 0 ? "sn-prose-heading" : "sn-prose-body"}`}
                      style={{ fontWeight: ri === 0 ? 600 : 400, fontSize: "0.875rem" }}>
                      {cell}
                    </Tag>
                  ))}
                </tr>
              );
            })}
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
