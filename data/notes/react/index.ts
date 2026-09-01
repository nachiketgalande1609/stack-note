import { Note } from "../../types";

const notes: Note[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. React at a Glance
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-overview",
    title: "React at a Glance",
    description: "What React is, how the virtual DOM works, and the mental model behind component-driven UIs.",
    category: "react",
    content: `## React at a Glance

React is a JavaScript library for building user interfaces. It was created by Meta (Facebook) and solves one core problem: **keeping the UI in sync with data over time**. Traditional DOM manipulation meant manually finding elements and updating them — React makes the UI a pure function of state.

### The Core Idea

Think of your UI as a description, not a set of instructions. Instead of saying "find that button and change its color," you say "if this condition is true, the button is blue." React figures out what DOM changes are needed.

\`\`\`jsx
// Declarative — describe WHAT you want
function Counter({ count }) {
  return <button>{count} clicks</button>;
}

// React handles HOW the DOM updates
\`\`\`

### Virtual DOM & Reconciliation

React keeps an in-memory copy of the DOM called the **Virtual DOM**. When state changes:

1. React builds a new Virtual DOM tree
2. It **diffs** the new tree against the previous one (reconciliation)
3. It batches only the minimal real DOM changes needed

This is faster than naive full-page re-renders and simpler than manual DOM surgery.

### One-Way Data Flow

Data flows **down** through props, events flow **up** through callbacks. This makes it easy to trace where data comes from and where changes happen.

\`\`\`jsx
// Parent owns the state, child just renders + reports events
function Parent() {
  const [name, setName] = useState("");
  return <Input value={name} onChange={setName} />;
}

function Input({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
\`\`\`

### Key Concepts at a Glance

| Concept | What it is |
|---|---|
| **Component** | A function that takes props and returns JSX |
| **State** | Local data that triggers a re-render when it changes |
| **Props** | Read-only data passed from parent to child |
| **Effect** | Side-effect that runs after render (data fetch, subscriptions) |
| **Hook** | A function that lets you use React features inside components |
| **Reconciliation** | React's process of diffing and patching the DOM |

### React vs. the Alternatives

| | React | Vue | Angular |
|---|---|---|---|
| **Type** | Library (view only) | Framework (progressive) | Full framework |
| **Learning curve** | Medium | Low | High |
| **Data binding** | One-way | Two-way | Two-way |
| **Templating** | JSX (JS) | Templates + directives | Templates + decorators |
| **Ecosystem** | You choose | Batteries included | Batteries included |

React intentionally does less — it handles only the view layer, leaving routing, data fetching, and state management to libraries you pick.`,
  },

  // ─────────────────────────────────────────────────────────────
  // 2. JSX & Components
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-jsx-components",
    title: "JSX & Components",
    description: "JSX syntax rules, functional components, props, children, and how to compose components together.",
    category: "react",
    content: `## JSX & Components

### What is JSX?

JSX looks like HTML inside JavaScript but it isn't. It's syntactic sugar that compiles to \`React.createElement\` calls. This means JSX is just JavaScript — you can use any JS expression inside \`{}\`.

\`\`\`jsx
// JSX
const el = <h1 className="title">Hello, {name}!</h1>;

// What it compiles to
const el = React.createElement("h1", { className: "title" }, "Hello, ", name, "!");
\`\`\`

### JSX Rules

| Rule | Why |
|---|---|
| One root element per return | JSX compiles to a single function call |
| Use \`<></>\` (Fragment) to avoid an extra \`<div>\` | Keeps DOM clean |
| \`className\` not \`class\` | \`class\` is a reserved JS keyword |
| \`htmlFor\` not \`for\` | Same reason |
| Self-close empty tags: \`<img />\` | Required in JSX |
| Expressions in \`{}\`, not statements | \`{count + 1}\` ✓, \`{if ...}\` ✗ |

### Functional Components

A component is just a function that takes props and returns JSX. Component names **must start with a capital letter** — React uses this to tell DOM tags (\`<div>\`) apart from components (\`<Card>\`).

\`\`\`jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Usage
<Greeting name="Alice" age={30} />
\`\`\`

### Props

Props are read-only inputs passed from parent to child. You can pass any JS value: strings, numbers, booleans, objects, arrays, functions, even other components.

\`\`\`jsx
<Button
  label="Submit"
  disabled={isLoading}
  onClick={handleSubmit}
  icon={<CheckIcon />}
/>
\`\`\`

### The \`children\` Prop

Anything placed between opening and closing tags becomes \`props.children\`. This is how you build wrapper/container components.

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Usage
<Card title="Profile">
  <Avatar />
  <p>Alice, Product Designer</p>
</Card>
\`\`\`

### Default Props & Optional Props

\`\`\`tsx
// TypeScript: mark optional with ?
interface ButtonProps {
  label: string;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}

function Button({ label, variant = "primary", disabled = false }: ButtonProps) {
  return (
    <button className={variant} disabled={disabled}>
      {label}
    </button>
  );
}
\`\`\`

### Rendering Lists

Always provide a \`key\` prop when rendering arrays. Keys help React identify which items changed, were added, or removed. Use a stable unique ID — not the array index if the list can reorder.

\`\`\`jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Conditional Rendering

\`\`\`jsx
function Alert({ message, type }) {
  if (!message) return null;               // render nothing

  return (
    <div className={type}>
      {type === "error" && <ErrorIcon />}   // short-circuit
      {type === "warn" ? "⚠️" : "ℹ️"}      // ternary
      {message}
    </div>
  );
}
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 3. useState & useEffect
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-state-effects",
    title: "useState & useEffect",
    description: "Managing local state and running side effects — the two hooks you use in almost every component.",
    category: "react",
    content: `## useState & useEffect

