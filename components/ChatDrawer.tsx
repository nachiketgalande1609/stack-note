"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Bot, RotateCcw, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  maximized: boolean;
  onMaximize: () => void;
  fullScreen: boolean;
  onFullScreen: () => void;
}

export const PANEL_WIDTH = 360;
export const PANEL_WIDTH_MAX = 600;

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  const renderText = (text: string) => {
    const codeBlockRegex = /```[\w]*\n?([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;

    while ((m = codeBlockRegex.exec(text)) !== null) {
      if (m.index > last) parts.push(renderInline(text.slice(last, m.index), key++));
      parts.push(
        <pre key={key++}
          className="mt-2 mb-2 p-3 rounded-lg overflow-x-auto text-xs font-mono"
          style={{ background: "var(--code-bg)", color: "#a8d8a8", border: "1px solid var(--border)" }}>
          {m[1].trim()}
        </pre>
      );
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(renderInline(text.slice(last), key++));
    return parts;
  };

  const renderInline = (text: string, baseKey: number) => {
    const segments = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <span key={baseKey}>
        {segments.map((s, i) => {
          if (s.startsWith("**") && s.endsWith("**"))
            return <strong key={i} style={{ color: "var(--accent-2)", fontWeight: 600 }}>{s.slice(2, -2)}</strong>;
          if (s.startsWith("`") && s.endsWith("`"))
            return <code key={i} className="px-1 py-0.5 rounded text-xs font-mono"
              style={{ background: "var(--bg-surface-2)", color: "var(--accent-1)" }}>{s.slice(1, -1)}</code>;
          return <span key={i}>{s.split("\n").map((line, li, arr) =>
            li < arr.length - 1 ? [line, <br key={li} />] : line
          )}</span>;
        })}
      </span>
    );
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
          style={{ background: "var(--accent-1)" }}>
          <Bot size={11} style={{ color: "var(--accent-icon-text)" }} />
        </div>
      )}
      <div
        className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
        style={isUser
          ? { background: "var(--accent-1)", color: "var(--accent-icon-text)", borderBottomRightRadius: 4 }
          : { background: "var(--bg-surface-2)", color: "var(--text-primary)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }
        }
      >
        {renderText(msg.text)}
      </div>
    </div>
  );
}

export default function ChatDrawer({ isOpen, onClose, maximized, onMaximize, fullScreen, onFullScreen }: Props) {
  const panelWidth = maximized ? PANEL_WIDTH_MAX : PANEL_WIDTH;
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const category = pathname.match(/^\/notes\/([^/#]+)/)?.[1] ?? null;

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role === "user" ? "user" : "model", text: m.text })),
          category,
        }),
      });
      const data = await res.json() as { text?: string; error?: string };
      setMessages((prev) => [...prev, { role: "assistant", text: data.text ?? data.error ?? "Something went wrong." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Failed to reach the server." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, category]);

  return (
    <div
      className="fixed top-14 bottom-0 flex flex-col border-l"
      style={{
        zIndex: fullScreen ? 50 : 30,
        right: 0,
        width: fullScreen ? "100vw" : panelWidth,
        background: "var(--bg-surface)",
        borderColor: "var(--border)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 260ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-11 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <Bot size={14} style={{ color: "var(--accent-1)" }} />
          <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
            Ask AI
          </span>
          {category && (
            <span className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ background: "rgba(0,255,65,0.1)", color: "var(--accent-1)", border: "1px solid rgba(0,255,65,0.18)" }}>
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {messages.length > 0 && (
            <button onClick={() => setMessages([])}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:opacity-60 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
              title="Clear conversation">
              <RotateCcw size={12} />
            </button>
          )}
          <button onClick={onFullScreen}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:opacity-60 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
            title={fullScreen ? "Exit full screen" : "Full screen"}>
            {fullScreen ? <Minimize size={12} /> : <Maximize size={12} />}
          </button>
          {!fullScreen && (
            <button onClick={onMaximize}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:opacity-60 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
              title={maximized ? "Collapse panel" : "Expand panel"}>
              {maximized
                ? <span className="flex items-center" style={{ gap: 0 }}><ChevronRight size={12} strokeWidth={2.5} /><ChevronLeft size={12} strokeWidth={2.5} /></span>
                : <span className="flex items-center" style={{ gap: 0 }}><ChevronLeft size={12} strokeWidth={2.5} /><ChevronRight size={12} strokeWidth={2.5} /></span>
              }
            </button>
          )}
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:opacity-60 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
            title="Close">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-2 px-4">
            <Bot size={24} style={{ color: "var(--accent-1)", opacity: 0.6 }} />
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Ask anything about{" "}
              {category
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : "programming"}
            </p>
          </div>
        )}
        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
              style={{ background: "var(--accent-1)" }}>
              <Bot size={11} style={{ color: "var(--accent-icon-text)" }} />
            </div>
            <div className="rounded-2xl px-4 py-2.5 flex items-center gap-1.5"
              style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }}>
              {[0,1,2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: "var(--accent-1)", animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-3 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
          }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Ask a question…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)", fontFamily: "Inter, sans-serif" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="flex items-center justify-center w-6 h-6 flex-shrink-0 transition-all"
            style={{
              background: input.trim() && !loading ? "var(--accent-1)" : "transparent",
              opacity: input.trim() && !loading ? 1 : 0.3,
              borderRadius: 6,
            }}
          >
            <Send size={11} style={{ color: input.trim() && !loading ? "var(--accent-icon-text)" : "var(--text-secondary)" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

