import aiNotes from "./notes/ai";
import pythonNotes from "./notes/python";
import javascriptNotes from "./notes/javascript";
import reactNotes from "./notes/react";
import mysqlNotes from "./notes/mysql";
import fastapiNotes from "./notes/fastapi";
import { Note } from "./types";

export type { Note };

export const allNotes: Note[] = [
  ...aiNotes,
  ...pythonNotes,
  ...javascriptNotes,
  ...reactNotes,
  ...mysqlNotes,
  ...fastapiNotes,
];

export function getNotesByCategory(category: string): Note[] {
  return allNotes.filter((n) => n.category === category);
}

export function getNote(category: string, slug: string): Note | undefined {
  return allNotes.find((n) => n.category === category && n.slug === slug);
}