### useState — Local Component State

\`useState\` returns a value and a setter. Every call to the setter triggers a re-render with the new value. React state is **immutable** — you never mutate the current value directly, you always replace it.

\`\`\`tsx
const [count, setCount] = useState(0);         // initial value
const [user, setUser]   = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// Update
setCount(count + 1);                           // direct value
setCount(prev => prev + 1);                    // functional update (safe with async)
\`\`\`

**Use the functional update form** when the new state depends on the old state — otherwise stale closures can cause bugs in event handlers and async code.

### Updating Objects and Arrays

State must be replaced, not mutated. Mutating the existing object or array won't trigger a re-render.

\`\`\`tsx
// ✗ Wrong — mutates existing state
user.name = "Alice";
setUser(user);

// ✓ Correct — new object
setUser({ ...user, name: "Alice" });

// ✗ Wrong — mutates array
items.push("new item");
setItems(items);

// ✓ Correct — new array
setItems([...items, "new item"]);
setItems(items.filter(i => i !== "remove me"));
setItems(items.map(i => i === old ? updated : i));
\`\`\`

### Lazy Initializer

If computing the initial state is expensive, pass a function instead of a value. React calls it only once.

\`\`\`tsx
// Called on every render (bad if expensive)
const [data, setData] = useState(expensiveCompute());

// Called only once on mount (correct)
const [data, setData] = useState(() => expensiveCompute());
\`\`\`

### useEffect — Side Effects After Render

\`useEffect\` runs **after** the browser paints. Use it for anything that's not pure rendering: data fetching, subscriptions, timers, DOM manipulation.

\`\`\`tsx
useEffect(() => {
  // Effect body — runs after render
  document.title = \`\${count} items\`;

  return () => {
    // Cleanup — runs before next effect OR on unmount
    document.title = "App";
  };
}, [count]); // Dependency array — re-run only when count changes
\`\`\`

### Dependency Array Rules

| Array | Behaviour |
|---|---|
| Omitted | Runs after **every** render |
| \`[]\` | Runs only on **mount** (and cleanup on unmount) |
| \`[a, b]\` | Runs when \`a\` or \`b\` changes |

**Every value used inside the effect that can change must be in the dependency array.** ESLint's \`exhaustive-deps\` rule enforces this automatically.

### Data Fetching Pattern

\`\`\`tsx
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  useEffect(() => {
    let cancelled = false;          // prevent setting state after unmount
    setLoading(true);

    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setUser(data); })
      .catch(e  => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [userId]);

  if (loading) return <Spinner />;
  if (error)   return <p>{error}</p>;
  return <div>{user?.name}</div>;
}
\`\`\`

The \`cancelled\` flag pattern prevents a race condition where a fast response for a new \`userId\` arrives after a slow response for the old one.`,
  },

  // ─────────────────────────────────────────────────────────────
  // 4. useRef, useMemo, useCallback
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-refs-memo",
    title: "useRef, useMemo & useCallback",
    description: "Accessing DOM nodes with refs, memoizing expensive values, and stabilizing function references.",
    category: "react",
    content: `## useRef, useMemo & useCallback

### useRef — Mutable Values Without Re-renders

\`useRef\` returns a mutable object with a \`.current\` property. Unlike state, changing \`.current\` does **not** trigger a re-render. It has two main uses:

**1. Accessing DOM elements directly**

\`\`\`tsx
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
\`\`\`

**2. Storing values that persist across renders without causing re-renders**

\`\`\`tsx
function Timer() {
  const intervalId = useRef<number | null>(null);

  function start() {
    intervalId.current = window.setInterval(() => tick(), 1000);
  }

  function stop() {
    if (intervalId.current) clearInterval(intervalId.current);
  }
}
\`\`\`

### useMemo — Memoize Expensive Computations

\`useMemo\` caches the result of a function and only recomputes it when dependencies change. Use it when a calculation is genuinely expensive — sorting/filtering large arrays, complex math, heavy transforms.

\`\`\`tsx
function ProductList({ products, query, minPrice }) {
  // Without useMemo: re-runs filter + sort on every render
  // With useMemo: only re-runs when products, query, or minPrice changes
  const filtered = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .filter(p => p.price >= minPrice)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, query, minPrice]);

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
\`\`\`

**Don't over-use useMemo.** It has its own overhead (storing the cache, comparing deps). Only reach for it when a profiler shows a real bottleneck.

### useCallback — Stabilize Function References

In JavaScript, a function defined inside a component is recreated on every render — it's a new object each time. This matters when you pass a function to a child wrapped in \`React.memo\`, because the new reference breaks memoization.

\`useCallback\` returns the same function reference across renders as long as dependencies haven't changed.

\`\`\`tsx
function Parent({ userId }) {
  const [items, setItems] = useState([]);

  // New function every render → breaks React.memo on ItemList
  const handleDelete = (id) => setItems(prev => prev.filter(i => i.id !== id));

  // Stable function → React.memo works as expected
  const handleDelete = useCallback(
    (id: string) => setItems(prev => prev.filter(i => i.id !== id)),
    []  // no deps — setItems setter is stable
  );

  return <ItemList items={items} onDelete={handleDelete} />;
}

const ItemList = React.memo(({ items, onDelete }) => {
  // Only re-renders when items or onDelete reference changes
  return items.map(i => <Item key={i.id} item={i} onDelete={onDelete} />);
});
\`\`\`

### Comparison

| Hook | Stores | Triggers re-render | Use when |
|---|---|---|---|
| \`useState\` | Values | Yes | Data that drives the UI |
| \`useRef\` | Mutable values / DOM nodes | No | Timers, IDs, DOM access |
| \`useMemo\` | Computed result | No | Expensive derived values |
| \`useCallback\` | Function reference | No | Stable props for memoized children |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Context API & useContext
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-context",
    title: "Context API & useContext",
    description: "Sharing state across a component tree without prop drilling — when to use Context and when not to.",
    category: "react",
    content: `## Context API & useContext

