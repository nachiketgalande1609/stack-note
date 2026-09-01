import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { data, error } = await getSupabase()
    .from("comments")
    .select("id, content, created_at")
    .eq("note_slug", slug)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { slug?: string; content?: string };
  const { slug, content } = body;

  if (!slug || !content?.trim()) {
    return NextResponse.json({ error: "Missing slug or content" }, { status: 400 });
  }

  if (content.trim().length > 1000) {
    return NextResponse.json({ error: "Comment too long (max 1000 chars)" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("comments")
    .insert({ note_slug: slug, content: content.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
