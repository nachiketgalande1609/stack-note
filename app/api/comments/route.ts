import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { data, error } = await getSupabase()
    .from("comments")
    .select("id, content, user_name, created_at")
    .eq("note_slug", slug)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { slug?: string; content?: string; user_name?: string | null };
  const { slug, content, user_name } = body;

  if (!slug || !content?.trim()) {
    return NextResponse.json({ error: "Missing slug or content" }, { status: 400 });
  }

  if (content.trim().length > 1000) {
    return NextResponse.json({ error: "Comment too long (max 1000 chars)" }, { status: 400 });
  }

  const row: Record<string, string | null> = { note_slug: slug, content: content.trim() };
  if (user_name) row.user_name = user_name;

  const { data, error } = await getSupabase()
    .from("comments")
    .insert(row)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
