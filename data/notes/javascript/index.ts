import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "js-event-loop",
    title: "The Event Loop",
    description: "Call stack, task queue, microtasks, and how async JS actually works.",
    category: "javascript",
    content: `## The JavaScript Event Loop

JavaScript is single-threaded but non-blocking. The event loop is what makes async code possible.

### The Stack, Queue, and Loop

\`\`\`
Call Stack → runs synchronous code
Microtask Queue → Promises, queueMicrotask
Task Queue → setTimeout, setInterval, I/O
\`\`\`

\`\`\`javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
\`\`\`

Microtasks (Promises) always drain before the next task runs.

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "js-closures",
    title: "Closures & Scope",
    description: "Lexical scope, closure captures, and common pitfalls.",
    category: "javascript",
    content: `## Closures & Scope in JavaScript

A closure is a function that captures variables from its enclosing scope.

\`\`\`javascript
function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    value: () => count,
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.value();     // 2
\`\`\`

\`count\` is private — only accessible through the returned methods.

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "js-promises",
    title: "Promises & Async/Await",
    description: "Promise chains, error handling, and async/await patterns.",
    category: "javascript",
    content: `## Promises & Async/Await

\`\`\`javascript
// Promise chain
fetch("/api/user")
  .then(res => res.json())
  .then(user => console.log(user))
  .catch(err => console.error(err));

// Async/await — cleaner syntax for the same thing
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    const user = await res.json();
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

Content coming soon — this is a placeholder.`,
  },
];

export default notes;