### The Problem: Prop Drilling

When a piece of state is needed deep in the component tree, you'd normally pass it through every intermediate component as props — even ones that don't use it. This is **prop drilling** and it makes refactoring painful.

\`\`\`jsx
// Prop drilling — every layer passes theme down
<App theme="dark">
  <Layout theme="dark">
    <Sidebar theme="dark">
      <NavItem theme="dark" />   {/* finally uses it */}
    </Sidebar>
  </Layout>
</App>
\`\`\`

### Context as a Solution

Context lets you "teleport" a value directly to any component that needs it, skipping the intermediaries.

### Creating and Using Context

**Step 1 — Create the context**

\`\`\`tsx
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  toggle: () => {},
});
\`\`\`

**Step 2 — Provide the value (wrap the subtree)**

\`\`\`tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggle = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

**Step 3 — Consume anywhere in the tree**

\`\`\`tsx
function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button onClick={toggle}>
      Switch to {theme === "light" ? "dark" : "light"}
    </button>
  );
}
\`\`\`

### Custom Hook Pattern

Wrapping \`useContext\` in a custom hook gives you better error messages and a cleaner API:

\`\`\`tsx
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

// Usage
const { theme, toggle } = useTheme();
\`\`\`

### When to Use Context

| Scenario | Recommendation |
|---|---|
| Theme, locale, current user | Context — read frequently, changes rarely |
| Global UI state (toast, modal) | Context |
| Frequently updated state (forms, live data) | Avoid Context — use Zustand or local state |
| State shared by 2-3 nearby components | Just lift state — don't reach for Context |
| Server-fetched data | React Query / SWR, not Context |

### The Performance Gotcha

**Every consumer re-renders whenever the context value changes.** If your context value is an object created inline, it's a new object on every parent render — triggering all consumers.

\`\`\`tsx
// ✗ New object on every render
<Ctx.Provider value={{ user, logout }}>

// ✓ Stable with useMemo
const value = useMemo(() => ({ user, logout }), [user]);
<Ctx.Provider value={value}>
\`\`\`

For high-frequency updates, split one large context into smaller ones so components only re-render when the slice they care about changes.`,
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Custom Hooks
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-custom-hooks",
    title: "Custom Hooks",
    description: "Extracting stateful logic into reusable hooks — the React way to share behaviour without sharing UI.",
    category: "react",
    content: `## Custom Hooks

### Why Custom Hooks?

Before hooks, sharing stateful logic between components required awkward patterns like Higher-Order Components or render props. Custom hooks let you extract any logic that uses React primitives into a plain function starting with \`use\`.

The key rule: **custom hooks must start with \`use\`** so React can enforce the rules of hooks (no conditional calls, no calls outside components).

### A Basic Example: useLocalStorage

\`\`\`tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set] as const;
}

// Usage — behaves just like useState but persists to localStorage
const [theme, setTheme] = useLocalStorage("theme", "light");
\`\`\`

### useDebounce

Debouncing delays a value update until the user has stopped changing it for a given period — perfect for search inputs.

\`\`\`tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// Usage
const [query, setQuery]       = useState("");
const debouncedQuery          = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery) fetchResults(debouncedQuery);
}, [debouncedQuery]);
\`\`\`

### useFetch — Data Fetching

\`\`\`tsx
function useFetch<T>(url: string) {
  const [data, setData]       = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(d  => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data: user, loading, error } = useFetch<User>(\`/api/users/\${id}\`);
\`\`\`

### useWindowSize

\`\`\`tsx
function useWindowSize() {
  const [size, setSize] = useState({
    width:  window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
}
\`\`\`

### Rules of Hooks

| Rule | Reason |
|---|---|
| Only call hooks at the top level | React tracks hooks by call order — branching breaks this |
| Never call hooks inside conditions, loops, or nested functions | Same reason |
| Only call hooks from React functions or other custom hooks | Hooks rely on React's render context |

### Tips for Good Custom Hooks

- Name them clearly after what they do: \`useAuth\`, \`useCart\`, \`useIntersectionObserver\`
- Return a tuple \`[value, setter]\` for useState-like hooks, or a plain object \`{ data, loading, error }\` for more complex ones
- Keep them focused — one concern per hook
- They are just functions — write unit tests for them without any component`,
  },

  // ─────────────────────────────────────────────────────────────
  // 7. useReducer & Complex State
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-reducer",
    title: "useReducer & Complex State",
    description: "Managing multi-field state and state machines with useReducer — when useState becomes unwieldy.",
    category: "react",
    content: `## useReducer & Complex State

### The Problem with Multiple useState Calls

When a component has several related pieces of state that change together, managing them with separate \`useState\` calls leads to bugs. You might forget to update one, or set them in the wrong order.

\`\`\`tsx
// Multiple useState — easy to forget to set them all
const [data, setData]       = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError]     = useState("");
// must remember to update all three consistently on every action
\`\`\`

### useReducer — State Machines in React

\`useReducer\` takes a **reducer function** and an initial state. The reducer receives the current state and an action, and returns the next state. It's the same pattern as Redux, but local to a component.

\`\`\`tsx
type State = {
  data: User | null;
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: User }
  | { type: "FETCH_ERROR";   payload: string };

const initialState: State = { data: null, loading: false, error: "" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { data: null, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: "" };
    case "FETCH_ERROR":
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

function UserCard({ userId }: { userId: string }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    fetchUser(userId)
      .then(user => dispatch({ type: "FETCH_SUCCESS", payload: user }))
      .catch(err  => dispatch({ type: "FETCH_ERROR",   payload: err.message }));
  }, [userId]);

  if (state.loading) return <Spinner />;
  if (state.error)   return <p>{state.error}</p>;
  return <div>{state.data?.name}</div>;
}
\`\`\`

### Shopping Cart Example

\`\`\`tsx
type CartAction =
  | { type: "ADD";    item: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };

function cartReducer(cart: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD":
      const existing = cart.find(i => i.id === action.item.id);
      if (existing) {
        return cart.map(i => i.id === action.item.id
          ? { ...i, qty: i.qty + 1 }
          : i
        );
      }
      return [...cart, { ...action.item, qty: 1 }];
    case "REMOVE":
      return cart.filter(i => i.id !== action.id);
    case "CLEAR":
      return [];
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x{item.qty}
          <button onClick={() => dispatch({ type: "REMOVE", id: item.id })}>Remove</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: "CLEAR" })}>Clear cart</button>
    </div>
  );
}
\`\`\`

### useState vs useReducer

| Situation | Use |
|---|---|
| Simple toggle, counter, string value | \`useState\` |
| Several fields that always change together | \`useReducer\` |
| Next state depends on the current state in a complex way | \`useReducer\` |
| You want to write unit tests for the logic separately | \`useReducer\` (reducer is a pure function) |
| State transitions need to be explicit and traceable | \`useReducer\` |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Component Patterns
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-patterns",
    title: "Component Patterns",
    description: "Composition, compound components, render props, and HOCs — patterns for flexible, reusable UI.",
    category: "react",
    content: `## Component Patterns

