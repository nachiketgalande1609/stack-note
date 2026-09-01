import { NextRequest, NextResponse } from "next/server";

const BASE_SYSTEM_PROMPT = `You are a helpful coding assistant embedded in StackNote, a developer knowledge base for working developers. You help users understand concepts, debug code, and answer practical questions about programming.

Topics covered in StackNote: AI/ML, Python, JavaScript, React, MySQL.

Guidelines:
- Be concise and direct — 2-5 sentences for concept questions, more for code
- Use code examples when they add clarity (use markdown code blocks)
- Focus on practical, production-ready explanations
- If the user mentions they're learning a specific topic, focus there
- If asked about something outside programming/tech, politely redirect`;

function buildSystemPrompt(category?: string) {
  if (!category) return BASE_SYSTEM_PROMPT;
  const focus: Record<string, string> = {
    ai: "The user is currently reading about AI and machine learning concepts (LLMs, RAG, agents, embeddings, etc.).",
    python: "The user is currently learning Python.",
    javascript: "The user is currently learning JavaScript.",
    react: "The user is currently learning React.",
    mysql: "The user is currently learning MySQL and databases.",
  };
  const hint = focus[category] ?? "";
  return `${BASE_SYSTEM_PROMPT}\n\nContext: ${hint} Prioritize answers relevant to this topic when the question is ambiguous.`;
}

export async function POST(req: NextRequest) {
  const { message, history, category } = (await req.json()) as {
    message: string;
    history: { role: string; text: string }[];
    category?: string;
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const systemPrompt = buildSystemPrompt(category);

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Got it. I'm ready to help with coding questions." }] },
    ...(history ?? []).map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      error?: { message: string };
    };

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't generate a response.";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Failed to reach Gemini API" }, { status: 500 });
  }
}
