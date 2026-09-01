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
    icon: "Cpu",
    color: "blue",
  },
  {
    slug: "python",
    label: "Python",
    description: "Language fundamentals, data structures, async, and ecosystem essentials",
    icon: "Code2",
    color: "yellow",
  },
  {
    slug: "javascript",
    label: "JavaScript",
    description: "Core JS, async patterns, the event loop, and modern ES features",
    icon: "FileCode",
    color: "orange",
  },
  {
    slug: "react",
    label: "React",
    description: "Components, hooks, state management, and React performance patterns",
    icon: "Layers",
    color: "cyan",
  },
  {
    slug: "mysql",
    label: "MySQL",
    description: "Queries, indexing, transactions, and schema design best practices",
    icon: "Database",
    color: "teal",
  },
];