### Composition Over Inheritance

React favors **composition** — combining small, focused components — over class inheritance. Instead of a \`SpecialButton extends Button\`, you pass children, render props, or slots.

\`\`\`jsx
// Composition — flexible and readable
function Dialog({ title, children, footer }) {
  return (
    <div className="dialog">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

<Dialog
  title="Confirm Delete"
  footer={<><button>Cancel</button><button>Delete</button></>}
>
  <p>Are you sure you want to delete this item?</p>
</Dialog>
\`\`\`

### Compound Components

Compound components are a set of components that work together with shared implicit state. The parent manages state; children are the UI building blocks. Think \`<select>\` / \`<option>\` in HTML.

\`\`\`tsx
// Accordion with compound components
function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      {children}
    </AccordionContext.Provider>
  );
}

function AccordionItem({ index, title, children }) {
  const { openIndex, setOpenIndex } = useContext(AccordionContext);
  const isOpen = openIndex === index;
  return (
    <div>
      <button onClick={() => setOpenIndex(isOpen ? null : index)}>{title}</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

// Usage reads like HTML
<Accordion>
  <AccordionItem index={0} title="Section 1">Content A</AccordionItem>
  <AccordionItem index={1} title="Section 2">Content B</AccordionItem>
</Accordion>
\`\`\`

### Render Props

A render prop is a function prop that a component calls to determine what to render. It lets a component share its state/logic while delegating the UI to the consumer.

\`\`\`tsx
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <span>Mouse: {x}, {y}</span>} />
\`\`\`

Render props have largely been replaced by custom hooks, which are cleaner for sharing logic. But render props still shine when the consumer needs to control **where** in the JSX the output appears.

### Higher-Order Components (HOC)

A HOC is a function that takes a component and returns a new component with extra behaviour injected.

\`\`\`tsx
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthGuard(props: P) {
    const { user } = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
\`\`\`

HOCs are still common in older codebases and some libraries (e.g. \`connect()\` from Redux). Custom hooks are the modern equivalent for most use cases.

### Pattern Comparison

| Pattern | Best for | Downside |
|---|---|---|
| **Composition / children** | Layout wrappers, slots | Props must be passed explicitly |
| **Compound components** | Related UI that shares state | Requires context wiring |
| **Render props** | Consumer controls rendered output | Verbose, nesting can get deep |
| **HOC** | Cross-cutting concerns (auth, logging) | Prop conflicts, hard to type |
| **Custom hook** | Sharing stateful logic | No control over rendered output |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Forms & Controlled Components
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-forms",
    title: "Forms & Controlled Components",
    description: "Controlled vs uncontrolled inputs, form validation, and handling submissions cleanly.",
    category: "react",
    content: `## Forms & Controlled Components

