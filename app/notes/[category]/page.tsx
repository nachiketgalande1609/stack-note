import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "../../../data/categories";
import { getNotesByCategory } from "../../../data";
import NoteFilter from "../../../components/NoteFilter";

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
          {cat.fullName ?? cat.label}
        </h1>
      </div>

      <NoteFilter notes={notes} />

      {/* Footer */}
      <p className="mt-8 text-center text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}>← back to home</Link>
      </p>
    </div>
  );
}
