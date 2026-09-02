import { notFound } from "next/navigation";
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
    <NoteFilter
      notes={notes}
      catSlug={cat.slug}
      catLabel={cat.fullName ?? cat.label}
    />
  );
}