### Controlled vs Uncontrolled

A **controlled** input stores its value in React state — React is the single source of truth. An **uncontrolled** input stores its value in the DOM, accessed via a ref.

\`\`\`tsx
// Controlled — React owns the value
const [email, setEmail] = useState("");
<input value={email} onChange={e => setEmail(e.target.value)} />

// Uncontrolled — DOM owns the value
const emailRef = useRef<HTMLInputElement>(null);
<input ref={emailRef} defaultValue="" />
// Read at submit: emailRef.current?.value
\`\`\`

| | Controlled | Uncontrolled |
|---|---|---|
| **Source of truth** | React state | DOM |
| **Real-time validation** | Easy | Harder |
| **Immediate access to value** | Yes (from state) | Need to read ref |
| **Form reset** | Set state to default | Call \`form.reset()\` |
| **Best for** | Most cases | File inputs, integrating with non-React libs |

### A Complete Controlled Form

\`\`\`tsx
interface FormData {
  name:     string;
  email:    string;
  message:  string;
}

function ContactForm() {
  const [form, setForm]   = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" })); // clear error on change
  }

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (form.message.length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await sendMessage(form);
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Message
        <textarea name="message" value={form.message} onChange={handleChange} />
        {errors.message && <span className="error">{errors.message}</span>}
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
\`\`\`

### Checkboxes and Selects

\`\`\`tsx
// Checkbox — use checked, not value
const [agreed, setAgreed] = useState(false);
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />

// Select
const [country, setCountry] = useState("us");
<select value={country} onChange={e => setCountry(e.target.value)}>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>
\`\`\`

### React Hook Form (Library)

For complex forms, [React Hook Form](https://react-hook-form.com/) reduces boilerplate significantly by using uncontrolled inputs under the hood:

\`\`\`tsx
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register("email", { required: "Email required", pattern: { value: /\\S+@\\S+/, message: "Invalid email" } })} />
      {errors.email && <p>{errors.email.message as string}</p>}

      <input type="password" {...register("password", { minLength: { value: 8, message: "Min 8 chars" } })} />
      {errors.password && <p>{errors.password.message as string}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Performance Optimization
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-performance",
    title: "Performance Optimization",
    description: "React.memo, memoization, code splitting, Suspense, and how to find real bottlenecks with the profiler.",
    category: "react",
    content: `## Performance Optimization

