import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "../../../data/categories";
import { getNotesByCategory } from "../../../data";
import MarkdownContent from "../../../components/MarkdownContent";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.label} Notes — StackNote` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const notes = getNotesByCategory(category);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Category header */}
      <div className="mb-10">
        <Link href="/" className="text-xs font-mono mb-4 inline-block hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}>
          ← StackNote
        </Link>
        <h1 className="text-4xl font-bold mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
          {cat.label}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {notes.length} notes · scroll to read all
        </p>
      </div>

      {/* Stacked note cards */}
      <div className="space-y-6">
        {notes.map((note, i) => (
          <div
            key={note.slug}
            id={note.slug}
            className="rounded-2xl border p-8"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--glow)",
              scrollMarginTop: "72px",
            }}
          >
            {/* Badge + Title */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold font-mono flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg,var(--accent-1),var(--accent-2))",
                  color: "var(--accent-icon-text)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-bold leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)" }}>
                {note.title}
              </h2>
            </div>

            <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-secondary)" }}>
              {note.description}
            </p>

            <div className="h-px mb-7"
              style={{ background: "linear-gradient(90deg,var(--border-strong),transparent)" }} />

            <MarkdownContent content={note.content.replace(/^##\s+[^\n]+\n?/, "")} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        {notes.length} notes in {cat.label} · <Link href="/" className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}>back to home</Link>
      </p>
    </div>
  );
}
