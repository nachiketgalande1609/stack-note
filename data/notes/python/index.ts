import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "python-basics",
    title: "Python Basics",
    description: "Variables, data types, control flow, and functions in Python.",
    category: "python",
    content: `## Python Basics

Python is a high-level, dynamically typed language known for its readable syntax and broad ecosystem.

### Variables & Types

\`\`\`python
name = "Alice"
age = 30
score = 98.5
is_active = True
\`\`\`

Python infers types at runtime — no declarations needed.

### Control Flow

\`\`\`python
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")
\`\`\`

### Functions

\`\`\`python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("Alice"))          # Hello, Alice!
print(greet("Bob", "Hi"))      # Hi, Bob!
\`\`\`

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "python-data-structures",
    title: "Data Structures",
    description: "Lists, dicts, sets, and tuples — when to use each.",
    category: "python",
    content: `## Python Data Structures

### List

\`\`\`python
items = [1, 2, 3]
items.append(4)
items[0]   # 1
\`\`\`

### Dictionary

\`\`\`python
user = {"name": "Alice", "age": 30}
user["email"] = "alice@example.com"
\`\`\`

### Set

\`\`\`python
tags = {"python", "backend", "python"}
# {"python", "backend"} — duplicates removed
\`\`\`

### Tuple

\`\`\`python
point = (10, 20)  # immutable
x, y = point      # unpacking
\`\`\`

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "python-async",
    title: "Async & Await",
    description: "Coroutines, event loops, and asyncio for concurrent Python code.",
    category: "python",
    content: `## Async & Await in Python

Python's \`asyncio\` module enables concurrent I/O-bound work without threads.

\`\`\`python
import asyncio

async def fetch_data(url: str) -> str:
    await asyncio.sleep(1)  # simulate I/O
    return f"data from {url}"

async def main():
    results = await asyncio.gather(
        fetch_data("https://api.example.com/users"),
        fetch_data("https://api.example.com/posts"),
    )
    print(results)

asyncio.run(main())
\`\`\`

Content coming soon — this is a placeholder.`,
  },
];

export default notes;
