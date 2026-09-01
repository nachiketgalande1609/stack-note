export interface Category {
  slug: string;
  label: string;
  fullName?: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "ai",
    label: "AI",
    fullName: "Artificial Intelligence",
    description: "Machine learning, LLMs, agents, RAG, and the full AI developer stack",
    icon: "ai",
    color: "blue",
  },
  {
    slug: "python",
    label: "Python",
    description: "Language fundamentals, data structures, async, and ecosystem essentials",
    icon: "python",
    color: "yellow",
  },
  {
    slug: "javascript",
    label: "JavaScript",
    description: "Core JS, async patterns, the event loop, and modern ES features",
    icon: "javascript",
    color: "orange",
  },
  {
    slug: "react",
    label: "React",
    description: "Components, hooks, state management, and React performance patterns",
    icon: "react",
    color: "cyan",
  },
  {
    slug: "mysql",
    label: "MySQL",
    description: "Queries, indexing, transactions, and schema design best practices",
    icon: "mysql",
    color: "teal",
  },
  {
    slug: "fastapi",
    label: "FastAPI",
    description: "Building high-performance Python APIs with FastAPI, Pydantic, and async patterns",
    icon: "fastapi",
    color: "green",
  },
];
