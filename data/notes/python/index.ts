import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "python-intro",
    title: "Python at a Glance",
    description: "What Python is, how it runs, virtual environments, and why it dominates so many domains.",
    category: "python",
    content: `## Python at a Glance

Python is a **general-purpose programming language** that prioritises readability above almost everything else. Its design philosophy is: code is read far more often than it is written, so make it easy to read.

You do not need to declare variable types, manage memory, or write boilerplate setup code. You just write what you want to happen, and Python does it.

### How Python runs your code

Most languages compile your code into machine code before running it. Python works differently:

1. You write a \`.py\` file
2. The **CPython interpreter** reads it, checks for syntax errors, and converts it to **bytecode** — a simpler internal format
3. The **Python Virtual Machine** executes that bytecode instruction by instruction

\`\`\`
your_file.py  →  CPython  →  bytecode  →  PVM executes it
\`\`\`

The practical effect: there is no compile step. You save the file and run it immediately with \`python3 script.py\`.

### The REPL — your Python sandbox

The REPL (Read-Eval-Print Loop) is an interactive Python shell. Type a line of code, press Enter, and see the result instantly. It is the fastest way to test ideas:

\`\`\`python
python3          # start the REPL in your terminal
>>> 2 + 2
4
>>> name = "Alice"
>>> f"Hello, {name}!"
'Hello, Alice!'
>>> [x ** 2 for x in range(5)]
[0, 1, 4, 9, 16]
>>> exit()       # quit
\`\`\`

Use the REPL constantly while learning. It gives you instant feedback.

### Where Python is used

| Domain | What people build |
|--------|------------------|
| Web backends | APIs, websites (Django, FastAPI, Flask) |
| Data science | Data analysis, visualisation (pandas, NumPy) |
| Machine learning | Neural networks, models (PyTorch, scikit-learn) |
| Automation & scripting | File processing, system tasks |
| DevOps | Infrastructure tools, CI pipelines |
| CLIs | Command-line tools (Click, Typer) |

### Always use Python 3

Python 2 was retired in 2020. Always use **Python 3.10 or newer**. Check your version:

\`\`\`bash
python3 --version
\`\`\`

### Virtual environments — keep projects isolated

Imagine you have two projects: Project A needs version 1.0 of a library, and Project B needs version 2.0. If you install packages globally, they conflict.

A **virtual environment** is a self-contained folder that holds Python and all the packages for one project — completely separate from everything else:

\`\`\`bash
# Step 1 — create the environment (do this once per project)
python3 -m venv .venv

# Step 2 — activate it (do this every time you open a terminal for this project)
source .venv/bin/activate       # Mac / Linux
.venv\\Scripts\\activate          # Windows

# Step 3 — install packages; they go into .venv/, not your system
pip install requests fastapi

# Save what you installed so teammates can reproduce it
pip freeze > requirements.txt

# Install from a saved list
pip install -r requirements.txt
\`\`\`

### Code style — PEP 8

Python has an official style guide called **PEP 8**. Following it makes your code look like every other Python codebase:

- **4 spaces** for indentation (never tabs)
- **snake_case** for variables and functions: \`user_name\`, \`get_user\`
- **PascalCase** for classes: \`UserProfile\`, \`DatabaseError\`
- **UPPER_SNAKE_CASE** for constants: \`MAX_RETRIES = 3\`

Use **black** to auto-format your code and **ruff** to catch style issues — both run in under a second.`,
  },
  {
    slug: "variables-types",
    title: "Variables & Data Types",
    description: "int, float, str, bool, None — how Python's type system works, truthiness, and type hints.",
    category: "python",
    content: `## Variables & Data Types

### Variables are labels, not boxes

In many languages, a variable is like a box: it holds a value directly. In Python, a variable is a **label that points to an object**. The object lives somewhere in memory; the variable is just a name attached to it.

This distinction matters when you work with mutable objects:

\`\`\`python
a = [1, 2, 3]
b = a              # b is NOT a copy — both labels point to the SAME list

b.append(4)
print(a)           # [1, 2, 3, 4]  ← a changed too, because they share the same object
\`\`\`

To make an actual copy of a list, use \`a.copy()\` or \`a[:]\`.

### The five core types

| Type | What it stores | Example |
|------|---------------|---------|
| \`int\` | Whole numbers (no size limit) | \`42\`, \`-7\`, \`1_000_000\` |
| \`float\` | Decimal numbers (64-bit) | \`3.14\`, \`-0.5\`, \`2.0e10\` |
| \`str\` | Text (Unicode, immutable) | \`"hello"\`, \`'world'\` |
| \`bool\` | True or False | \`True\`, \`False\` |
| \`NoneType\` | The absence of a value | \`None\` |

\`\`\`python
x       = 42
pi      = 3.14159
name    = "Alice"
active  = True
result  = None      # used when a function has nothing to return
\`\`\`

Python figures out the type automatically from the value — you never write \`int x = 42\`.

### Numbers — things to know

**Integer division always returns a float in Python 3:**
\`\`\`python
10 / 3    # 3.3333...   — true division, always float
10 // 3   # 3           — floor division, rounds down to nearest integer
10 % 3    # 1           — modulo, gives the remainder
2 ** 10   # 1024        — exponentiation (power)
abs(-7)   # 7           — absolute value
\`\`\`

**Python integers never overflow** — they grow as large as your memory allows.

You can use underscores in numbers to make them readable. Python ignores them:
\`\`\`python
world_population = 8_100_000_000   # much clearer than 8100000000
\`\`\`

### Strings — immutable sequences of text

A string cannot be changed after it is created. If you want to "modify" a string, you are actually creating a new one:

\`\`\`python
s = "hello"
s[0] = "H"          # TypeError — strings are immutable
s = s.capitalize()  # creates a brand new string "Hello" and points s at it
\`\`\`

**Useful string operations:**
\`\`\`python
"hello".upper()              # "HELLO"
"WORLD".lower()              # "world"
"  hi there  ".strip()       # "hi there"   — remove leading/trailing whitespace
"a,b,c".split(",")           # ["a", "b", "c"]
", ".join(["a", "b", "c"])   # "a, b, c"
"hello".replace("l", "r")    # "herro"
"hello"[1:4]                 # "ell"  — slicing (start at 1, stop before 4)
"hello"[0]                   # "h"
len("hello")                 # 5
"ll" in "hello"              # True
\`\`\`

### f-strings — the cleanest way to embed variables in text

f-strings (format strings) let you put any expression directly inside a string by prefixing with \`f\`. They were added in Python 3.6 and are now the recommended approach:

\`\`\`python
name  = "Alice"
age   = 30
score = 98.5

f"Name: {name}, Age: {age}"          # "Name: Alice, Age: 30"
f"Score: {score:.1f}%"               # "Score: 98.5%"   (.1f = 1 decimal place)
f"2 + 2 equals {2 + 2}"             # "2 + 2 equals 4"  (expressions work)
f"{name.upper()!s}"                  # "ALICE"
f"{'left':<10}"                      # "left      "  (padded to 10 chars)
\`\`\`

### Truthiness — what counts as True or False

In Python, any value can be used in a boolean context (like an \`if\` statement). You do not always need to compare explicitly to \`True\` or \`False\`:

| Value | Treated as |
|-------|-----------|
| \`None\` | **False** |
| \`0\`, \`0.0\` | **False** |
| \`""\` (empty string) | **False** |
| \`[]\`, \`{}\`, \`set()\` | **False** |
| Everything else | **True** |

\`\`\`python
users = []

if users:                # False because the list is empty
    show(users)
else:
    print("No users yet")

name = ""
if not name:             # True because empty string is falsy
    print("Name is required")
\`\`\`

This lets you write cleaner conditions without \`len(users) == 0\` or \`name == ""\`.

### Checking and converting types

\`\`\`python
type(42)                      # <class 'int'>
type("hello")                 # <class 'str'>

isinstance(42, int)           # True
isinstance(42, (int, float))  # True — check against multiple types at once

# Converting between types
int("42")        # 42
int(3.9)         # 3   — truncates toward zero, does NOT round
float("3.14")    # 3.14
str(100)         # "100"
bool(0)          # False
bool("hello")    # True
list("abc")      # ["a", "b", "c"]
\`\`\`

### Type hints — document what your functions expect

Type hints let you annotate variables and functions with expected types. Python does **not** enforce these at runtime — they exist for documentation and for tools like mypy or your IDE to catch mistakes:

\`\`\`python
def greet(name: str, times: int = 1) -> str:
    return (name + " ") * times

# Python 3.10+ — use | for "or"
def find_user(user_id: int) -> str | None:
    ...                        # returns a string, or None if not found
\`\`\``,
  },
  {
    slug: "control-flow",
    title: "Control Flow",
    description: "if/elif/else, for loops, while, break/continue, and comprehensions — directing the flow of your program.",
    category: "python",
    content: `## Control Flow

Control flow is how you tell Python which code to run and when. Without it, every program would just execute every line from top to bottom with no decisions or repetition.

### if / elif / else — making decisions

Python checks each condition from top to bottom and runs the first block that is true. All remaining blocks are skipped:

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"    # this one runs — score is 85, which is >= 80
elif score >= 70:
    grade = "C"    # this is skipped — we already found a match
else:
    grade = "F"    # fallback if nothing else matched
\`\`\`

You can compare with \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`, and combine conditions with \`and\`, \`or\`, \`not\`:

\`\`\`python
if age >= 18 and has_id:
    allow_entry()

if is_admin or is_moderator:
    show_dashboard()

if not is_banned:
    allow_post()
\`\`\`

### Ternary expression — one-line if/else

When you need to choose between two values based on a condition, you can write it on a single line. Only use this when it reads clearly — do not squeeze complex logic into one line:

\`\`\`python
# Regular if/else
if score >= 60:
    label = "pass"
else:
    label = "fail"

# Ternary — same thing, one line
label = "pass" if score >= 60 else "fail"
\`\`\`

### for loops — repeating over a sequence

Python's \`for\` loop goes through each item in an iterable (a list, string, range, dict, file, etc.) one at a time:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)    # apple, then banana, then cherry

# range() generates a sequence of numbers
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8  — step of 2
    print(i)
\`\`\`

### enumerate — when you need the index AND the value

A common mistake is writing \`for i in range(len(items))\` just to get both an index and the value. Python has \`enumerate\` for exactly this:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Avoid — clunky and error-prone
for i in range(len(fruits)):
    print(i, fruits[i])

# Prefer — clean and readable
for i, fruit in enumerate(fruits):
    print(i, fruit)          # 0 apple, 1 banana, 2 cherry

for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)          # 1 apple, 2 banana, 3 cherry
\`\`\`

### zip — iterate two lists in parallel

When you have two related lists and want to process them together, \`zip\` pairs them up:

\`\`\`python
names  = ["Alice", "Bob", "Carol"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name} scored {score}")
# Alice scored 85
# Bob scored 92
# Carol scored 78
\`\`\`

### while loops — repeat until a condition is false

Use \`while\` when you do not know in advance how many iterations you need:

\`\`\`python
# Keep asking until the user gives a valid number
number = None
while number is None:
    try:
        number = int(input("Enter a number: "))
    except ValueError:
        print("That's not a number. Try again.")

# Count down
count = 5
while count > 0:
    print(count)
    count -= 1
\`\`\`

### break — exit the loop early

\`break\` immediately exits the loop, skipping all remaining iterations:

\`\`\`python
for name in ["Alice", "Bob", "Carol", "Dave"]:
    if name == "Carol":
        break             # stop — we found what we needed
    print(name)
# prints: Alice, Bob
\`\`\`

### continue — skip the current iteration

\`continue\` skips the rest of the current iteration's code and jumps to the next one:

\`\`\`python
for n in range(10):
    if n % 2 == 0:
        continue          # skip even numbers
    print(n)
# prints: 1 3 5 7 9
\`\`\`

### List comprehensions — build lists in one clean line

A list comprehension is a compact way to build a new list by transforming or filtering an existing one. It replaces the common pattern of creating an empty list and appending inside a loop:

\`\`\`python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x ** 2)

# Comprehension — exactly the same result
squares = [x ** 2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With a filter — only keep even numbers
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transform AND filter at once — squares of even numbers only
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
\`\`\`

**Dict and set comprehensions** follow the same pattern:

\`\`\`python
# Dict comprehension — {key: value for item in iterable}
word_lengths = {word: len(word) for word in ["apple", "fig", "mango"]}
# {"apple": 5, "fig": 3, "mango": 5}

# Set comprehension — {value for item in iterable}
unique_first_letters = {word[0] for word in ["apple", "avocado", "banana"]}
# {"a", "b"}  — duplicates removed automatically
\`\`\`

**When NOT to use comprehensions:** If the logic is more than one simple condition or transform, write a regular loop. Comprehensions should be immediately obvious to any reader.`,
  },
  {
    slug: "functions",
    title: "Functions",
    description: "def, arguments, defaults, *args, **kwargs, lambdas, closures, and decorators — all clearly explained.",
    category: "python",
    content: `## Functions

A function is a named, reusable block of code. Instead of writing the same logic in five places, you write it once, give it a name, and call it whenever needed. Functions are also how you break a large problem into smaller, manageable pieces.

### Defining and calling a function

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

result = add(3, 4)    # 7
\`\`\`

- \`def\` starts the definition
- The function body is indented under the \`def\` line
- \`return\` sends a value back to the caller
- A function without a \`return\` statement implicitly returns \`None\`

### Default arguments — making parameters optional

You can give a parameter a default value. If the caller does not supply that argument, the default is used:

\`\`\`python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

greet("Alice")                  # "Hello, Alice!"
greet("Bob", "Hi")              # "Hi, Bob!"
greet("Carol", greeting="Hey") # "Hey, Carol!"  — keyword argument
\`\`\`

**A critical rule about default arguments:** Never use a mutable object (list, dict, set) as a default. The default is created **once** when Python defines the function, not each time you call it. This leads to a very common bug:

\`\`\`python
# WRONG — all calls share the same list
def add_tag(item: str, tags: list = []):
    tags.append(item)
    return tags

add_tag("python")   # ["python"]
add_tag("web")      # ["python", "web"]  ← the list grew from the last call!

# CORRECT — create a fresh list every time by defaulting to None
def add_tag(item: str, tags: list = None) -> list:
    if tags is None:
        tags = []           # new list created on each call
    tags.append(item)
    return tags
\`\`\`

### Positional vs keyword arguments

When calling a function, you can pass arguments by **position** (order matters) or by **keyword** (name matters, order does not):

\`\`\`python
def connect(host: str, port: int, timeout: int = 30):
    ...

connect("localhost", 5432)           # positional
connect("localhost", 5432, 60)       # positional, overriding timeout
connect(host="localhost", port=5432) # keyword
connect("localhost", timeout=60, port=5432)  # mixed
\`\`\`

### *args — accepting any number of positional arguments

Put \`*\` before a parameter name to collect all extra positional arguments into a **tuple**:

\`\`\`python
def total(*numbers: int) -> int:
    print(numbers)      # it's a tuple: (1, 2, 3, 4)
    return sum(numbers)

total(1, 2, 3, 4)   # 10
total(5, 10)         # 15
total()              # 0
\`\`\`

### **kwargs — accepting any number of keyword arguments

Put \`**\` before a parameter name to collect all extra keyword arguments into a **dict**:

\`\`\`python
def log_event(event: str, **details) -> None:
    print(f"Event: {event}")
    for key, value in details.items():
        print(f"  {key}: {value}")

log_event("login", user="Alice", ip="192.168.1.1", success=True)
# Event: login
#   user: Alice
#   ip: 192.168.1.1
#   success: True
\`\`\`

### Keyword-only arguments — force callers to be explicit

Place a bare \`*\` in the signature (with no parameter name) to mark everything after it as keyword-only. This prevents ambiguous positional usage:

\`\`\`python
def create_user(name: str, email: str, *, role: str = "member", active: bool = True):
    ...

create_user("Alice", "alice@example.com", role="admin")   # correct
create_user("Alice", "alice@example.com", "admin")        # TypeError — role must be a keyword
\`\`\`

### Lambda — a small anonymous function

A lambda is a function without a name, limited to a single expression. Use it for short, simple callbacks:

\`\`\`python
double = lambda x: x * 2
double(5)   # 10

# Most common use — as a sort key
users.sort(key=lambda u: u["age"])                         # sort by age
items.sort(key=lambda x: (x["category"], x["price"]))     # sort by two fields
\`\`\`

If the logic is longer than a simple expression, write a proper named function instead.

### Closures — functions that remember their context

A **closure** is a function defined inside another function. The inner function can access variables from the outer function even after the outer function has returned. The inner function "closes over" those variables:

\`\`\`python
def make_multiplier(factor: int):
    def multiply(n: int) -> int:
        return n * factor    # 'factor' comes from the outer function
    return multiply          # we return the inner function itself

double = make_multiplier(2)  # 'factor' is now permanently 2 inside double
triple = make_multiplier(3)

double(7)   # 14
triple(7)   # 21
\`\`\`

This pattern is the foundation of decorators.

### Decorators — wrap a function with extra behaviour

A decorator is a function that takes another function as input and returns a new version of it with added behaviour. The \`@\` syntax is shorthand for \`func = decorator(func)\`:

\`\`\`python
import time
from functools import wraps

def timer(func):
    @wraps(func)              # preserves the original function's name
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)    # call the original function
        elapsed = time.time() - start
        print(f"{func.__name__} ran in {elapsed:.3f}s")
        return result
    return wrapper

@timer                        # same as: slow_query = timer(slow_query)
def slow_query():
    time.sleep(1)
    return "data"

slow_query()   # "slow_query ran in 1.001s"
\`\`\`

Common real-world decorators:
- \`@login_required\` — redirect to login if not authenticated
- \`@cache\` — store the result so the function doesn't run again with the same inputs
- \`@retry\` — automatically retry on failure
- \`@property\` — make a method look like an attribute`,
  },
  {
    slug: "data-structures",
    title: "Built-in Data Structures",
    description: "list, dict, set, tuple — what each is designed for, key operations, and how to choose between them.",
    category: "python",
    content: `## Built-in Data Structures

Python gives you four powerful built-in collection types. Picking the right one makes your code cleaner and faster. Here is the quick decision guide:

| I need to... | Use |
|-------------|-----|
| Keep items in order and access by position | **list** |
| Look things up by a name/key | **dict** |
| Check if something is in a collection quickly | **set** |
| Store a fixed group of values that should never change | **tuple** |

---

### list — an ordered, changeable sequence

A list holds items in a specific order. You can add, remove, and change items freely. Items can be of any type and duplicates are allowed:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Reading
fruits[0]        # "apple"   — first item (index starts at 0)
fruits[-1]       # "cherry"  — last item
fruits[1:3]      # ["banana", "cherry"]  — slice (from index 1 up to, not including, 3)

# Adding items
fruits.append("date")              # add to the end
fruits.insert(1, "avocado")        # insert at a specific position
fruits.extend(["elderberry", "fig"])  # add multiple items from another list

# Removing items
fruits.pop()                       # remove and return the last item
fruits.pop(0)                      # remove and return item at index 0
fruits.remove("banana")            # remove the first occurrence of a value
del fruits[2]                      # delete by index

# Searching and sorting
"apple" in fruits                  # True or False — membership check
fruits.index("cherry")             # index of the first occurrence
fruits.sort()                      # sort in place (modifies the list)
sorted(fruits)                     # returns a new sorted list, original unchanged
fruits.reverse()                   # reverse in place
len(fruits)                        # count of items
\`\`\`

**Slicing** is one of Python's most useful features — it lets you extract a portion of a list without modifying the original:

\`\`\`python
lst = [0, 1, 2, 3, 4, 5]
lst[2:5]      # [2, 3, 4]     — items from index 2 up to (not including) 5
lst[:3]       # [0, 1, 2]     — from the start to index 3
lst[3:]       # [3, 4, 5]     — from index 3 to the end
lst[::2]      # [0, 2, 4]     — every second item
lst[::-1]     # [5, 4, 3, 2, 1, 0]  — reversed copy
lst[:]        # [0, 1, 2, 3, 4, 5]  — a shallow copy of the whole list
\`\`\`

---

### dict — a collection of key-value pairs

A dict maps **keys** to **values**. Think of it like a real dictionary: you look up a word (key) to find its definition (value). Keys must be unique; values can be anything:

\`\`\`python
user = {"name": "Alice", "age": 30, "active": True}

# Reading
user["name"]                    # "Alice" — raises KeyError if key doesn't exist
user.get("phone")               # None — safe read, no error
user.get("phone", "N/A")        # "N/A" — safe read with a fallback default

# Writing
user["email"] = "alice@example.com"   # add a new key
user["age"] = 31                       # update an existing key

# Removing
user.pop("active")              # removes and returns the value
del user["age"]                 # removes the key (no return value)

# Checking
"name" in user                  # True — checks keys only
"Alice" in user.values()        # True — check values

# Iterating
for key in user:                           print(key)
for key, value in user.items():            print(key, "→", value)
for value in user.values():               print(value)

# Merge two dicts — the right dict wins on conflicts (Python 3.9+)
defaults = {"timeout": 30, "retries": 3}
settings = defaults | {"timeout": 60}     # {"timeout": 60, "retries": 3}
\`\`\`

---

### set — a collection of unique values

A set stores items with **no duplicates** and **no guaranteed order**. Its main superpower is extremely fast membership testing (checking if something is in the set):

\`\`\`python
tags = {"python", "web", "python"}  # {"python", "web"} — duplicate removed automatically

tags.add("api")
tags.discard("web")    # removes if present — no error if it's not there
tags.remove("web")     # removes — raises KeyError if it's not there

# Set math — very useful for comparisons
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b    # Union — everything in either:  {1, 2, 3, 4, 5, 6}
a & b    # Intersection — only in both:  {3, 4}
a - b    # Difference — in a but not b:  {1, 2}
a ^ b    # Symmetric diff — in one but not both: {1, 2, 5, 6}
\`\`\`

**Key use case — deduplication:**
\`\`\`python
names_with_duplicates = ["Alice", "Bob", "Alice", "Carol", "Bob"]
unique_names = list(set(names_with_duplicates))
# ["Alice", "Bob", "Carol"]  — order not guaranteed
\`\`\`

---

### tuple — an ordered, unchangeable sequence

A tuple is like a list that cannot be modified. Once created, you cannot add, remove, or change its items. Use tuples when the data should stay fixed — coordinates, RGB colours, database rows, function return values:

\`\`\`python
point     = (10, 20)
colour    = (255, 128, 0)
db_record = (1, "Alice", "alice@example.com")

# Unpacking — assign tuple items to individual variables
x, y = point
user_id, name, email = db_record

# Star unpacking — collect the "rest"
first, *middle, last = (1, 2, 3, 4, 5)
# first = 1, middle = [2, 3, 4], last = 5
\`\`\`

---

### Why choice of structure matters — performance

| Operation | list | dict / set |
|-----------|------|-----------|
| Get item by index/key | O(1) fast | O(1) fast |
| Check if item exists (\`in\`) | **O(n) slow** — checks every item | **O(1) fast** — uses hashing |
| Add item to the end | O(1) fast | O(1) fast |
| Insert at the beginning | **O(n) slow** — shifts all items | O(1) fast |

If you are writing \`if x in my_list\` anywhere, especially inside a loop, convert the list to a set first. For 1,000 items the difference is already noticeable; for 1,000,000 items it is the difference between instant and several seconds.

---

### collections — specialised containers worth knowing

\`\`\`python
from collections import defaultdict, Counter, deque

# defaultdict — a dict that creates a default value for missing keys
# instead of raising a KeyError
groups = defaultdict(list)
for user in users:
    groups[user.role].append(user.name)
# no need to check "if role not in groups" first

# Counter — counts occurrences of each item
votes = Counter(["Alice", "Bob", "Alice", "Carol", "Alice", "Bob"])
# Counter({'Alice': 3, 'Bob': 2, 'Carol': 1})
votes.most_common(1)   # [('Alice', 3)]

# deque — a list-like structure with fast adds/removes from BOTH ends
# list.pop(0) is O(n); deque.popleft() is O(1)
queue = deque([1, 2, 3])
queue.appendleft(0)   # [0, 1, 2, 3]
queue.popleft()       # 0, queue is now [1, 2, 3]
\`\`\``,
  },
  {
    slug: "oop",
    title: "Object-Oriented Programming",
    description: "Classes, __init__, inheritance, special methods, properties, and dataclasses — explained step by step.",
    category: "python",
    content: `## Object-Oriented Programming

### What is a class and why use one?

A **class** is a blueprint for creating objects. An **object** (or instance) is a concrete thing built from that blueprint. Each object has its own data (**attributes**) and behaviour (**methods**).

You do not need classes for every Python program — they make the most sense when you have data and a set of operations that naturally belong together. A \`User\` has a name, email, and password, and you want to do things like authenticate it, update its profile, and check its permissions. Packaging all of that together as a class makes your code easier to understand and maintain.

### Creating a class

\`\`\`python
class User:
    # class attribute — shared by ALL instances (like a global for this class)
    platform = "StackNote"

    def __init__(self, name: str, email: str):
        # instance attributes — each object gets its own copy
        self.name  = name
        self.email = email
        self.active = True

    def greet(self) -> str:
        return f"Hello, I'm {self.name}"

    def deactivate(self) -> None:
        self.active = False
\`\`\`

- \`__init__\` is the **constructor** — Python calls it automatically when you create an instance. Use it to set the initial state
- \`self\` is always the first parameter of any method and refers to the instance you are working on. When you call \`user.greet()\`, Python passes \`user\` as \`self\` automatically

### Creating and using instances

\`\`\`python
alice = User("Alice", "alice@example.com")
bob   = User("Bob",   "bob@example.com")

# Each instance has its own data
alice.name     # "Alice"
bob.name       # "Bob"

# Calling methods
alice.greet()  # "Hello, I'm Alice"

# The class attribute is shared
alice.platform  # "StackNote"
bob.platform    # "StackNote"
User.platform   # "StackNote"
\`\`\`

### Inheritance — one class built on top of another

Inheritance lets you create a new class that **reuses everything from an existing class** and adds or overrides whatever is different. The new class is called a **subclass**; the original is the **parent class**:

\`\`\`python
class AdminUser(User):                      # AdminUser inherits from User
    def __init__(self, name: str, email: str, permissions: list):
        super().__init__(name, email)       # run User's __init__ first
        self.permissions = permissions

    def greet(self) -> str:                 # override the parent's method
        return f"Hello, I'm admin {self.name}"

    def can(self, action: str) -> bool:    # new method only admins have
        return action in self.permissions

admin = AdminUser("Alice", "alice@example.com", ["edit", "delete"])
admin.greet()            # "Hello, I'm admin Alice"
admin.can("delete")      # True
admin.active             # True — inherited from User
isinstance(admin, User)  # True — AdminUser IS a User
\`\`\`

### Special (dunder) methods — making objects work like built-ins

Special methods let your objects integrate naturally with Python's syntax. They are named with double underscores (\`__\`), which is why they are called "dunder" methods:

| Method | When Python calls it |
|--------|---------------------|
| \`__init__(self)\` | When you create an instance: \`User(...)\` |
| \`__str__(self)\` | When you print or convert to string: \`print(user)\` |
| \`__repr__(self)\` | For debugging representation: \`repr(user)\` |
| \`__len__(self)\` | When you call \`len(obj)\` |
| \`__eq__(self, other)\` | When you use \`==\` |
| \`__lt__(self, other)\` | When you use \`<\` (also enables \`sorted()\`) |
| \`__add__(self, other)\` | When you use \`+\` |
| \`__contains__(self, item)\` | When you use \`in\` |
| \`__iter__(self)\` | When you use a \`for\` loop on the object |

\`\`\`python
class Vector:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector):
            return NotImplemented
        return self.x == other.x and self.y == other.y

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v1 + v2             # Vector(4, 6)  — __add__ is called
v1 == Vector(1, 2)  # True         — __eq__ is called
print(v1)           # Vector(1, 2) — __repr__ is called
\`\`\`

### Properties — getters and setters done the Python way

A **property** lets you make a method behave like an attribute. The caller reads \`user.age\` like a plain value, but Python secretly calls a function behind the scenes, letting you add validation or computed logic:

\`\`\`python
class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self._price = price         # convention: _ prefix means "internal, don't touch directly"

    @property
    def price(self) -> float:
        return self._price          # called when you READ product.price

    @price.setter
    def price(self, value: float) -> None:
        if value < 0:
            raise ValueError(f"Price cannot be negative: {value}")
        self._price = value         # called when you WRITE product.price = 50

    @property
    def price_with_tax(self) -> float:
        return round(self._price * 1.2, 2)   # computed, read-only

p = Product("Widget", 10.0)
p.price              # 10.0
p.price = 20.0       # calls the setter — validation runs
p.price = -5         # ValueError: Price cannot be negative: -5
p.price_with_tax     # 24.0
\`\`\`

### dataclasses — stop writing boilerplate

Writing \`__init__\`, \`__repr__\`, and \`__eq__\` by hand for every data-holding class is tedious. The \`@dataclass\` decorator generates all of them automatically from your field annotations:

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Order:
    order_id:  int
    customer:  str
    items:     list[str] = field(default_factory=list)
    discount:  float = 0.0

    def total_items(self) -> int:
        return len(self.items)

o = Order(order_id=1, customer="Alice", items=["book", "pen"])
print(o)         # Order(order_id=1, customer='Alice', items=['book', 'pen'], discount=0.0)
o == Order(1, "Alice", ["book", "pen"])   # True — field-by-field comparison
\`\`\`

The \`field(default_factory=list)\` trick correctly gives each instance its own list — it avoids the mutable default argument bug described in the Functions note.`,
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    description: "try/except/finally, raising exceptions, custom exception classes, and context managers — handling failure gracefully.",
    category: "python",
    content: `## Error Handling

### What is an exception?

When something goes wrong during execution, Python raises an **exception** — a special object that describes the error. If nothing catches it, the program prints a traceback (the chain of calls that led to the error) and exits.

Good error handling means: **catch errors you can recover from, let the rest propagate**. Do not silently swallow errors, and do not catch errors you do not know how to handle.

### try / except — catching errors

\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"Result: {result}")
except ValueError:
    # int() raised this because the input wasn't a valid number
    print("That's not a valid number.")
except ZeroDivisionError:
    # Division raised this because the number was 0
    print("You can't divide by zero.")
except (TypeError, OverflowError) as e:
    # Catch multiple exception types in one block
    print(f"Math error: {e}")
else:
    # Runs ONLY if no exception was raised — the happy path
    print("Everything worked!")
finally:
    # Runs ALWAYS — whether or not an exception occurred
    # Use this for cleanup: closing files, releasing connections, etc.
    print("Done.")
\`\`\`

**The \`as e\` part** gives you access to the exception object so you can read its message or attributes.

### Python's exception hierarchy

Exceptions form a tree. If you catch a parent class, you also catch all its children. Always catch the most specific exception you can:

\`\`\`
BaseException
├── SystemExit               ← raised by sys.exit()
├── KeyboardInterrupt        ← when user presses Ctrl+C
└── Exception                ← the base for all regular errors
    ├── ValueError           ← right type, wrong value (e.g. int("hello"))
    ├── TypeError            ← wrong type (e.g. "a" + 1)
    ├── IndexError           ← list index out of bounds
    ├── KeyError             ← dict key doesn't exist
    ├── AttributeError       ← object doesn't have that attribute
    ├── NameError            ← variable not defined
    ├── FileNotFoundError    ← subclass of OSError
    ├── ZeroDivisionError
    └── RuntimeError
\`\`\`

**Never use a bare \`except:\` without a type.** It catches \`SystemExit\` and \`KeyboardInterrupt\` too, which means Ctrl+C no longer works and your program becomes impossible to stop cleanly.

### Raising exceptions yourself

Use \`raise\` when your code detects an invalid state. Write a clear, actionable error message:

\`\`\`python
def set_age(age: int) -> None:
    if not isinstance(age, int):
        raise TypeError(f"Age must be an integer, got {type(age).__name__}")
    if not 0 <= age <= 150:
        raise ValueError(f"Age must be between 0 and 150, got {age}")
\`\`\`

To re-raise an exception after doing some work (like logging), use \`raise\` with no argument:

\`\`\`python
try:
    process_payment()
except Exception as e:
    log.error("Payment failed: %s", e)
    raise          # re-raises the same exception — caller still sees it
\`\`\`

### Custom exception classes

Define your own exceptions to give callers meaningful types to catch. Organise them into a hierarchy that mirrors your application:

\`\`\`python
class AppError(Exception):
    """Base class — catch this to handle any app error."""
    pass

class AuthError(AppError):
    """Raised when authentication fails."""
    def __init__(self, message: str, status_code: int = 401):
        super().__init__(message)
        self.status_code = status_code

class NotFoundError(AppError):
    """Raised when a requested resource doesn't exist."""
    pass

class ValidationError(AppError):
    """Raised when input data is invalid."""
    def __init__(self, field: str, message: str):
        super().__init__(f"{field}: {message}")
        self.field = field
\`\`\`

\`\`\`python
# Usage
try:
    raise AuthError("Session expired", status_code=401)
except AuthError as e:
    return {"error": str(e), "status": e.status_code}
except AppError as e:
    return {"error": str(e), "status": 500}
\`\`\`

### Context managers — guaranteed cleanup with \`with\`

The \`with\` statement is Python's way of saying "use this resource, then clean it up no matter what happens." It guarantees the cleanup runs even if an exception occurs:

\`\`\`python
# Without context manager — dangerous!
f = open("data.txt")
data = f.read()          # if this fails, f.close() never runs → resource leak
f.close()

# With context manager — safe
with open("data.txt", "r") as f:
    data = f.read()
# f.close() is called automatically here, exception or not
\`\`\`

You can use multiple context managers in one \`with\` statement:

\`\`\`python
with open("input.txt") as src, open("output.txt", "w") as dst:
    dst.write(src.read())
\`\`\`

### Writing your own context manager

The \`@contextmanager\` decorator is the simplest way. Write the setup before \`yield\`, the resource after it, and the cleanup in \`finally\`:

\`\`\`python
from contextlib import contextmanager
import time

@contextmanager
def timed(label: str):
    start = time.time()
    try:
        yield              # the code inside the 'with' block runs here
    finally:
        elapsed = time.time() - start
        print(f"{label} finished in {elapsed:.3f}s")

with timed("loading data"):
    load_large_file()
# prints: "loading data finished in 2.341s"
\`\`\``,
  },
  {
    slug: "iterators-generators",
    title: "Iterators & Generators",
    description: "The iterator protocol, yield, generator expressions, and lazy evaluation — process data without loading it all into memory.",
    category: "python",
    content: `## Iterators & Generators

### What is iteration?

When you write \`for item in collection\`, Python needs a way to hand you one item at a time. It does this through the **iterator protocol** — a pair of special methods.

An **iterable** is anything you can loop over: a list, string, dict, file, range.
An **iterator** is the object that actually produces values one at a time and remembers where it left off.

When you start a \`for\` loop, Python calls \`iter(collection)\` to get an iterator, then calls \`next()\` on it repeatedly until it raises \`StopIteration\`:

\`\`\`python
lst = ["a", "b", "c"]
it  = iter(lst)       # get an iterator from the list

next(it)    # "a"
next(it)    # "b"
next(it)    # "c"
next(it)    # raises StopIteration — the for loop catches this and stops
\`\`\`

This is exactly what your \`for\` loops do under the hood, automatically.

### Custom iterator — building your own

Implement \`__iter__\` (return self) and \`__next__\` (return next value or raise StopIteration):

\`\`\`python
class NumberRange:
    """Produces integers from start up to (not including) stop."""
    def __init__(self, start: int, stop: int):
        self.current = start
        self.stop    = stop

    def __iter__(self):
        return self      # the iterator is the object itself

    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration   # signal that we are done
        value = self.current
        self.current += 1
        return value

for n in NumberRange(1, 5):
    print(n)     # 1, 2, 3, 4
\`\`\`

This is a lot of code. **Generators** give you the same result with far less boilerplate.

### Generators — write iterators with \`yield\`

A generator is a function that uses \`yield\` instead of \`return\`. When Python runs the function and hits \`yield\`, it **pauses the function, hands back the value, and remembers exactly where it left off**. The next call to \`next()\` resumes from that exact point:

\`\`\`python
def number_range(start: int, stop: int):
    current = start
    while current < stop:
        yield current      # pause here, give back current, resume next time
        current += 1

for n in number_range(1, 5):
    print(n)     # 1, 2, 3, 4
\`\`\`

Same result as the class above — but five lines instead of fifteen.

### The key benefit: generators are lazy

A regular function computes all its values eagerly and returns them in one shot. A generator computes values **on demand**, one at a time, using almost no memory regardless of how many values it will produce:

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:          # infinite — but that's fine because it's lazy
        yield a
        a, b = b, a + b

gen = fibonacci()
next(gen)    # 0
next(gen)    # 1
next(gen)    # 1
next(gen)    # 2
next(gen)    # 3
\`\`\`

This generates an infinite sequence of Fibonacci numbers, yet uses constant memory because at any point only one value exists in memory.

### Real-world example: processing large files

Without a generator, reading a 10GB log file loads the whole thing into memory. With a generator, you process one line at a time:

\`\`\`python
def read_error_lines(filepath: str):
    """Yield only the lines that contain 'ERROR'."""
    with open(filepath) as f:
        for line in f:
            if "ERROR" in line:
                yield line.strip()

# Memory usage stays tiny even for a 10GB file
for error_line in read_error_lines("app.log"):
    send_alert(error_line)
\`\`\`

### Generator expressions — lazy comprehensions

Generator expressions look like list comprehensions but use \`()\` instead of \`[]\`. They produce values lazily, so they are memory-efficient when you only need to iterate once:

\`\`\`python
# List comprehension — builds ALL 1 million values in memory right now
squares_list = [x ** 2 for x in range(1_000_000)]   # ~8 MB

# Generator expression — builds nothing upfront, computes one at a time
squares_gen = (x ** 2 for x in range(1_000_000))    # ~200 bytes

# sum, any, all, max, min all work perfectly with generators
total  = sum(x ** 2 for x in range(1_000_000))
is_any = any(x > 999_000 for x in range(1_000_000))
\`\`\`

### \`yield from\` — delegate to another iterable

When a generator wants to yield all items from another iterable, use \`yield from\` instead of a manual loop:

\`\`\`python
def flatten(nested_list):
    """Turn [[1,2],[3,[4,5]]] into [1,2,3,4,5]."""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)   # recurse into sub-lists
        else:
            yield item

list(flatten([1, [2, 3], [4, [5, 6]]]))
# [1, 2, 3, 4, 5, 6]
\`\`\`

### When to use generators

Use a generator instead of a list when:
- You are processing a **large dataset** (files, database results, API pagination)
- You only need to **iterate once** — not random access or multiple passes
- You are building a **pipeline** where each step feeds the next
- The sequence is **infinite** or **expensive to compute upfront**`,
  },
  {
    slug: "async-await",
    title: "Async & Await",
    description: "Coroutines, the event loop, asyncio.gather, and when to use async — explained clearly.",
    category: "python",
    content: `## Async & Await

### The problem: waiting is wasted time

Imagine a waiter at a restaurant. A bad waiter takes order #1, walks to the kitchen, stands there watching the food cook, picks it up, delivers it, then goes to take order #2. Everybody waits ages.

A good waiter takes order #1, puts it in the kitchen, takes order #2 while the first is cooking, then delivers both when they are ready. Same person, far more efficient.

Python's async model works the same way. A traditional synchronous program takes a database query, waits idle while the database works, gets the result, then takes the next query. An async program fires off multiple queries simultaneously and handles each result as it arrives.

### Synchronous vs asynchronous — a direct comparison

\`\`\`python
import time

# Synchronous — each request waits for the previous one to finish
def fetch(url):
    time.sleep(1)          # simulate 1 second network delay
    return f"data from {url}"

def main_sync():
    start = time.time()
    r1 = fetch("url1")     # waits 1s
    r2 = fetch("url2")     # waits 1s
    r3 = fetch("url3")     # waits 1s
    print(f"Done in {time.time() - start:.1f}s")   # "Done in 3.0s"
\`\`\`

\`\`\`python
import asyncio

# Async — all requests run at the same time
async def fetch(url):
    await asyncio.sleep(1)  # pause here, let other tasks run
    return f"data from {url}"

async def main_async():
    start = asyncio.get_event_loop().time()
    r1, r2, r3 = await asyncio.gather(
        fetch("url1"),       # all three start immediately
        fetch("url2"),
        fetch("url3"),
    )
    print(f"Done in {asyncio.get_event_loop().time() - start:.1f}s")  # "Done in 1.0s"

asyncio.run(main_async())
\`\`\`

Same work, three times faster — because the waits overlap instead of stacking.

### Coroutines — async functions

A function defined with \`async def\` is called a **coroutine function**. Calling it does not run the code — it returns a **coroutine object**. You need to \`await\` it to actually run it:

\`\`\`python
async def greet(name: str) -> str:
    await asyncio.sleep(0.5)    # yield control here — other tasks can run
    return f"Hello, {name}!"

# This does nothing — just creates the coroutine object
coro = greet("Alice")

# This actually runs it
result = asyncio.run(greet("Alice"))   # "Hello, Alice!"
\`\`\`

**\`asyncio.run()\`** starts the event loop, runs the given coroutine, and shuts the loop down when it finishes. Only call it once at the top level of your program.

### \`await\` — pause and let others run

The \`await\` keyword can only be used inside an \`async def\` function. When Python hits an \`await\`, it pauses the current coroutine and switches to another task that is ready to run. When the awaited thing finishes, the original coroutine resumes:

\`\`\`python
async def process():
    print("Starting...")
    data = await fetch_from_database()   # pause here while DB works
    print("Got data, processing...")     # resumes when DB responds
    result = await save_to_storage(data) # pause here while saving
    print("Done!")
\`\`\`

### asyncio.gather — run multiple coroutines concurrently

This is the most common pattern. \`gather\` starts all the given coroutines at once and waits for all of them to finish:

\`\`\`python
async def main():
    # These all run at the same time
    user, posts, comments = await asyncio.gather(
        fetch_user(user_id),
        fetch_posts(user_id),
        fetch_comments(user_id),
    )
    return {"user": user, "posts": posts, "comments": comments}
\`\`\`

If any coroutine raises an exception, \`gather\` propagates it. To handle failures independently:

\`\`\`python
results = await asyncio.gather(
    fetch_user(1),
    fetch_user(9999),    # this one might fail
    return_exceptions=True   # exceptions become return values instead of being raised
)
for r in results:
    if isinstance(r, Exception):
        print(f"Error: {r}")
    else:
        print(r)
\`\`\`

### Tasks — fire and forget

\`asyncio.create_task()\` schedules a coroutine to start running immediately in the background. You can await it later to get the result:

\`\`\`python
async def main():
    # Start the background task immediately
    background = asyncio.create_task(send_analytics_event("page_view"))

    # Do other work while the background task runs
    data = await load_page_data()

    # Now wait for the background task to finish
    await background

    return data
\`\`\`

### When to use async vs other approaches

| Situation | Best choice | Why |
|-----------|------------|-----|
| Making HTTP requests, querying databases, reading files | **async / await** | I/O-bound — waiting is the bottleneck |
| Heavy computation: image processing, data crunching | **multiprocessing** | CPU-bound — the Python GIL blocks threads |
| Using legacy libraries that don't support async | **threading** | Threads work with blocking I/O too |
| Simple parallelism with a clean API | **concurrent.futures** | Hides thread/process pool complexity |

### The GIL — why async cannot speed up CPU work

The **Global Interpreter Lock (GIL)** is a mutex that prevents more than one Python thread from running bytecode simultaneously. This means threading and async help with I/O (where you are waiting, not computing) but do nothing for pure computation.

To actually run Python code in parallel on multiple CPU cores, you must use **multiprocessing**, which spawns separate processes, each with their own GIL.`,
  },
  {
    slug: "testing",
    title: "Testing with pytest",
    description: "Writing tests, fixtures, parametrize, mocking, and measuring coverage — with clear explanations of why each matters.",
    category: "python",
    content: `## Testing with pytest

### Why write tests?

Tests are a safety net. Every time you change code, you risk breaking something that worked before. Without tests, you either manually check everything (slow and error-prone) or ship bugs. With tests, you run one command and know instantly if anything broke.

Tests also force you to think about your code's behaviour from the outside — this often reveals design problems that are not obvious when you are inside the implementation.

### Installing and running pytest

\`\`\`bash
pip install pytest pytest-cov

pytest                              # find and run all tests in the project
pytest tests/test_user.py           # run one specific file
pytest tests/test_user.py::test_login   # run one specific test
pytest -v                           # verbose mode — shows each test name
pytest -k "login"                   # run only tests whose name contains "login"
pytest --tb=short                   # shorter error output
\`\`\`

pytest finds tests automatically by looking for files named \`test_*.py\` and functions named \`test_*\`. No registration needed.

### Writing your first tests

Each test is a function that checks one thing. Use Python's \`assert\` statement to verify the expected outcome. If the assertion fails, pytest shows you exactly what the actual value was:

\`\`\`python
# tests/test_math.py
from myapp.utils import add, slugify

def test_add_returns_correct_sum():
    assert add(2, 3) == 5

def test_add_works_with_negatives():
    assert add(-1, -1) == -2

def test_add_with_zero():
    assert add(0, 99) == 99

def test_slugify_replaces_spaces_with_hyphens():
    assert slugify("hello world") == "hello-world"

def test_slugify_lowercases_the_result():
    assert slugify("PYTHON") == "python"
\`\`\`

Name tests as descriptions of what they verify — \`test_add_works_with_negatives\` is far more helpful than \`test_add_2\`.

### Testing that exceptions are raised

Sometimes the correct behaviour is to raise an error. Test this with \`pytest.raises\`:

\`\`\`python
import pytest
from myapp.utils import divide, set_age

def test_dividing_by_zero_raises_error():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_negative_age_raises_value_error():
    with pytest.raises(ValueError, match="cannot be negative"):
        set_age(-5)          # match= checks the error message too
\`\`\`

### Fixtures — reusable setup and teardown

Imagine every test needs a database connection or a freshly created user. Without fixtures, you copy that setup code into every test. With fixtures, you define it once and pytest injects it automatically:

\`\`\`python
import pytest
from myapp.database import Database

@pytest.fixture
def db():
    # SETUP: runs before the test
    database = Database(url=":memory:")   # use in-memory DB for tests
    database.run_migrations()

    yield database                        # TEST: receives this value

    # TEARDOWN: runs after the test, even if the test failed
    database.drop_all()
    database.close()

# pytest sees 'db' in the parameter list and calls the fixture
def test_create_user(db):
    user = db.create("alice@example.com", name="Alice")
    assert user.id is not None
    assert user.email == "alice@example.com"

def test_cannot_create_duplicate_email(db):
    db.create("alice@example.com", name="Alice")
    with pytest.raises(ValueError, match="already exists"):
        db.create("alice@example.com", name="Alice2")
\`\`\`

**Fixture scope** controls how often setup/teardown runs:

| Scope | Setup runs |
|-------|-----------|
| \`function\` (default) | Before each test — fresh state every time |
| \`class\` | Once before all tests in a class |
| \`module\` | Once for the entire test file |
| \`session\` | Once for the entire test run |

Use a broader scope when setup is expensive (like starting a server) and you are sure the shared state is safe.

### Parametrize — test one function with many inputs

Instead of writing five nearly-identical tests, define them as a table of inputs and expected outputs:

\`\`\`python
import pytest

@pytest.mark.parametrize("text, expected", [
    ("hello world",   "hello-world"),
    ("PYTHON 3",      "python-3"),
    ("  leading  ",   "leading"),
    ("already-ok",    "already-ok"),
    ("special!chars", "specialchars"),
])
def test_slugify(text, expected):
    assert slugify(text) == expected
\`\`\`

pytest runs this as five separate tests and reports each independently. If one fails, the others still run.

### Mocking — replace real dependencies with controlled stand-ins

Tests should be fast and not depend on external systems like email servers, payment APIs, or third-party services. **Mocking** lets you replace these with a fake version that you control:

\`\`\`python
from unittest.mock import patch, MagicMock

def test_welcome_email_is_sent_on_registration():
    # Replace the real SMTP send function with a fake one
    with patch("myapp.mailer.send_smtp") as mock_send:
        mock_send.return_value = True   # make the fake say it succeeded

        # Call the function we actually want to test
        result = register_user("alice@example.com", "password123")

        # Verify the outcome
        assert result.success is True

        # Verify the email was sent with the right arguments
        mock_send.assert_called_once_with(
            to="alice@example.com",
            subject="Welcome!"
        )
\`\`\`

The real email is never sent. The test runs instantly and works offline.

### Measuring test coverage

Coverage shows you which lines of your code are actually executed during tests. Lines not covered are untested — potential hidden bugs:

\`\`\`bash
pytest --cov=myapp --cov-report=term-missing
# In the terminal: shows which specific lines are not covered

pytest --cov=myapp --cov-report=html
# Generates an HTML report — open htmlcov/index.html in your browser
\`\`\`

Aim for high coverage on your **core business logic**. Do not obsess over 100% — some code paths (like catastrophic system errors) are not practical to test directly.`,
  },
  {
    slug: "python-performance",
    title: "Performance & Best Practices",
    description: "How to profile code, avoid common traps, and write Pythonic code that is both fast and readable.",
    category: "python",
    content: `## Performance & Best Practices

### The golden rule: measure before you optimise

It is tempting to guess where the slow part is and start rewriting it. Almost always, the guess is wrong. Profile first — find the real bottleneck — then fix only that:

\`\`\`bash
# cProfile — shows which functions consume the most total time
python -m cProfile -s cumulative my_script.py | head -30
\`\`\`

\`\`\`python
import timeit

# Compare two approaches by running them thousands of times
def approach_a():
    result = ""
    for word in ["hello", "world", "python"]:
        result += word + " "
    return result

def approach_b():
    return " ".join(["hello", "world", "python"])

print(timeit.timeit(approach_a, number=100_000))   # e.g. 0.42s
print(timeit.timeit(approach_b, number=100_000))   # e.g. 0.09s  — 4x faster
\`\`\`

### String concatenation — join is always faster

When you use \`+\` to build a string inside a loop, Python creates a brand new string object on every iteration. With 1,000 iterations, that's 1,000 allocations and copies. The cost grows as O(n²):

\`\`\`python
# Slow — each += creates a new string and copies everything
result = ""
for line in lines:
    result += line + "\\n"

# Fast — collect into a list first, then join once at the end
parts = []
for line in lines:
    parts.append(line)
result = "\\n".join(parts)

# Even cleaner with a comprehension
result = "\\n".join(line for line in lines)
\`\`\`

### Use sets for membership testing

Checking \`if x in my_list\` scans the entire list every time — O(n). Checking \`if x in my_set\` uses a hash table — O(1). For a list of 1 million items, the set is roughly a million times faster:

\`\`\`python
# Every call to 'in' scans up to 1 million items
blocked_ips = ["192.168.1.1", "10.0.0.1", ...]   # 1 million entries

if request.ip in blocked_ips:    # slow
    block()

# Convert to a set once; every subsequent lookup is instant
blocked_ips = {"192.168.1.1", "10.0.0.1", ...}   # same data, set type

if request.ip in blocked_ips:    # fast
    block()
\`\`\`

### Generators for large data

If you build a list just to iterate through it once, you wasted the memory to hold every item. Use a generator instead:

\`\`\`python
# Loads every row into memory before processing starts
rows = [parse(line) for line in open("huge_file.csv")]
total = sum(row["value"] for row in rows)

# Parses and processes one row at a time — constant memory
total = sum(parse(line)["value"] for line in open("huge_file.csv"))
\`\`\`

### Cache expensive pure function results

If a function always returns the same output for the same input and is slow to compute, cache its results:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=512)
def fetch_user_permissions(user_id: int) -> frozenset:
    return frozenset(db.get_permissions(user_id))

# First call: hits the database
fetch_user_permissions(42)   # slow

# Subsequent calls with the same argument: returns cached result instantly
fetch_user_permissions(42)   # fast
\`\`\`

### \`__slots__\` — reduce memory for many instances

By default, each Python instance stores its attributes in a \`__dict__\` (a hash map). For a class you will create millions of instances of, declaring \`__slots__\` removes that dict and stores attributes in a compact fixed-size array instead:

\`\`\`python
class Point:
    __slots__ = ("x", "y")    # only these attributes are allowed

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

# Creating 10 million Points uses ~40% less memory with __slots__
\`\`\`

### Common pitfalls every Python developer hits

| Pitfall | What goes wrong | The fix |
|---------|----------------|---------|
| Mutable default argument | List/dict is shared across all calls | Default to \`None\`, create inside function |
| Bare \`except:\` | Catches Ctrl+C and \`sys.exit()\` too | Always name the exception: \`except ValueError:\` |
| \`== None\` instead of \`is None\` | Calls \`__eq__\`, which is slower and can be overridden | Always use \`is None\` and \`is not None\` |
| Modifying a list while iterating it | Skip items or get IndexError | Iterate a copy: \`for x in lst[:]:\` |
| Using \`+\` to build strings in loops | O(n²) time and memory | Collect into a list and \`join\` at the end |
| Opening files without \`with\` | File stays open if an exception occurs | Always use \`with open(...) as f:\` |

### Pythonic code — the readable way

\`\`\`python
# Swap two variables — no temp variable needed
a, b = b, a

# Check if a collection is empty
if not my_list:        ...    # not: if len(my_list) == 0
if my_dict:            ...    # not: if len(my_dict) > 0

# Unpack multiple return values cleanly
x, y, z = get_coordinates()
first, *rest = get_items()    # first item and everything else

# Conditional value assignment
role = "admin" if user.is_staff else "member"

# Avoid chained comparisons by using 'in'
if status in {"pending", "processing", "queued"}:
    ...

# Use enumerate — not range + index
for i, item in enumerate(items):
    print(f"{i}: {item}")

# Use dict.get() for safe access with a default
name = config.get("name", "Anonymous")

# Use any() and all() with generator expressions
if any(score > 90 for score in scores):
    award_bonus()

if all(field in data for field in required_fields):
    save(data)
\`\`\``,
  },
];

export default notes;
