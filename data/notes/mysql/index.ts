import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "what-is-mysql",
    title: "What is MySQL?",
    description: "Relational databases, how MySQL fits in, and core concepts every developer needs.",
    category: "mysql",
    content: `## What is MySQL?

MySQL is an open-source **relational database management system (RDBMS)**. Data is stored in tables — structured grids of rows and columns — and tables relate to each other through keys. MySQL speaks **SQL** (Structured Query Language), a declarative language where you describe *what* you want and the engine figures out *how* to fetch it.

### Why relational?

Relational databases enforce structure and relationships at the storage layer:

- **Tables** are like spreadsheets with a fixed schema.
- **Rows** are individual records.
- **Columns** define the type and name of each field.
- **Primary keys** uniquely identify every row.
- **Foreign keys** link rows across tables, enforcing referential integrity.

| Concept | Analogy |
|---------|---------|
| Database | A filing cabinet |
| Table | A folder of records |
| Row | One filled-in form |
| Column | A field on the form |
| Primary Key | The form's serial number |
| Foreign Key | A reference to another form |

### When to use MySQL

MySQL excels when your data is **structured**, **relational**, and requires **ACID guarantees** (see Transactions). Good fits:

- E-commerce: users, orders, products, inventory
- SaaS apps: accounts, subscriptions, audit logs
- CMS platforms: posts, categories, tags, authors

Reach for something else (MongoDB, Redis, Cassandra) when your data is schemaless, deeply nested, or requires horizontal write scaling at extreme volumes.

### MySQL vs other databases

| Database | Type | Best for |
|----------|------|----------|
| MySQL | Relational | General-purpose web apps |
| PostgreSQL | Relational | Complex queries, JSON, extensions |
| SQLite | Relational | Embedded, single-file apps |
| MongoDB | Document | Flexible schema, nested data |
| Redis | Key-value | Caching, sessions, pub/sub |

### The client-server model

MySQL runs as a **server process**. Your application connects as a client, sends SQL queries over a network socket, and receives result sets back. In production this is usually a managed service (AWS RDS, PlanetScale, Supabase) so you never touch the raw server.

\`\`\`
App → MySQL Client Driver → TCP/IP → MySQL Server → Disk
\`\`\``,
  },
  {
    slug: "data-types",
    title: "Data Types",
    description: "Choosing the right column type: numbers, strings, dates, booleans, and JSON.",
    category: "mysql",
    content: `## MySQL Data Types

Choosing the right data type matters for **storage efficiency**, **query performance**, and **data integrity**. MySQL will not let you store a string in an INT column — the schema is your first line of validation.

### Numeric types

| Type | Storage | Range | Use when |
|------|---------|-------|----------|
| TINYINT | 1 byte | -128 to 127 (or 0–255 unsigned) | flags, small counts |
| SMALLINT | 2 bytes | -32,768 to 32,767 | port numbers, ratings |
| INT | 4 bytes | -2.1B to 2.1B | IDs, counts |
| BIGINT | 8 bytes | ±9.2 quintillion | large IDs, timestamps in ms |
| DECIMAL(p,s) | variable | exact | money, prices |
| FLOAT / DOUBLE | 4/8 bytes | approximate | scientific data (not money) |

**Use DECIMAL for money**, never FLOAT. FLOAT arithmetic introduces rounding errors.

\`\`\`sql
price DECIMAL(10, 2)  -- up to 99,999,999.99
quantity INT UNSIGNED -- no negatives
\`\`\`

### String types

| Type | Max size | Notes |
|------|----------|-------|
| CHAR(n) | 255 chars | Fixed width, padded with spaces |
| VARCHAR(n) | 65,535 bytes | Variable width, stored as-is |
| TEXT | 65,535 bytes | No default value allowed |
| MEDIUMTEXT | 16 MB | Blog posts, HTML |
| LONGTEXT | 4 GB | Large documents |

Use **VARCHAR** for most strings. Use **TEXT** when you don't know the upper bound and don't need indexing on the full value.

\`\`\`sql
email VARCHAR(255) NOT NULL,
name  VARCHAR(100),
body  TEXT
\`\`\`

### Date and time types

| Type | Format | Use when |
|------|--------|----------|
| DATE | YYYY-MM-DD | Birthdays, due dates |
| TIME | HH:MM:SS | Duration, time of day |
| DATETIME | YYYY-MM-DD HH:MM:SS | Timestamps (no TZ) |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | Auto-updated, stores as UTC |
| YEAR | YYYY | Year-only data |

**TIMESTAMP** is usually the right choice for \`created_at\` / \`updated_at\` — it converts to UTC on write and back to local time on read.

\`\`\`sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

### Boolean

MySQL has no native boolean. Use **TINYINT(1)** — 0 is false, 1 is true. Many ORMs alias this as BOOLEAN.

\`\`\`sql
is_active TINYINT(1) NOT NULL DEFAULT 1
\`\`\`

### JSON

MySQL 5.7+ supports a native JSON column that validates syntax and enables path-based querying.

\`\`\`sql
metadata JSON,

-- query a JSON field
SELECT metadata->>'$.plan' FROM users WHERE id = 1;
\`\`\`

### ENUM

A string column restricted to a fixed set of values. Good for status fields.

\`\`\`sql
status ENUM('pending', 'active', 'cancelled') NOT NULL DEFAULT 'pending'
\`\`\``,
  },
  {
    slug: "ddl",
    title: "DDL — Creating & Modifying Tables",
    description: "CREATE, ALTER, DROP — defining and evolving your database schema.",
    category: "mysql",
    content: `## DDL — Data Definition Language

DDL statements define the *structure* of your database. They are not reversible by ROLLBACK in MySQL — always test migrations on a non-production copy first.

### CREATE DATABASE

\`\`\`sql
CREATE DATABASE shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop;
\`\`\`

Always use **utf8mb4** (not the mislabeled utf8) to support full Unicode including emoji.

### CREATE TABLE

\`\`\`sql
CREATE TABLE users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(100) NOT NULL,
  role       ENUM('admin', 'member', 'guest') NOT NULL DEFAULT 'member',
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

\`\`\`sql
CREATE TABLE orders (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED NOT NULL,
  total      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status     ENUM('pending','paid','shipped','cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

### Constraints

| Constraint | Purpose |
|------------|---------|
| PRIMARY KEY | Uniquely identifies each row |
| UNIQUE | No duplicate values in the column |
| NOT NULL | Column cannot be empty |
| DEFAULT | Value if none provided |
| FOREIGN KEY | Links to another table's PK |
| CHECK | Validates values against a condition |

\`\`\`sql
-- CHECK constraint (MySQL 8.0+)
age INT CHECK (age >= 0 AND age <= 120)
\`\`\`

### ALTER TABLE

\`\`\`sql
-- Add a column
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500) AFTER name;

-- Change a column type
ALTER TABLE users MODIFY COLUMN name VARCHAR(200) NOT NULL;

-- Rename a column (MySQL 8.0+)
ALTER TABLE users RENAME COLUMN avatar_url TO profile_image;

-- Drop a column
ALTER TABLE users DROP COLUMN profile_image;

-- Add an index
ALTER TABLE users ADD INDEX idx_email (email);

-- Add a foreign key
ALTER TABLE orders ADD CONSTRAINT fk_orders_users
  FOREIGN KEY (user_id) REFERENCES users(id);
\`\`\`

### DROP and TRUNCATE

\`\`\`sql
DROP TABLE IF EXISTS old_sessions;    -- removes table entirely
TRUNCATE TABLE logs;                  -- deletes all rows, resets AUTO_INCREMENT
DELETE FROM logs;                     -- deletes all rows, keeps AUTO_INCREMENT counter
\`\`\`

**TRUNCATE** is much faster than DELETE for clearing large tables because it bypasses row-by-row logging.`,
  },
  {
    slug: "dml",
    title: "DML — Inserting, Updating & Deleting",
    description: "INSERT, UPDATE, DELETE, UPSERT — writing and modifying data safely.",
    category: "mysql",
    content: `## DML — Data Manipulation Language

DML statements modify data. They participate in transactions and can be rolled back.

### INSERT

\`\`\`sql
-- Single row
INSERT INTO users (email, name, role)
VALUES ('alice@example.com', 'Alice', 'admin');

-- Multiple rows (one round-trip, much faster)
INSERT INTO products (name, price, category) VALUES
  ('Widget A', 9.99, 'widgets'),
  ('Widget B', 14.99, 'widgets'),
  ('Gadget C', 49.99, 'gadgets');
\`\`\`

Get the auto-generated ID of the last insert:

\`\`\`sql
SELECT LAST_INSERT_ID();
\`\`\`

### INSERT … ON DUPLICATE KEY UPDATE (Upsert)

Insert if the row doesn't exist, update if it does (based on a unique or primary key conflict).

\`\`\`sql
INSERT INTO user_settings (user_id, key, value)
VALUES (42, 'theme', 'dark')
ON DUPLICATE KEY UPDATE value = 'dark';
\`\`\`

### REPLACE INTO

Deletes the existing row and inserts a new one. **Avoid** — it breaks foreign key references and resets AUTO_INCREMENT.

### UPDATE

\`\`\`sql
-- Always use WHERE — without it you update every row
UPDATE users
SET name = 'Alice Smith', updated_at = NOW()
WHERE id = 1;

-- Multi-table update
UPDATE orders o
JOIN users u ON u.id = o.user_id
SET o.status = 'cancelled'
WHERE u.is_active = 0 AND o.status = 'pending';
\`\`\`

### DELETE

\`\`\`sql
-- Delete specific rows
DELETE FROM sessions WHERE expires_at < NOW();

-- Delete with JOIN (removes orphaned rows)
DELETE o FROM orders o
LEFT JOIN users u ON u.id = o.user_id
WHERE u.id IS NULL;
\`\`\`

### Safe UPDATE/DELETE pattern

Before any bulk UPDATE or DELETE, run the same WHERE clause as a SELECT first:

\`\`\`sql
-- Preview first
SELECT COUNT(*) FROM orders WHERE status = 'cancelled' AND created_at < '2023-01-01';

-- Then delete
DELETE FROM orders WHERE status = 'cancelled' AND created_at < '2023-01-01';
\`\`\``,
  },
  {
    slug: "select-queries",
    title: "SELECT — Reading Data",
    description: "WHERE, ORDER BY, LIMIT, LIKE, IN, BETWEEN, CASE — all the ways to query rows.",
    category: "mysql",
    content: `## SELECT — Reading Data

SELECT is how you retrieve data. It's the most-used statement and has many clauses that control filtering, ordering, and shaping results.

### Basic SELECT

\`\`\`sql
SELECT id, name, email FROM users;        -- specific columns
SELECT * FROM users;                      -- all columns (avoid in production)
SELECT DISTINCT category FROM products;  -- unique values only
\`\`\`

### WHERE — filtering rows

\`\`\`sql
SELECT * FROM users WHERE is_active = 1;
SELECT * FROM users WHERE role = 'admin' AND created_at > '2024-01-01';
SELECT * FROM users WHERE role = 'admin' OR role = 'member';
SELECT * FROM users WHERE role IN ('admin', 'member');
SELECT * FROM users WHERE name LIKE 'Al%';       -- starts with Al
SELECT * FROM users WHERE name LIKE '%smith%';    -- contains smith
SELECT * FROM orders WHERE total BETWEEN 100 AND 500;
SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM users WHERE deleted_at IS NOT NULL;
\`\`\`

### ORDER BY and LIMIT

\`\`\`sql
SELECT * FROM products ORDER BY price DESC;
SELECT * FROM products ORDER BY category ASC, price DESC;

-- Pagination: page 3, 20 items per page
SELECT * FROM products
ORDER BY id
LIMIT 20 OFFSET 40;
\`\`\`

### Column aliases and expressions

\`\`\`sql
SELECT
  CONCAT(first_name, ' ', last_name) AS full_name,
  UPPER(email)                        AS email_upper,
  YEAR(created_at)                    AS join_year,
  price * 1.2                         AS price_with_tax
FROM users;
\`\`\`

### CASE — conditional columns

\`\`\`sql
SELECT
  name,
  total,
  CASE
    WHEN total >= 1000 THEN 'VIP'
    WHEN total >= 100  THEN 'Regular'
    ELSE 'New'
  END AS customer_tier
FROM orders;
\`\`\`

### NULL handling

\`\`\`sql
SELECT COALESCE(phone, 'N/A') AS phone FROM users;   -- first non-null value
SELECT IFNULL(bio, '')        AS bio   FROM users;   -- if null, use default
SELECT NULLIF(score, 0)                FROM results; -- returns NULL if score = 0
\`\`\`

### Useful string functions

\`\`\`sql
LENGTH('hello')           -- 5
SUBSTRING('hello', 2, 3) -- 'ell'
REPLACE('a-b-c', '-', '_') -- 'a_b_c'
TRIM('  hello  ')         -- 'hello'
LOWER(email), UPPER(name)
\`\`\`

### Useful date functions

\`\`\`sql
NOW()                          -- current datetime
CURDATE()                      -- current date
DATE_ADD(NOW(), INTERVAL 7 DAY)
DATEDIFF('2025-01-01', NOW())  -- days between
DATE_FORMAT(created_at, '%Y-%m')  -- '2024-03'
\`\`\``,
  },
  {
    slug: "joins",
    title: "JOINs",
    description: "INNER, LEFT, RIGHT, SELF, and CROSS joins — combining data from multiple tables.",
    category: "mysql",
    content: `## JOINs

JOINs combine rows from two or more tables based on a related column. They are the core of relational querying.

### Visual overview

\`\`\`
users              orders
──────────         ───────────────────
id │ name          id │ user_id │ total
───┼──────         ───┼─────────┼──────
 1 │ Alice          1 │    1    │  100
 2 │ Bob            2 │    1    │  200
 3 │ Carol          3 │    2    │   50
                    4 │    9    │  400  ← no matching user
\`\`\`

### INNER JOIN — only matching rows

Returns rows where the join condition is true in **both** tables.

\`\`\`sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id;
-- Result: Alice(100), Alice(200), Bob(50)  — Carol and order#4 excluded
\`\`\`

### LEFT JOIN — all rows from left, matching from right

Returns every row from the left table. If no match exists in the right table, columns from the right are NULL.

\`\`\`sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
-- Result: Alice(100), Alice(200), Bob(50), Carol(NULL)
\`\`\`

**Find users with no orders:**
\`\`\`sql
SELECT u.name
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;
-- Result: Carol
\`\`\`

### RIGHT JOIN — all rows from right

Rarely used — a RIGHT JOIN can always be rewritten as a LEFT JOIN by swapping the tables.

### Joining multiple tables

\`\`\`sql
SELECT u.name, p.name AS product, oi.quantity
FROM users u
JOIN orders o    ON o.user_id   = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p  ON p.id        = oi.product_id
WHERE o.status = 'paid';
\`\`\`

### SELF JOIN — joining a table with itself

Useful for hierarchical data (employees and managers).

\`\`\`sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;
\`\`\`

### CROSS JOIN — cartesian product

Every row in table A paired with every row in table B. Rarely intentional, but useful for generating combinations.

\`\`\`sql
SELECT s.size, c.color
FROM sizes s
CROSS JOIN colors c;
-- produces every size+color combination
\`\`\`

### JOIN vs subquery

JOINs are usually faster than subqueries because the optimizer can choose the best join order. Prefer JOINs when you need columns from both tables.`,
  },
  {
    slug: "aggregates",
    title: "Aggregate Functions & GROUP BY",
    description: "COUNT, SUM, AVG, MIN, MAX — summarising data across groups of rows.",
    category: "mysql",
    content: `## Aggregate Functions & GROUP BY

Aggregate functions collapse many rows into a single summary value. GROUP BY splits the table into groups first, then applies the aggregate to each group.

### Core aggregate functions

| Function | Returns |
|----------|---------|
| COUNT(*) | Total number of rows |
| COUNT(col) | Rows where col is NOT NULL |
| COUNT(DISTINCT col) | Unique non-null values |
| SUM(col) | Total of all values |
| AVG(col) | Average value |
| MIN(col) | Smallest value |
| MAX(col) | Largest value |
| GROUP_CONCAT(col) | Comma-joined string of values |

\`\`\`sql
SELECT
  COUNT(*)               AS total_orders,
  COUNT(DISTINCT user_id) AS unique_customers,
  SUM(total)             AS revenue,
  AVG(total)             AS avg_order,
  MIN(total)             AS smallest,
  MAX(total)             AS largest
FROM orders
WHERE status = 'paid';
\`\`\`

### GROUP BY

\`\`\`sql
-- Revenue per category
SELECT category, COUNT(*) AS qty, SUM(price) AS revenue
FROM products
GROUP BY category;

-- Orders per user per month
SELECT
  user_id,
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS order_count,
  SUM(total) AS spend
FROM orders
GROUP BY user_id, month
ORDER BY user_id, month;
\`\`\`

### HAVING — filter on aggregates

WHERE filters rows before grouping. HAVING filters groups after aggregation.

\`\`\`sql
-- Categories with more than 10 products
SELECT category, COUNT(*) AS cnt
FROM products
GROUP BY category
HAVING cnt > 10;

-- High-value customers (spent > $500 total)
SELECT user_id, SUM(total) AS total_spend
FROM orders
GROUP BY user_id
HAVING total_spend > 500
ORDER BY total_spend DESC;
\`\`\`

### WHERE + GROUP BY + HAVING together

\`\`\`sql
SELECT
  u.name,
  COUNT(o.id)  AS order_count,
  SUM(o.total) AS lifetime_value
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'paid'           -- filter rows first
GROUP BY u.id, u.name             -- then group
HAVING lifetime_value > 1000      -- then filter groups
ORDER BY lifetime_value DESC
LIMIT 10;
\`\`\`

### GROUP_CONCAT

Aggregate multiple rows into a single comma-separated string.

\`\`\`sql
SELECT user_id, GROUP_CONCAT(product_name ORDER BY product_name SEPARATOR ', ') AS products
FROM order_items
GROUP BY user_id;
-- user 1 → "Keyboard, Monitor, Mouse"
\`\`\`

### Execution order

SQL clauses execute in this order (not the order you write them):

\`\`\`
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
\`\`\`

This is why you can't use a SELECT alias in WHERE, but you can use it in ORDER BY.`,
  },
  {
    slug: "subqueries-ctes",
    title: "Subqueries & CTEs",
    description: "Nested queries, correlated subqueries, and the WITH clause for readable complex logic.",
    category: "mysql",
    content: `## Subqueries & CTEs

### Subqueries

A subquery is a SELECT inside another SQL statement. It can appear in WHERE, FROM, or SELECT.

**In WHERE — scalar/list subquery:**
\`\`\`sql
-- Users who placed at least one order
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Users who have never ordered
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);

-- Products more expensive than average
SELECT name, price FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

**In FROM — derived table (inline view):**
\`\`\`sql
SELECT u.name, order_stats.total_spend
FROM users u
JOIN (
  SELECT user_id, SUM(total) AS total_spend
  FROM orders
  WHERE status = 'paid'
  GROUP BY user_id
) AS order_stats ON order_stats.user_id = u.id;
\`\`\`

**Correlated subquery** — executes once per outer row:
\`\`\`sql
-- Each user's most recent order date
SELECT u.name,
  (SELECT MAX(created_at) FROM orders o WHERE o.user_id = u.id) AS last_order
FROM users u;
\`\`\`

### EXISTS vs IN

Use **EXISTS** when you only need to know if a match exists — it short-circuits on the first match.

\`\`\`sql
-- IN — evaluates all rows in subquery first
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders);

-- EXISTS — stops at first match, faster on large subquery results
SELECT name FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
\`\`\`

### CTEs — Common Table Expressions

CTEs use the WITH keyword to name a subquery and reuse it. They make complex queries far more readable.

\`\`\`sql
WITH paid_orders AS (
  SELECT user_id, SUM(total) AS total_spend, COUNT(*) AS order_count
  FROM orders
  WHERE status = 'paid'
  GROUP BY user_id
),
vip_users AS (
  SELECT user_id FROM paid_orders WHERE total_spend > 1000
)
SELECT u.name, po.total_spend, po.order_count
FROM users u
JOIN paid_orders po ON po.user_id = u.id
JOIN vip_users v    ON v.user_id  = u.id
ORDER BY po.total_spend DESC;
\`\`\`

### Recursive CTEs

Useful for hierarchical data like category trees or org charts (MySQL 8.0+).

\`\`\`sql
WITH RECURSIVE category_tree AS (
  -- Anchor: start at root categories
  SELECT id, name, parent_id, 0 AS depth
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  -- Recursive: join children to parents
  SELECT c.id, c.name, c.parent_id, ct.depth + 1
  FROM categories c
  JOIN category_tree ct ON ct.id = c.parent_id
)
SELECT depth, name FROM category_tree ORDER BY depth, name;
\`\`\``,
  },
  {
    slug: "indexes",
    title: "Indexes & Performance",
    description: "B-tree indexes, composite indexes, covering indexes, and reading EXPLAIN output.",
    category: "mysql",
    content: `## Indexes & Performance

An index is a separate data structure (usually a B-tree) that MySQL maintains alongside your table to make lookups fast. Without an index, MySQL scans every row — a **full table scan** — which is fine for small tables but catastrophic at scale.

### How a B-tree index works

\`\`\`
Table: 1M rows of users, no index on email
Query: SELECT * FROM users WHERE email = 'alice@example.com';
Cost:  Reads all 1,000,000 rows — O(n)

With index on email:
Cost:  Traverses ~20 B-tree levels — O(log n)
\`\`\`

### Creating indexes

\`\`\`sql
-- Single column
CREATE INDEX idx_email   ON users(email);
CREATE INDEX idx_status  ON orders(status);

-- Composite index (column order matters)
CREATE INDEX idx_cat_price ON products(category, price);

-- Unique index
CREATE UNIQUE INDEX idx_unique_email ON users(email);

-- Full-text index (for LIKE '%...%' alternatives)
CREATE FULLTEXT INDEX idx_body ON posts(body);
\`\`\`

### Composite index column order

A composite index on **(category, price)** can serve queries on:
- category alone
- category + price together

It **cannot** efficiently serve:
- price alone (the leftmost prefix rule)

\`\`\`sql
-- Uses index
SELECT * FROM products WHERE category = 'widgets' AND price < 50;
SELECT * FROM products WHERE category = 'widgets';

-- Cannot use index efficiently
SELECT * FROM products WHERE price < 50;
\`\`\`

### Covering indexes

If all columns a query needs are in the index, MySQL can answer from the index alone without touching the main table.

\`\`\`sql
-- Index: (status, created_at)
-- Query only reads index, never hits the table rows
SELECT status, created_at FROM orders WHERE status = 'paid';
\`\`\`

### Reading EXPLAIN

\`\`\`sql
EXPLAIN SELECT * FROM orders WHERE user_id = 42 AND status = 'paid';
\`\`\`

| Column | What to look for |
|--------|-----------------|
| type | **ALL** = bad (full scan), **ref/range** = good, **const** = best |
| key | Which index was used (NULL = no index) |
| rows | Estimated rows examined — lower is better |
| Extra | "Using filesort" or "Using temporary" = warning |

\`\`\`sql
-- Add EXTENDED for more detail (MySQL 5.6+)
EXPLAIN EXTENDED SELECT * FROM orders WHERE status = 'paid';
SHOW WARNINGS;  -- shows rewritten query
\`\`\`

### When NOT to add an index

- **Write-heavy tables**: every INSERT/UPDATE/DELETE must also update all indexes.
- **Low-cardinality columns**: an index on a boolean column (0 or 1) barely helps — MySQL often ignores it.
- **Small tables**: full scans on < 1,000 rows are fast enough.

### Slow query log

Enable it to find unindexed queries automatically:

\`\`\`sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- log queries taking > 1 second
SHOW VARIABLES LIKE 'slow_query_log_file';  -- find the log file
\`\`\``,
  },
  {
    slug: "transactions",
    title: "Transactions & ACID",
    description: "BEGIN, COMMIT, ROLLBACK, savepoints, and isolation levels explained.",
    category: "mysql",
    content: `## Transactions & ACID

A transaction is a group of SQL statements that execute as a single atomic unit. Either all succeed, or none do.

### ACID properties

| Property | Meaning |
|----------|---------|
| **Atomicity** | All statements commit or none do |
| **Consistency** | Database moves from one valid state to another |
| **Isolation** | Concurrent transactions don't interfere |
| **Durability** | Committed data survives crashes |

### Basic transaction

\`\`\`sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Check for errors first, then:
COMMIT;    -- makes changes permanent
-- or:
ROLLBACK;  -- undoes everything since START TRANSACTION
\`\`\`

### Error handling pattern

\`\`\`sql
START TRANSACTION;

INSERT INTO orders (user_id, total) VALUES (42, 99.99);
SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, quantity)
VALUES (@order_id, 5, 2);

-- If no errors:
COMMIT;
\`\`\`

### Savepoints

Roll back to a specific point without losing the whole transaction.

\`\`\`sql
START TRANSACTION;
INSERT INTO logs (msg) VALUES ('step 1');
SAVEPOINT step1;

INSERT INTO logs (msg) VALUES ('step 2');
SAVEPOINT step2;

-- Oops — undo step 2 only
ROLLBACK TO SAVEPOINT step1;

COMMIT;  -- commits 'step 1' only
\`\`\`

### Isolation levels

MySQL InnoDB defaults to **REPEATABLE READ**. Each level trades consistency for concurrency.

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|-----------|---------------------|--------------|
| READ UNCOMMITTED | Yes | Yes | Yes |
| READ COMMITTED | No | Yes | Yes |
| **REPEATABLE READ** *(default)* | No | No | Yes* |
| SERIALIZABLE | No | No | No |

*InnoDB uses gap locks to prevent most phantom reads even at REPEATABLE READ.

**Dirty read**: reading uncommitted data from another transaction.
**Non-repeatable read**: reading the same row twice in one transaction and getting different values.
**Phantom read**: a new row appears in a repeated query within the same transaction.

\`\`\`sql
-- Check current level
SHOW VARIABLES LIKE 'transaction_isolation';

-- Change for current session
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
\`\`\`

### AUTO_COMMIT

MySQL wraps every statement in its own transaction by default (AUTO_COMMIT = ON). To group multiple statements, you must explicitly START TRANSACTION.

\`\`\`sql
SHOW VARIABLES LIKE 'autocommit';  -- 1 = on
SET autocommit = 0;                 -- disable for session
\`\`\`

### Deadlocks

A deadlock occurs when two transactions wait on each other's locks. InnoDB detects this and automatically rolls back one of them.

\`\`\`
T1: LOCK row A → waiting for row B
T2: LOCK row B → waiting for row A
→ Deadlock! InnoDB kills T2 and T1 proceeds.
\`\`\`

Minimise deadlocks by always acquiring locks **in the same order** and keeping transactions short.`,
  },
  {
    slug: "schema-design",
    title: "Schema Design & Normalization",
    description: "1NF, 2NF, 3NF, primary/foreign keys, and designing tables that scale.",
    category: "mysql",
    content: `## Schema Design & Normalization

Good schema design prevents data anomalies (duplicates, orphaned rows, update inconsistencies) and makes queries simpler to write.

### Normal forms

**1NF — First Normal Form**
- Every column holds atomic (indivisible) values.
- No repeating groups or arrays in a column.

\`\`\`
BAD:  users.tags = "javascript,react,node"   (comma-list)
GOOD: separate tags table + user_tags pivot table
\`\`\`

**2NF — Second Normal Form** (requires 1NF)
- Every non-key column must depend on the *entire* primary key, not just part of it.
- Applies when you have a composite primary key.

\`\`\`
BAD:  order_items(order_id, product_id, product_name, quantity)
      product_name depends only on product_id, not on (order_id, product_id)
GOOD: Move product_name to the products table
\`\`\`

**3NF — Third Normal Form** (requires 2NF)
- No non-key column depends on another non-key column (no transitive dependency).

\`\`\`
BAD:  orders(id, user_id, user_email, user_name, total)
      user_email and user_name depend on user_id, not directly on order id
GOOD: Move user fields to the users table, orders stores only user_id
\`\`\`

### Relationships

**One-to-Many** (most common): one user has many orders.
\`\`\`sql
orders.user_id → users.id
\`\`\`

**Many-to-Many**: products and orders (one order has many products; one product appears in many orders). Requires a pivot/junction table.

\`\`\`sql
CREATE TABLE order_items (
  order_id   INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity   INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);
\`\`\`

**One-to-One**: user profile details split for performance.
\`\`\`sql
user_profiles.user_id → users.id  (UNIQUE foreign key)
\`\`\`

### ON DELETE / ON UPDATE behaviour

| Option | Behaviour |
|--------|-----------|
| CASCADE | Delete/update child rows automatically |
| RESTRICT | Block parent deletion if children exist |
| SET NULL | Set child FK to NULL |
| NO ACTION | Same as RESTRICT in MySQL |

### Practical naming conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Tables | plural, snake_case | users, order_items |
| Primary key | id | id INT UNSIGNED AUTO_INCREMENT |
| Foreign key | referenced_table_singular + _id | user_id, product_id |
| Timestamps | snake_case | created_at, updated_at, deleted_at |
| Booleans | is_ or has_ prefix | is_active, has_verified_email |

### Soft deletes

Instead of deleting rows (which may violate FK constraints or lose audit history), add a deleted_at column:

\`\`\`sql
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

-- Soft delete
UPDATE users SET deleted_at = NOW() WHERE id = 42;

-- Query only active records
SELECT * FROM users WHERE deleted_at IS NULL;
\`\`\``,
  },
  {
    slug: "window-functions",
    title: "Window Functions",
    description: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and running totals — analytics without subqueries.",
    category: "mysql",
    content: `## Window Functions (MySQL 8.0+)

Window functions compute a value for each row by looking at a *window* of related rows — without collapsing them into a single group like GROUP BY does. They are transformative for analytics queries.

### Syntax

\`\`\`sql
function_name() OVER (
  PARTITION BY col   -- optional: split into groups
  ORDER BY col       -- optional: define row order within window
  ROWS BETWEEN ...   -- optional: define frame
)
\`\`\`

### ROW_NUMBER, RANK, DENSE_RANK

\`\`\`sql
SELECT
  name,
  department,
  salary,
  ROW_NUMBER()  OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()        OVER (PARTITION BY department ORDER BY salary DESC) AS rnk,
  DENSE_RANK()  OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rnk
FROM employees;
\`\`\`

| name | dept | salary | ROW_NUMBER | RANK | DENSE_RANK |
|------|------|--------|-----------|------|------------|
| Alice | Eng | 120k | 1 | 1 | 1 |
| Bob | Eng | 100k | 2 | 2 | 2 |
| Carol | Eng | 100k | 3 | 2 | 2 |
| Dave | Eng | 80k | 4 | 4 | 3 |

**RANK** skips numbers after ties. **DENSE_RANK** does not.

### Top-N per group

Get the top 3 earners per department:

\`\`\`sql
WITH ranked AS (
  SELECT name, department, salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT * FROM ranked WHERE rnk <= 3;
\`\`\`

### LAG and LEAD — access adjacent rows

\`\`\`sql
SELECT
  order_date,
  total,
  LAG(total, 1)  OVER (ORDER BY order_date) AS prev_day_total,
  LEAD(total, 1) OVER (ORDER BY order_date) AS next_day_total,
  total - LAG(total, 1) OVER (ORDER BY order_date) AS day_over_day_change
FROM daily_sales;
\`\`\`

### Running totals and moving averages

\`\`\`sql
SELECT
  order_date,
  total,
  SUM(total)  OVER (ORDER BY order_date) AS running_total,
  AVG(total)  OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7day_avg
FROM daily_sales;
\`\`\`

### NTILE — divide rows into buckets

\`\`\`sql
SELECT
  customer_id,
  total_spend,
  NTILE(4) OVER (ORDER BY total_spend DESC) AS quartile
FROM customer_totals;
-- quartile 1 = top 25%, quartile 4 = bottom 25%
\`\`\`

### FIRST_VALUE and LAST_VALUE

\`\`\`sql
SELECT
  name,
  salary,
  FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS top_salary_in_dept
FROM employees;
\`\`\`

Window functions run **after** WHERE, GROUP BY, and HAVING, but **before** ORDER BY and LIMIT. This makes them safe to use alongside aggregates.`,
  },
  {
    slug: "stored-procedures-views",
    title: "Stored Procedures, Functions & Views",
    description: "Encapsulating logic in the database: CREATE PROCEDURE, FUNCTION, and VIEW.",
    category: "mysql",
    content: `## Stored Procedures, Functions & Views

### Views

A view is a saved SELECT query you treat like a table. It doesn't store data — it re-runs the query each time.

\`\`\`sql
CREATE OR REPLACE VIEW active_users AS
  SELECT id, name, email, created_at
  FROM users
  WHERE is_active = 1 AND deleted_at IS NULL;

-- Query like a table
SELECT * FROM active_users WHERE created_at > '2024-01-01';

-- Drop
DROP VIEW IF EXISTS active_users;
\`\`\`

**Use views to:**
- Simplify complex joins for non-developer teams
- Provide a stable API when underlying tables change
- Enforce row-level security (expose only certain rows)

### Stored Procedures

A stored procedure is a named block of SQL you call by name. Useful for business logic that belongs in the database, batch operations, and multi-step transactions.

\`\`\`sql
DELIMITER //

CREATE PROCEDURE transfer_funds(
  IN from_account INT,
  IN to_account   INT,
  IN amount       DECIMAL(10,2)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
    UPDATE accounts SET balance = balance - amount WHERE id = from_account;
    UPDATE accounts SET balance = balance + amount WHERE id = to_account;
  COMMIT;
END //

DELIMITER ;

-- Call it
CALL transfer_funds(1, 2, 250.00);
\`\`\`

### Control flow inside procedures

\`\`\`sql
DELIMITER //
CREATE PROCEDURE grade_score(IN score INT, OUT grade VARCHAR(1))
BEGIN
  IF score >= 90 THEN
    SET grade = 'A';
  ELSEIF score >= 80 THEN
    SET grade = 'B';
  ELSEIF score >= 70 THEN
    SET grade = 'C';
  ELSE
    SET grade = 'F';
  END IF;
END //
DELIMITER ;

CALL grade_score(85, @g);
SELECT @g;  -- 'B'
\`\`\`

### WHILE loop

\`\`\`sql
DELIMITER //
CREATE PROCEDURE generate_months(IN year INT)
BEGIN
  DECLARE m INT DEFAULT 1;
  WHILE m <= 12 DO
    INSERT INTO calendar_months (year, month) VALUES (year, m);
    SET m = m + 1;
  END WHILE;
END //
DELIMITER ;
\`\`\`

### Stored Functions

A function returns a single value and can be used inside SELECT.

\`\`\`sql
DELIMITER //
CREATE FUNCTION full_name(first VARCHAR(50), last VARCHAR(50))
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
  RETURN CONCAT(first, ' ', last);
END //
DELIMITER ;

-- Use in a query
SELECT full_name(first_name, last_name) AS name FROM users;
\`\`\`

| Feature | Procedure | Function |
|---------|-----------|----------|
| Returns | Nothing (or OUT params) | Single value |
| Called with | CALL | Inside SELECT/WHERE |
| Can modify tables | Yes | Discouraged |
| Transactions | Yes | No |`,
  },
  {
    slug: "json-advanced",
    title: "JSON & Advanced Features",
    description: "JSON columns, FULLTEXT search, generated columns, and useful MySQL tips.",
    category: "mysql",
    content: `## JSON & Advanced MySQL Features

### JSON columns (MySQL 5.7+)

Store semi-structured data alongside relational columns without sacrificing queryability.

\`\`\`sql
CREATE TABLE products (
  id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(200) NOT NULL,
  metadata JSON
);

INSERT INTO products (name, metadata) VALUES
  ('Widget', '{"color":"red","weight":0.5,"tags":["sale","new"]}');
\`\`\`

**Reading JSON:**
\`\`\`sql
SELECT
  name,
  metadata->>'$.color'        AS color,     -- unquoted string
  metadata->'$.weight'        AS weight,    -- JSON value (quoted)
  JSON_EXTRACT(metadata, '$.tags[0]') AS first_tag
FROM products;
\`\`\`

**Filtering on JSON:**
\`\`\`sql
SELECT * FROM products WHERE metadata->>'$.color' = 'red';
SELECT * FROM products WHERE JSON_CONTAINS(metadata->'$.tags', '"sale"');
\`\`\`

**Updating JSON:**
\`\`\`sql
UPDATE products
SET metadata = JSON_SET(metadata, '$.color', 'blue', '$.in_stock', true)
WHERE id = 1;
\`\`\`

**Useful JSON functions:**

| Function | Use |
|----------|-----|
| JSON_OBJECT(k,v,...) | Build JSON object |
| JSON_ARRAY(v,...) | Build JSON array |
| JSON_EXTRACT(doc, path) | Read a value |
| JSON_SET(doc, path, val) | Set a value |
| JSON_REMOVE(doc, path) | Remove a key |
| JSON_CONTAINS(doc, val) | Check membership |
| JSON_ARRAYAGG(expr) | Aggregate rows into JSON array |
| JSON_OBJECTAGG(k, v) | Aggregate rows into JSON object |

### Generated (computed) columns

A column whose value is automatically computed from other columns.

\`\`\`sql
CREATE TABLE orders (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  subtotal   DECIMAL(10,2),
  tax_rate   DECIMAL(4,4) DEFAULT 0.08,
  -- VIRTUAL: computed on read (no storage)
  tax_amount DECIMAL(10,2) AS (subtotal * tax_rate) VIRTUAL,
  -- STORED: computed on write (indexable)
  total      DECIMAL(10,2) AS (subtotal + subtotal * tax_rate) STORED
);

-- You can even index a stored generated column
CREATE INDEX idx_total ON orders(total);
\`\`\`

### FULLTEXT search

FULLTEXT indexes support natural-language search — much better than LIKE '%keyword%'.

\`\`\`sql
ALTER TABLE posts ADD FULLTEXT INDEX idx_ft (title, body);

-- Natural language search (scored by relevance)
SELECT title, MATCH(title, body) AGAINST ('machine learning') AS score
FROM posts
WHERE MATCH(title, body) AGAINST ('machine learning')
ORDER BY score DESC;

-- Boolean mode (more control)
SELECT title FROM posts
WHERE MATCH(title, body) AGAINST ('+mysql -oracle' IN BOOLEAN MODE);
\`\`\`

### Useful tips

**FIND_IN_SET** — query a comma-separated column (migration step-stone):
\`\`\`sql
SELECT * FROM articles WHERE FIND_IN_SET('mysql', tags);
\`\`\`

**INSERT IGNORE** — skip on duplicate key without erroring:
\`\`\`sql
INSERT IGNORE INTO user_favorites (user_id, product_id) VALUES (1, 5);
\`\`\`

**SHOW and DESCRIBE:**
\`\`\`sql
SHOW DATABASES;
SHOW TABLES;
DESCRIBE users;               -- columns and types
SHOW CREATE TABLE users;      -- full CREATE statement
SHOW INDEX FROM orders;       -- all indexes
SHOW PROCESSLIST;             -- active connections/queries
\`\`\`

**Check table size:**
\`\`\`sql
SELECT
  table_name,
  ROUND(data_length / 1024 / 1024, 2)  AS data_mb,
  ROUND(index_length / 1024 / 1024, 2) AS index_mb,
  table_rows
FROM information_schema.TABLES
WHERE table_schema = DATABASE()
ORDER BY data_length DESC;
\`\`\``,
  },
];

export default notes;