### Why Re-renders Happen

A component re-renders when:
- Its **state** changes (via \`setState\` or \`dispatch\`)
- Its **parent** re-renders (and passes new prop values)
- Its **context** value changes

Most re-renders are fast and harmless. Optimize only when the profiler shows a real problem — premature optimization adds complexity without benefit.

### React.memo — Skip Re-renders from Parent

\`React.memo\` wraps a component so it only re-renders when its props actually change (shallow equality check).

\`\`\`tsx
const UserCard = React.memo(function UserCard({ user }: { user: User }) {
  return (
    <div>
      <img src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
});
// Re-renders only when user object reference changes
\`\`\`

**Pitfall:** If the parent passes a new object or function on every render, the reference always changes and \`React.memo\` never helps. Combine with \`useMemo\` / \`useCallback\` to stabilize prop references.

\`\`\`tsx
function Parent() {
  const user = useMemo(() => ({ name: "Alice", avatar: url }), [url]); // stable ref
  const handleClick = useCallback(() => navigate(user.id), [user.id]); // stable ref
  return <UserCard user={user} onClick={handleClick} />;
}
\`\`\`

### Code Splitting with lazy & Suspense

\`React.lazy\` defers loading a component's bundle until it's needed. \`Suspense\` shows a fallback while it loads.

\`\`\`tsx
import { lazy, Suspense } from "react";

const HeavyDashboard = lazy(() => import("./HeavyDashboard"));
const AdminPanel      = lazy(() => import("./AdminPanel"));

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<HeavyDashboard />} />
        <Route path="/admin"     element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

Split on route boundaries first — this is almost always the biggest win with zero complexity cost.

### Avoid Expensive Work in Render

Anything in the component body runs on every render. Move expensive work into \`useMemo\`, or outside the component entirely if it doesn't depend on props/state.

\`\`\`tsx
// ✗ Runs on every render
function List({ items }) {
  const sorted = [...items].sort((a, b) => a.localeCompare(b)); // expensive
  return sorted.map(i => <li key={i}>{i}</li>);
}

// ✓ Cached
function List({ items }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.localeCompare(b)),
    [items]
  );
  return sorted.map(i => <li key={i}>{i}</li>);
}
\`\`\`

### Virtualise Long Lists

Rendering 10,000 DOM nodes is slow regardless of how optimized your React code is. **Virtualisation** renders only the items visible in the viewport.

\`\`\`tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtual = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,    // estimated row height in px
  });

  return (
    <div ref={parentRef} style={{ height: 500, overflow: "auto" }}>
      <div style={{ height: virtual.getTotalSize() }}>
        {virtual.getVirtualItems().map(row => (
          <div key={row.key} style={{ transform: \`translateY(\${row.start}px)\` }}>
            {items[row.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Using the React DevTools Profiler

1. Open DevTools → **Profiler** tab
2. Click **Record**, interact with the page, click **Stop**
3. Look for components with high render times or components that re-render unexpectedly often
4. The flame chart shows which components rendered and how long each took

| Optimization | When to use |
|---|---|
| \`React.memo\` | Child renders too often due to parent re-renders |
| \`useMemo\` | Heavy computation inside render |
| \`useCallback\` | Function props passed to memoized children |
| \`lazy\` + \`Suspense\` | Route-level or large feature-level code splitting |
| Virtualisation | Lists with 100+ items |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 11. Error Boundaries
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-error-boundaries",
    title: "Error Boundaries",
    description: "Catching runtime errors in the component tree and showing fallback UI instead of a blank screen.",
    category: "react",
    content: `## Error Boundaries

### The Problem

Without error boundaries, a JavaScript error thrown during rendering crashes the entire React tree and leaves the user with a blank screen. Error boundaries let you catch those errors and render a graceful fallback instead.

### What Errors They Catch

Error boundaries catch errors that occur during:
- Rendering
- Lifecycle methods
- Constructors of child components

They do **not** catch errors in:
- Event handlers (use try/catch there)
- Async code (useEffect callbacks, setTimeout)
- The error boundary component itself

### Class Component (Required for Error Boundaries)

Error boundaries must be class components — there is no hook equivalent yet. You implement \`componentDidCatch\` and \`getDerivedStateFromError\`.

\`\`\`tsx
import { Component, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; message: string; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    // Called synchronously — update state to trigger fallback render
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Called after render — good place to log to an error service
    console.error("Caught error:", error, info.componentStack);
    // logToSentry(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding: "2rem", color: "red" }}>
          <h2>Something went wrong</h2>
          <p>{this.state.message}</p>
          <button onClick={() => this.setState({ hasError: false, message: "" })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
\`\`\`

### Usage — Wrap the Subtree You Want to Protect

\`\`\`tsx
// Wrap the whole app to prevent blank screens
function App() {
  return (
    <ErrorBoundary fallback={<AppCrashPage />}>
      <Router>
        {/* Each route can also have its own boundary */}
        <ErrorBoundary fallback={<WidgetError />}>
          <UserDashboard />
        </ErrorBoundary>
      </Router>
    </ErrorBoundary>
  );
}
\`\`\`

### Granularity Strategy

Place boundaries at multiple levels:
- **App level** — last resort, prevents full blank page
- **Route/page level** — isolates a broken page from the nav
- **Widget level** — lets one broken widget fail without affecting the rest of the page

### react-error-boundary Library

The \`react-error-boundary\` package gives you a ready-made boundary with a \`reset\` callback and a \`useErrorBoundary\` hook for imperative throws:

\`\`\`tsx
import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={Fallback} onReset={() => clearCache()}>
  <UserProfile />
</ErrorBoundary>
\`\`\`

### Error Handling in Event Handlers

Event handler errors bypass error boundaries. Use try/catch + state:

\`\`\`tsx
function SaveButton() {
  const [error, setError] = useState("");

  async function handleSave() {
    try {
      await save(data);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <>
      <button onClick={handleSave}>Save</button>
      {error && <p className="error">{error}</p>}
    </>
  );
}
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 12. State Management at Scale
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-state-management",
    title: "State Management at Scale",
    description: "When to use local state, Context, Zustand, or React Query — and how to choose the right tool.",
    category: "react",
    content: `## State Management at Scale

### Types of State

Not all state is the same. Mixing them in one solution creates unnecessary complexity.

| Type | Examples | Best tool |
|---|---|---|
| **Local UI state** | modal open, tab index, form input | \`useState\` / \`useReducer\` |
| **Shared UI state** | theme, sidebar collapsed | Context or Zustand |
| **Server / async state** | API data, pagination, cache | React Query / SWR |
| **URL state** | filters, search query, page | URL params (React Router) |
| **Form state** | field values, validation errors | React Hook Form |

### Decision Guide

\`\`\`
Is the state local to one component?
  Yes → useState or useReducer

Is it shared across a few nearby components?
  Yes → Lift state to common parent

Is it global UI state (theme, auth user, notifications)?
  Yes → Context (if it changes rarely) or Zustand (if it updates often)

Is it data fetched from a server?
  Yes → React Query or SWR — not Redux, not Context
\`\`\`

### Zustand — Minimal Global State

Zustand is a tiny state library (~1kb) with no boilerplate. You define a store, and components subscribe only to the slices they use.

\`\`\`tsx
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  token: string;
  login:  (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user:  null,
  token: "",
  login:  (user, token) => set({ user, token }),
  logout: ()            => set({ user: null, token: "" }),
}));

// In any component
function Navbar() {
  const user   = useAuthStore(s => s.user);    // only re-renders when user changes
  const logout = useAuthStore(s => s.logout);
  return <button onClick={logout}>{user?.name}</button>;
}
\`\`\`

### React Query — Server State

React Query handles fetching, caching, background refetching, and stale-while-revalidate — all the things you'd normally manage with loading/error/data state plus useEffect.

\`\`\`tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching data
function PostList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/posts").then(r => r.json()),
    staleTime: 60_000,   // consider data fresh for 60s
  });

  if (isLoading) return <Spinner />;
  if (error)     return <p>Error loading posts</p>;
  return posts.map(p => <PostCard key={p.id} post={p} />);
}

// Mutating data + invalidating cache
function NewPostForm() {
  const client = useQueryClient();

  const create = useMutation({
    mutationFn: (data: NewPost) => fetch("/api/posts", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => client.invalidateQueries({ queryKey: ["posts"] }), // refetch list
  });

  return <form onSubmit={e => { e.preventDefault(); create.mutate(formData); }}>...</form>;
}
\`\`\`

### Zustand with Persistence

\`\`\`tsx
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light" as "light" | "dark",
      toggle: () => set(s => ({ theme: s.theme === "light" ? "dark" : "light" })),
    }),
    { name: "theme-storage" }  // localStorage key
  )
);
\`\`\`

### Common Pitfalls

| Pitfall | Fix |
|---|---|
| Storing server data in Redux/Zustand | Use React Query — it handles caching, deduplication, and refetching |
| Over-using Context for frequently updated state | Context re-renders all consumers — use Zustand for high-frequency updates |
| Duplicating server state in local state | Keep one source of truth; derive from the query cache |
| Storing derived values in state | Compute them during render or with \`useMemo\` |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 13. React Router
  // ─────────────────────────────────────────────────────────────
  {
    slug: "react-router",
    title: "React Router",
    description: "Client-side routing with React Router v6 — routes, navigation, params, and protected routes.",
    category: "react",
    content: `## React Router

React Router is the standard routing library for React applications. Version 6 introduced a cleaner, hook-based API and nested routes that compose naturally.

### Setup

\`\`\`tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/users/:id"  element={<UserProfile />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

### Nested Routes

Nested routes let a parent component render a shared layout while child routes fill in the content area via \`<Outlet />\`.

\`\`\`tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>      {/* Layout renders <Outlet /> */}
          <Route index element={<Home />} />        {/* matches "/" */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings"  element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />   {/* child route renders here */}
      </main>
    </div>
  );
}
\`\`\`

### Navigation Hooks

\`\`\`tsx
import { Link, NavLink, useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";

// Declarative links
<Link to="/about">About</Link>

// NavLink adds an active class automatically
<NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
  Dashboard
</NavLink>

// Programmatic navigation
function LoginForm() {
  const navigate = useNavigate();
  async function handleSubmit() {
    await login(credentials);
    navigate("/dashboard");            // push
    navigate(-1);                      // go back
    navigate("/home", { replace: true }); // replace current entry
  }
}

// Route params
function UserProfile() {
  const { id } = useParams<{ id: string }>();
  // URL: /users/42 → id = "42"
}

// Query string params
function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  // URL: /search?q=react → query = "react"

  function updateQuery(q: string) {
    setParams({ q });  // updates URL without full navigation
  }
}

// Current URL info
function BreadCrumb() {
  const { pathname, search, state } = useLocation();
}
\`\`\`

### Protected Routes

\`\`\`tsx
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    // Redirect to login, remembering where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Wrap protected routes
<Route path="/dashboard" element={
  <RequireAuth>
    <Dashboard />
  </RequireAuth>
} />

// After login — redirect back to where they came from
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  async function handleLogin() {
    await login(creds);
    navigate(from, { replace: true });
  }
}
\`\`\`

### Lazy-Loaded Routes

\`\`\`tsx
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings  = lazy(() => import("./pages/Settings"));

<Suspense fallback={<PageSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings"  element={<Settings />} />
  </Routes>
</Suspense>
\`\`\`

Each route's bundle only loads when the user navigates there — the most impactful performance optimisation for most SPAs.`,
  },
];

export default notes;
