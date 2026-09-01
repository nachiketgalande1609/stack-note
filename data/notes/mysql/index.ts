import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "mysql-queries",
    title: "Core Queries",
    description: "SELECT, JOINs, GROUP BY, and subqueries — the daily essentials.",
    category: "mysql",
    content: `## Core MySQL Queries

### SELECT with JOIN

\`\`\`sql
SELECT u.name, o.total
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.active = 1
ORDER BY o.created_at DESC
LIMIT 20;
\`\`\`

### GROUP BY + aggregate

\`\`\`sql
SELECT category, COUNT(*) AS count, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING count > 5;
\`\`\`

### Subquery

\`\`\`sql
SELECT name FROM users
WHERE id IN (
  SELECT user_id FROM orders WHERE total > 1000
);
\`\`\`

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "mysql-indexing",
    title: "Indexing & Performance",
    description: "How indexes work, when to add them, and how to read EXPLAIN output.",
    category: "mysql",
    content: `## MySQL Indexing & Performance

Indexes speed up reads by creating a sorted data structure MySQL can binary-search.

### Creating an index

\`\`\`sql
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_cat_price ON products(category, price);
\`\`\`

### Reading EXPLAIN

\`\`\`sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42;
\`\`\`

Key columns: \`type\` (range/ref/ALL), \`key\` (index used), \`rows\` (estimated rows scanned).

- **ALL** = full table scan — usually a problem
- **ref** / **range** = index lookup — good

Content coming soon — this is a placeholder.`,
  },
  {
    slug: "mysql-transactions",
    title: "Transactions & ACID",
    description: "BEGIN/COMMIT/ROLLBACK, isolation levels, and what ACID guarantees.",
    category: "mysql",
    content: `## MySQL Transactions & ACID

ACID: Atomicity, Consistency, Isolation, Durability.

\`\`\`sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT; -- or ROLLBACK on error
\`\`\`

### Isolation levels

| Level | Dirty Reads | Non-repeatable | Phantom |
|-------|-------------|----------------|---------|
| READ UNCOMMITTED | Yes | Yes | Yes |
| READ COMMITTED | No | Yes | Yes |
| REPEATABLE READ (default) | No | No | Yes |
| SERIALIZABLE | No | No | No |

Content coming soon — this is a placeholder.`,
  },
];

export default notes;
