import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "react-hooks",
    title: "Core Hooks",
    description: "useState, useEffect, useRef, and useCallback — when and why to use each.",
    category: "react",
    content: `## Core React Hooks

### useState

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`\`\`tsx
useEffect(() => {
  document.title = \`Count: \${count}\`;
  return () => { /* cleanup */ };
}, [count]); // runs when count changes
\`\`\`

### useRef

\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current?.focus();
\`\`\`

### useCallback

\`\`\`tsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // stable reference unless id changes
\`\`\`

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "react-state-management",
    title: "State Management",
    description: "Local state, Context, Zustand, and when each pattern fits.",
    category: "react",
    content: `## React State Management

### Local State — \`useState\`

For UI state within a single component.

### Context API

For sharing state across a subtree without prop drilling.

\`\`\`tsx
const ThemeContext = createContext<"light" | "dark">("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}
\`\`\`

### Zustand (external store)

\`\`\`tsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
\`\`\`

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "react-performance",
    title: "Performance Patterns",
    description: "Memoization, code splitting, and avoiding unnecessary renders.",
    category: "react",
    content: `## React Performance Patterns

### React.memo

Prevents a component from re-rendering when its props haven't changed.

\`\`\`tsx
const Card = React.memo(({ title }: { title: string }) => (
  <div>{title}</div>
));
\`\`\`

### useMemo

\`\`\`tsx
const sorted = useMemo(
  () => items.toSorted((a, b) => a.name.localeCompare(b.name)),
  [items]
);
\`\`\`

### Lazy + Suspense

\`\`\`tsx
const HeavyChart = lazy(() => import("./HeavyChart"));

<Suspense fallback={<Spinner />}>
  <HeavyChart />
</Suspense>
\`\`\`

Content coming soon — this is a placeholder.`,
  },
];

export default notes;
