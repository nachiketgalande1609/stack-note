import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "python-intro",
    title: "Python at a Glance",
    description: "What Python is, how it runs, the REPL, virtual environments, and why it dominates so many domains.",
    category: "python",
    content: `## Python at a Glance

Python is a **high-level, dynamically typed, interpreted** language built around a single guiding principle: code should be easy to read and write. Rather than fighting the language, you spend your energy solving the actual problem.

### How Python executes your code

Unlike C or Java, Python does not compile to machine code ahead of time. Instead:

- You write \`.py\` source files
- The **CPython interpreter** parses and compiles them to **bytecode** (\`.pyc\` files) on the fly
- The **Python Virtual Machine (PVM)** executes that bytecode line by line

\`\`\`
your_script.py  →  CPython compiler  →  bytecode (.pyc)  →  PVM runs it
\`\`\`

This means there is no separate compile step. Just run \`python3 script.py\` and it works.

### The REPL

Python ships with an interactive shell called the REPL (Read-Eval-Print Loop). It is perfect for experimenting:

\`\`\`python
python3
>>> 2 + 2
4
>>> "hello".upper()
'HELLO'
>>> [x**2 for x in range(5)]
[0, 1, 4, 9, 16]
>>> exit()
\`\`\`

Every expression you type is immediately evaluated and printed back. Use it constantly — it is faster than writing a script to test a small idea.

### Where Python is used

| Domain | Popular tools |
|--------|--------------|
| Web backends | Django, FastAPI, Flask |
| Data science & analytics | pandas, NumPy, Jupyter |
| Machine learning & AI | PyTorch, TensorFlow, scikit-learn |
| Scripting & automation | standard library, subprocess |
| DevOps & infrastructure | Ansible, AWS CDK |
| CLI tools | Click, Typer, argparse |

### Python versions

Always use **Python 3.10 or later**. Python 2 reached end-of-life in 2020 and should never be used in new projects. Check what you have installed:

\`\`\`bash
python3 --version
\`\`\`

### Virtual environments

Every project should have its own isolated set of packages. Without this, packages from one project can break another.

\`\`\`bash
# Create a virtual environment in .venv/
python3 -m venv .venv

# Activate it (Mac/Linux)
source .venv/bin/activate

# Activate it (Windows)
.venv\\Scripts\\activate

# Install packages — they go into .venv/, not globally
pip install requests fastapi

# Save your dependencies
pip freeze > requirements.txt

# Recreate environment from requirements
pip install -r requirements.txt
\`\`\`

### Code style

Python code follows **PEP 8** — the official style guide:

- **4 spaces** for indentation (never tabs)
- **snake_case** for variables and functions (\`user_name\`, \`get_user\`)
- **PascalCase** for classes (\`UserProfile\`, \`DatabaseError\`)
- **UPPER_SNAKE_CASE** for constants (\`MAX_RETRIES\`)
- Maximum line length of **79 characters**

Use **black** to auto-format and **ruff** to catch issues — both run in milliseconds.`,
  },
  {
    slug: "variables-types",
    title: "Variables & Data Types",
    description: "int, float, str, bool, None — how Python's type system works, type conversion, and type hints.",
    category: "python",
    content: `## Variables & Data Types

### How variables work in Python

Python variables are **references to objects**, not named memory boxes. When you write \`x = 42\`, you create an integer object \`42\` and point the name \`x\` at it. Multiple names can point to the same object:

\`\`\`python
a = [1, 2, 3]
b = a          # b points to the SAME list, not a copy
b.append(4)
print(a)       # [1, 2, 3, 4]  ← a is also changed!
\`\`\`

This matters enormously when working with mutable objects like lists and dicts.

### Core built-in types

| Type | Example | Notes |
|------|---------|-------|
| \`int\` | \`42\`, \`-7\`, \`1_000_000\` | Arbitrary precision, no overflow |
| \`float\` | \`3.14\`, \`2.0e10\` | 64-bit IEEE 754 |
| \`str\` | \`"hello"\`, \`'world'\` | Immutable, Unicode by default |
| \`bool\` | \`True\`, \`False\` | Subclass of int (True==1, False==0) |
| \`NoneType\` | \`None\` | Python's null — exactly one instance exists |

\`\`\`python
x       = 42
pi      = 3.14159
name    = "Alice"
active  = True
nothing = None
\`\`\`

### Number operations

Python's integer division and modulo behave consistently with mathematics:

\`\`\`python
10 / 3    # 3.3333...  (true division — always returns float)
10 // 3   # 3          (floor division — rounds toward -infinity)
10 % 3    # 1          (modulo — remainder)
2 ** 10   # 1024       (exponentiation)
abs(-5)   # 5
round(3.567, 2)  # 3.57
\`\`\`

Underscores in numbers are ignored and improve readability:
\`\`\`python
population = 8_100_000_000
\`\`\`

### Strings — immutable sequences of Unicode characters

Strings cannot be changed after creation. Every "modification" creates a new string:

\`\`\`python
s = "hello"
s[0] = "H"         # TypeError — strings are immutable
s = s.capitalize() # creates a new string "Hello"
\`\`\`

Common string operations:

\`\`\`python
"hello".upper()            # 'HELLO'
"WORLD".lower()            # 'world'
"  hi  ".strip()           # 'hi'
"a,b,c".split(",")         # ['a', 'b', 'c']
",".join(["a","b","c"])    # 'a,b,c'
"hello".replace("l", "r")  # 'herro'
"hello"[1:4]               # 'ell'  (slicing)
len("hello")               # 5
"ll" in "hello"            # True
\`\`\`

### f-strings — the preferred way to format strings

f-strings (Python 3.6+) are faster and more readable than \`%\` formatting or \`.format()\`:

\`\`\`python
name  = "Alice"
age   = 30
score = 98.5

f"Name: {name}, Age: {age}"         # "Name: Alice, Age: 30"
f"Score: {score:.1f}%"              # "Score: 98.5%"
f"2 + 2 = {2 + 2}"                 # "2 + 2 = 4"
f"{name!r}"                         # "'Alice'"  (repr format)
f"{1_000_000:,}"                    # "1,000,000" (number format)
\`\`\`

### Truthiness and falsy values

In Python, many values are considered "falsy" in boolean context — you don't always need to compare explicitly:

| Falsy values | Truthy values |
|-------------|--------------|
| \`None\` | Everything else |
| \`False\` | \`True\` |
| \`0\`, \`0.0\` | Any nonzero number |
| \`""\` (empty string) | Any non-empty string |
| \`[]\`, \`{}\`, \`set()\` | Any non-empty collection |

\`\`\`python
if user_list:           # True if list is non-empty
    process(user_list)

if not response:        # True if response is falsy (None, empty, 0…)
    handle_missing()
\`\`\`

### Type checking and conversion

\`\`\`python
type(42)                     # <class 'int'>
isinstance(42, int)          # True
isinstance(42, (int, float)) # True — check multiple types at once

# Explicit conversion
int("42")        # 42
int(3.9)         # 3  (truncates, does not round)
float("3.14")    # 3.14
str(100)         # "100"
bool(0)          # False
bool("hello")    # True
list("abc")      # ['a', 'b', 'c']
\`\`\`

### Type hints

Type hints let you annotate what types a function expects and returns. They are **not enforced at runtime** — they are documentation for humans and tools like mypy or your IDE:

\`\`\`python
def greet(name: str, times: int = 1) -> str:
    return (name + " ") * times

# Python 3.10+ uses | for "or"
def find(user_id: int) -> str | None:
    ...

# Older style
from typing import Optional
def find(user_id: int) -> Optional[str]:
    ...
\`\`\``,
  },
  {
    slug: "control-flow",
    title: "Control Flow",
    description: "if/elif/else, for, while, break/continue, comprehensions — controlling the path through your code.",
    category: "python",
    content: `## Control Flow

Control flow determines which code runs and in what order. Python's syntax is deliberately minimal — no braces or parentheses required, just consistent indentation.

### if / elif / else

The condition can be any expression that evaluates to truthy or falsy. Python checks branches top-to-bottom and stops at the first true one:

\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
\`\`\`

### Ternary — one-line conditional

When you need to assign one of two values based on a condition, use the inline form. Keep it simple — if the condition or values are complex, use a regular if/else block:

\`\`\`python
label  = "pass" if score >= 60 else "fail"
status = "active" if user.is_active else "inactive"
\`\`\`

### for loops — iterating over sequences

Python's \`for\` loop works on **any iterable** — lists, strings, dicts, files, generators, and more. You never need an index unless you specifically want one:

\`\`\`python
# Iterate over a list
for name in ["Alice", "Bob", "Carol"]:
    print(name)

# Iterate over a range of numbers
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 2): # 2, 4, 6, 8  (start, stop, step)
    print(i)
\`\`\`

### enumerate — get index and value together

Avoid the anti-pattern \`for i in range(len(items))\`. Use \`enumerate\` instead:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Avoid this
for i in range(len(fruits)):
    print(i, fruits[i])

# Do this
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)   # 1 apple, 2 banana, 3 cherry
\`\`\`

### zip — iterate two sequences together

\`\`\`python
names  = ["Alice", "Bob", "Carol"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
\`\`\`

### while loops

Use \`while\` when you don't know the number of iterations in advance:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1

# Common pattern: loop until condition is met
while not queue.empty():
    item = queue.get()
    process(item)
\`\`\`

### break and continue

- **break** exits the loop immediately
- **continue** skips the rest of the current iteration and moves to the next

\`\`\`python
for n in range(10):
    if n == 3:
        continue    # skip 3, keep going
    if n == 7:
        break       # stop entirely
    print(n)        # prints: 0 1 2 4 5 6
\`\`\`

### for / else — the underused pattern

The \`else\` block on a loop runs **only if the loop finished without hitting break**. This is a clean way to express "search and report if not found":

\`\`\`python
target = 42
for item in data:
    if item == target:
        print("Found!")
        break
else:
    print("Not found in data")  # only runs if break never fired
\`\`\`

### List comprehensions — concise collection building

Comprehensions replace simple \`for\` loops that build a list. They are more readable and often faster:

\`\`\`python
# Traditional loop
squares = []
for x in range(10):
    squares.append(x ** 2)

# Comprehension — same result, one line
squares = [x ** 2 for x in range(10)]

# With a filter
evens = [x for x in range(20) if x % 2 == 0]

# Nested — flatten a matrix
flat = [n for row in matrix for n in row]
\`\`\`

Dict and set comprehensions follow the same pattern:

\`\`\`python
word_lengths = {word: len(word) for word in ["apple", "fig", "mango"]}
# {"apple": 5, "fig": 3, "mango": 5}

unique_lengths = {len(word) for word in words}
# {3, 5}  — a set, so duplicates are removed
\`\`\`

### When not to use comprehensions

If the logic requires multiple steps, side effects, or is hard to read in one line — use a regular loop. Comprehensions should be immediately understandable at a glance.`,
  },
  {
    slug: "functions",
    title: "Functions",
    description: "def, default args, *args, **kwargs, lambdas, closures, and decorators explained.",
    category: "python",
    content: `## Functions

Functions are the primary unit of reuse in Python. A well-designed function does one thing, takes clearly named inputs, and returns a clear output.

### Defining functions

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b
\`\`\`

- The \`def\` keyword starts the definition
- Type hints (\`: int\`, \`-> int\`) are optional but recommended
- \`return\` sends a value back; without it the function returns \`None\`

### Default arguments

Parameters can have default values. They make arguments optional for the caller:

\`\`\`python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

greet("Alice")           # "Hello, Alice!"
greet("Bob", "Hi")       # "Hi, Bob!"
greet("Carol", greeting="Hey")  # "Hey, Carol!"
\`\`\`

**Critical rule: never use mutable objects as default arguments.** The default is created once when the function is defined, not each time it is called. This causes a classic bug:

\`\`\`python
# WRONG — 'results' is shared across all calls
def add_item(item, results=[]):
    results.append(item)
    return results

add_item("a")  # ["a"]
add_item("b")  # ["a", "b"]  ← bug! previous call's list

# CORRECT — create a fresh list each call
def add_item(item, results=None):
    if results is None:
        results = []
    results.append(item)
    return results
\`\`\`

### *args — variable positional arguments

When a function accepts any number of positional arguments, collect them into a tuple with \`*args\`:

\`\`\`python
def total(*args: int) -> int:
    return sum(args)

total(1, 2, 3)      # 6
total(10, 20)       # 30
total()             # 0
\`\`\`

### **kwargs — variable keyword arguments

Collect any number of keyword arguments into a dict with \`**kwargs\`:

\`\`\`python
def log(**kwargs) -> None:
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

log(user="Alice", action="login", ip="192.168.1.1")
\`\`\`

### Keyword-only arguments

Place \`*\` in the signature to force callers to use keyword syntax for the following parameters. This prevents accidental positional mistakes:

\`\`\`python
def create_user(name: str, *, role: str = "member", active: bool = True):
    ...

create_user("Alice", role="admin")   # correct
create_user("Alice", "admin")        # TypeError — role must be keyword
\`\`\`

### Lambdas — anonymous one-liners

A lambda is a function without a name. Use them for short callbacks — if the logic is more than one expression, write a regular \`def\`:

\`\`\`python
square = lambda x: x ** 2
square(5)   # 25

# Common use: sort key
users.sort(key=lambda u: u["score"], reverse=True)
\`\`\`

### Closures — functions that remember their environment

A closure is a function that captures variables from the scope where it was defined, even after that scope has ended:

\`\`\`python
def make_multiplier(factor: int):
    def multiply(n: int) -> int:
        return n * factor    # 'factor' is captured from outer scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

double(7)   # 14
triple(7)   # 21
\`\`\`

This is the foundation of decorators and factory functions.

### Decorators — wrapping functions with extra behaviour

A decorator is a function that takes a function and returns a new, enhanced function. The \`@syntax\` is syntactic sugar for \`func = decorator(func)\`:

\`\`\`python
import time
from functools import wraps

def timer(func):
    @wraps(func)          # preserves original function's name and docstring
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

slow_function()   # "slow_function took 1.001s"
\`\`\`

Decorators stack — the bottom one is applied first:

\`\`\`python
@require_auth
@timer
def get_profile(user_id: int):
    ...
# equivalent to: get_profile = require_auth(timer(get_profile))
\`\`\``,
  },
  {
    slug: "data-structures",
    title: "Built-in Data Structures",
    description: "list, dict, set, tuple — what each is for, key operations, and when to choose which.",
    category: "python",
    content: `## Built-in Data Structures

Python's four built-in collection types cover almost every use case. Choosing the right one affects both correctness and performance.

| Type | Ordered | Mutable | Allows duplicates | Key operation |
|------|---------|---------|-------------------|---------------|
| \`list\` | Yes | Yes | Yes | Access by index |
| \`dict\` | Yes (3.7+) | Yes | Keys: No | Access by key |
| \`set\` | No | Yes | No | Fast membership test |
| \`tuple\` | Yes | **No** | Yes | Unpack, immutable record |

### list — ordered, mutable sequence

The workhorse collection. Use it when order matters and you need to add/remove items:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Adding
fruits.append("date")           # add to end
fruits.insert(1, "avocado")     # insert at index 1
fruits.extend(["elderberry"])   # add multiple

# Removing
fruits.pop()                    # remove and return last item
fruits.pop(0)                   # remove and return item at index 0
fruits.remove("banana")         # remove first occurrence by value

# Searching and sorting
fruits.index("cherry")          # index of first occurrence
"apple" in fruits               # True — membership check
fruits.sort()                   # in-place sort
sorted(fruits)                  # returns new sorted list, original unchanged
fruits.reverse()                # in-place reverse
\`\`\`

**Slicing** — extract sub-lists without modifying the original:

\`\`\`python
lst = [0, 1, 2, 3, 4, 5]
lst[2:5]      # [2, 3, 4]       — from index 2 up to (not including) 5
lst[:3]       # [0, 1, 2]       — from start to index 3
lst[3:]       # [3, 4, 5]       — from index 3 to end
lst[::2]      # [0, 2, 4]       — every second element
lst[::-1]     # [5, 4, 3, 2, 1, 0]  — reversed
lst[:]        # [0, 1, 2, 3, 4, 5]  — shallow copy
\`\`\`

### dict — key-value mapping

Dicts are the go-to structure for labelled data. Keys must be hashable (strings, numbers, tuples):

\`\`\`python
user = {"name": "Alice", "age": 30, "active": True}

# Reading
user["name"]                  # "Alice" — raises KeyError if missing
user.get("phone")             # None — safe, no error
user.get("phone", "N/A")      # "N/A" — with default

# Writing
user["email"] = "alice@example.com"   # add or update

# Removing
user.pop("age")               # removes key and returns value
del user["active"]            # removes key, no return

# Iterating
for key in user:                    print(key)
for key, val in user.items():       print(key, val)
for val in user.values():           print(val)

# Merge two dicts (Python 3.9+)
defaults = {"timeout": 30, "retries": 3}
config = defaults | {"timeout": 60}      # {"timeout": 60, "retries": 3}
\`\`\`

### set — unordered collection of unique values

Sets automatically eliminate duplicates and provide O(1) membership tests. Use them for deduplication and mathematical set operations:

\`\`\`python
tags = {"python", "web", "python"}  # {"python", "web"} — duplicate removed

tags.add("api")
tags.discard("web")    # removes if present — no error if missing
tags.remove("web")     # removes — raises KeyError if missing

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b       # Union:        {1, 2, 3, 4, 5, 6}
a & b       # Intersection: {3, 4}
a - b       # Difference:   {1, 2}  (in a but not b)
a ^ b       # Symmetric difference: {1, 2, 5, 6}
\`\`\`

### tuple — ordered, immutable sequence

Tuples are like lists that cannot change. Use them for fixed records, function returns, and dictionary keys:

\`\`\`python
point    = (10, 20)
rgb      = (255, 128, 0)
response = (200, "OK", {"data": []})

# Unpacking — extract values into variables
x, y = point
status, message, body = response

# Star unpacking
first, *rest = (1, 2, 3, 4, 5)   # first=1, rest=[2,3,4,5]
*head, last  = (1, 2, 3, 4, 5)   # head=[1,2,3,4], last=5
\`\`\`

### Performance comparison

| Operation | list | dict / set |
|-----------|------|-----------|
| Access by index/key | O(1) | O(1) |
| Membership (\`in\`) | **O(n)** — scans every item | O(1) — hash lookup |
| Append to end | O(1) amortized | O(1) |
| Insert at start | **O(n)** — shifts everything | O(1) |
| Delete by value | **O(n)** | O(1) |

If you find yourself writing \`if x in my_list\` inside a loop, convert the list to a set first.

### collections module — specialised containers

\`\`\`python
from collections import defaultdict, Counter, deque

# defaultdict — no KeyError on first access to a missing key
groups = defaultdict(list)
for user in users:
    groups[user.role].append(user.name)

# Counter — count occurrences of each element
letter_counts = Counter("abracadabra")
# Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
letter_counts.most_common(2)   # [('a', 5), ('b', 2)]

# deque — O(1) appends and pops from both ends
queue = deque([1, 2, 3])
queue.appendleft(0)   # [0, 1, 2, 3]
queue.popleft()       # 0 — fast, unlike list.pop(0)
\`\`\``,
  },
  {
    slug: "oop",
    title: "Object-Oriented Programming",
    description: "Classes, __init__, inheritance, dunder methods, properties, and dataclasses — with clear explanations.",
    category: "python",
    content: `## Object-Oriented Programming

OOP organises code around **objects** — bundles of data (attributes) and behaviour (methods). Python is fully object-oriented but does not force you to use classes — use them when the data and its associated operations naturally belong together.

### Defining a class

\`\`\`python
class Animal:
    species = "Unknown"          # class attribute — shared by all instances

    def __init__(self, name: str, age: int):
        self.name = name         # instance attribute — unique to each object
        self.age = age

    def speak(self) -> str:
        return f"{self.name} makes a sound"

    def __repr__(self) -> str:
        return f"Animal(name={self.name!r}, age={self.age})"

    def __str__(self) -> str:
        return self.name
\`\`\`

- \`__init__\` is the **constructor** — it runs when you create an instance
- \`self\` refers to the instance being operated on. Always the first parameter
- **Class attributes** are defined in the class body and shared. **Instance attributes** are set on \`self\` and are unique per object

### Creating and using instances

\`\`\`python
cat = Animal("Whiskers", 4)
dog = Animal("Rex", 2)

print(cat.name)    # "Whiskers"
print(cat)         # "Whiskers"  (calls __str__)
repr(dog)          # "Animal(name='Rex', age=2)"  (calls __repr__)

Animal.species     # "Unknown"
cat.species        # "Unknown"  — found on the class
\`\`\`

### Inheritance — reusing and extending classes

A subclass **inherits** everything from its parent and can override or extend it:

\`\`\`python
class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str):
        super().__init__(name, age)   # always call parent's __init__
        self.breed = breed

    def speak(self) -> str:           # override parent's method
        return f"{self.name} barks!"

    def fetch(self) -> str:           # add new behaviour
        return f"{self.name} fetches the ball"

rex = Dog("Rex", 3, "Labrador")
rex.speak()                # "Rex barks!"
isinstance(rex, Dog)       # True
isinstance(rex, Animal)    # True — Dog is an Animal
\`\`\`

### Dunder (magic) methods

Dunder methods let your objects work with Python's built-in operators and syntax. You define \`__add__\` and \`+\` just works:

| Method | Triggered by |
|--------|-------------|
| \`__init__\` | \`MyClass(...)\` — constructor |
| \`__repr__\` | \`repr(obj)\` — unambiguous representation |
| \`__str__\` | \`str(obj)\`, \`print(obj)\` — readable string |
| \`__len__\` | \`len(obj)\` |
| \`__eq__\` | \`obj == other\` |
| \`__lt__\` | \`obj < other\` (also enables sorting) |
| \`__add__\` | \`obj + other\` |
| \`__contains__\` | \`x in obj\` |
| \`__iter__\` | \`for x in obj:\` |
| \`__enter__\` / \`__exit__\` | \`with obj:\` context manager |

### Properties — controlled attribute access

Properties let you run code when an attribute is read, written, or deleted — without changing the calling syntax:

\`\`\`python
class Circle:
    def __init__(self, radius: float):
        self._radius = radius     # convention: _ prefix means "internal"

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self) -> float:      # computed attribute — read-only
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
c.radius      # 5   (calls getter)
c.radius = 10 # calls setter — validation runs
c.area        # 314.159…
\`\`\`

### dataclasses — eliminate boilerplate

For classes that mainly hold data, \`@dataclass\` auto-generates \`__init__\`, \`__repr__\`, and \`__eq__\`:

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class User:
    name:  str
    email: str
    age:   int = 0
    tags:  list[str] = field(default_factory=list)

    def is_adult(self) -> bool:
        return self.age >= 18

alice = User("Alice", "alice@example.com", 30)
print(alice)   # User(name='Alice', email='alice@example.com', age=30, tags=[])
alice == User("Alice", "alice@example.com", 30)  # True — __eq__ compares fields
\`\`\`

### Class methods and static methods

\`\`\`python
class Config:
    _instance = None

    @classmethod
    def get_instance(cls):
        # cls is the class itself — useful for alternate constructors
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @staticmethod
    def validate_key(key: str) -> bool:
        # No cls or self — just a function namespaced to the class
        return len(key) >= 8
\`\`\`

- Use \`@classmethod\` for factory methods or when you need access to the class
- Use \`@staticmethod\` for utility functions that logically belong to the class but don't need instance or class data`,
  },
  {
    slug: "modules-packages",
    title: "Modules & Packages",
    description: "import, creating your own modules, packages, __name__, and the standard library.",
    category: "python",
    content: `## Modules & Packages

### What is a module?

Any \`.py\` file is a module. Modules let you split code across files and reuse it. When Python imports a module, it executes it once and caches it — subsequent imports reuse the cached version.

### Importing

\`\`\`python
import math                        # import the whole module
math.sqrt(16)                      # access with module prefix

from math import sqrt, pi          # import specific names
sqrt(16)                           # use directly, no prefix

from math import sqrt as sq        # alias to avoid name collisions
sq(16)

import numpy as np                 # conventional alias
np.array([1, 2, 3])
\`\`\`

Avoid \`from module import *\` — it floods your namespace with unknown names and makes code hard to reason about.

### Creating your own module

Write a file \`utils.py\`:

\`\`\`python
# utils.py
def slugify(text: str) -> str:
    return text.lower().strip().replace(" ", "-")

MAX_RETRIES = 3
\`\`\`

Import and use it from another file in the same directory:

\`\`\`python
# main.py
from utils import slugify, MAX_RETRIES

slugify("Hello World")   # "hello-world"
\`\`\`

### The \`__name__\` guard

When Python runs a file directly, it sets \`__name__\` to \`"__main__"\`. When the file is imported by another module, \`__name__\` is the module's filename. This guard lets you write code that only runs when the file is executed directly:

\`\`\`python
def main():
    print("Running the program")

if __name__ == "__main__":
    main()   # Only runs with: python script.py
             # NOT when: import script
\`\`\`

### Packages — organising modules into directories

A directory with an \`__init__.py\` file is a **package**. The \`__init__.py\` can be empty or contain initialisation code:

\`\`\`
myapp/
  __init__.py
  models/
    __init__.py
    user.py
    product.py
  services/
    __init__.py
    email.py
    payment.py
  utils/
    __init__.py
    format.py
\`\`\`

\`\`\`python
from myapp.models.user import User
from myapp.services.email import send_welcome
from myapp.utils.format import slugify
\`\`\`

### Relative imports (within a package)

\`\`\`python
# Inside myapp/services/email.py
from ..models.user import User    # go up one level, then into models
from .payment import charge       # same package
\`\`\`

### Standard library highlights

Python ships with a vast standard library — you can do enormous amounts without installing anything:

| Module | What it gives you |
|--------|------------------|
| \`os\` | File paths, environment variables, process info |
| \`sys\` | Command-line args, Python version, \`sys.exit()\` |
| \`pathlib\` | Object-oriented file path manipulation |
| \`json\` | Encode and decode JSON |
| \`re\` | Regular expressions |
| \`datetime\` | Dates, times, timezones, duration |
| \`collections\` | Counter, defaultdict, deque, namedtuple |
| \`itertools\` | chain, product, combinations, groupby |
| \`functools\` | lru_cache, partial, reduce, wraps |
| \`dataclasses\` | Auto-generated class boilerplate |
| \`logging\` | Structured application logging |
| \`subprocess\` | Run shell commands |
| \`threading\` | OS threads for I/O concurrency |
| \`multiprocessing\` | True parallelism for CPU-bound work |
| \`urllib\` / \`http\` | HTTP without third-party libs |
| \`unittest\` | Built-in testing (use pytest in practice) |

### pathlib — the modern way to handle files

\`\`\`python
from pathlib import Path

p = Path("data/reports/2024")
p.mkdir(parents=True, exist_ok=True)   # create directory tree

config = Path("config.json")
config.exists()        # True or False
config.is_file()
config.suffix          # ".json"
config.stem            # "config"
config.parent          # Path(".")

# Build paths safely (cross-platform)
output = p / "summary.csv"

# Read and write
text = config.read_text(encoding="utf-8")
config.write_text('{"debug": true}')

# Find files recursively
for py_file in Path(".").glob("**/*.py"):
    print(py_file)
\`\`\``,
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    description: "try/except/finally, exception types, raising errors, custom exceptions, and context managers.",
    category: "python",
    content: `## Error Handling

Good error handling makes programs predictable: they fail clearly and clean up after themselves rather than crashing silently or leaving data in a broken state.

### How exceptions work

When an error occurs, Python raises an **exception** — an object describing what went wrong. If nothing catches it, the program prints a traceback and exits. You catch exceptions with \`try/except\`.

\`\`\`python
try:
    result = 10 / int(input("Enter a number: "))
except ZeroDivisionError:
    print("Cannot divide by zero")
except ValueError as e:
    print(f"Invalid input: {e}")
else:
    print(f"Result: {result}")    # runs only when NO exception occurred
finally:
    print("This always runs")     # cleanup — runs whether or not an exception happened
\`\`\`

- \`except\` catches and handles the error
- \`else\` contains code that should only run on success (keeps "happy path" separate from error handling)
- \`finally\` always runs — use it to release resources

### The exception hierarchy

Python's exceptions form a tree. Catching a parent class also catches all its children:

\`\`\`
BaseException
├── SystemExit            ← raised by sys.exit()
├── KeyboardInterrupt     ← Ctrl+C
└── Exception             ← all normal errors inherit from this
    ├── ValueError        ← wrong value type/range
    ├── TypeError         ← wrong type for operation
    ├── IndexError        ← list index out of range
    ├── KeyError          ← dict key not found
    ├── AttributeError    ← object has no such attribute
    ├── NameError         ← variable not defined
    ├── OSError
    │   └── FileNotFoundError
    ├── ZeroDivisionError
    └── RuntimeError
\`\`\`

Always catch the **most specific** exception first. Avoid bare \`except:\` — it catches even \`SystemExit\` and \`KeyboardInterrupt\`, which is almost never what you want.

### Raising exceptions

Use \`raise\` to signal that something went wrong. Include a clear, actionable message:

\`\`\`python
def set_age(age: int) -> None:
    if not isinstance(age, int):
        raise TypeError(f"Age must be int, got {type(age).__name__}")
    if age < 0 or age > 150:
        raise ValueError(f"Age out of range: {age}")

# Re-raise an exception after logging it
try:
    risky_operation()
except Exception as e:
    log.error("Failed: %s", e)
    raise   # re-raises the same exception
\`\`\`

### Custom exceptions

Define your own exception hierarchy to distinguish your app's errors from built-in ones:

\`\`\`python
class AppError(Exception):
    """Base class for all application errors."""
    pass

class AuthError(AppError):
    def __init__(self, message: str, code: int = 401):
        super().__init__(message)
        self.code = code

class NotFoundError(AppError):
    pass
\`\`\`

\`\`\`python
try:
    raise AuthError("Token has expired", code=401)
except AuthError as e:
    return {"error": str(e), "code": e.code}
except AppError as e:
    return {"error": str(e)}
\`\`\`

### Context managers — guaranteed cleanup

The \`with\` statement ensures cleanup code (closing a file, releasing a lock) always runs, even if an exception occurs. It calls \`__enter__\` on entry and \`__exit__\` on exit:

\`\`\`python
# Without context manager — buggy if exception occurs before close()
f = open("data.txt")
data = f.read()   # if this raises, f.close() never runs
f.close()

# With context manager — file ALWAYS closed
with open("data.txt", "r") as f:
    data = f.read()

# Multiple resources in one statement
with open("input.txt") as src, open("output.txt", "w") as dst:
    dst.write(src.read())
\`\`\`

### Writing your own context manager

The easiest way is with \`@contextmanager\` from functools:

\`\`\`python
from contextlib import contextmanager
import time

@contextmanager
def timer(label: str):
    start = time.time()
    try:
        yield                      # code inside 'with' block runs here
    finally:
        elapsed = time.time() - start
        print(f"{label}: {elapsed:.3f}s")

with timer("data loading"):
    load_large_dataset()
# prints: "data loading: 2.341s"
\`\`\``,
  },
  {
    slug: "iterators-generators",
    title: "Iterators & Generators",
    description: "The iterator protocol, yield, generator expressions, and lazy evaluation for memory-efficient code.",
    category: "python",
    content: `## Iterators & Generators

### What is an iterable vs an iterator?

- An **iterable** is any object you can loop over: lists, strings, dicts, files, etc.
- An **iterator** is an object that produces values one at a time and remembers where it left off.
- Every iterator is an iterable. Not every iterable is an iterator.

When Python's \`for\` loop runs, it calls \`iter()\` to get an iterator, then repeatedly calls \`next()\` until \`StopIteration\` is raised:

\`\`\`python
nums = [1, 2, 3]
it = iter(nums)      # get an iterator

next(it)   # 1
next(it)   # 2
next(it)   # 3
next(it)   # raises StopIteration — loop ends
\`\`\`

### Custom iterator

Implement \`__iter__\` (return self) and \`__next__\` (return next value or raise StopIteration):

\`\`\`python
class Countdown:
    def __init__(self, start: int):
        self.n = start

    def __iter__(self):
        return self           # the iterator is the object itself

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

for x in Countdown(5):
    print(x)      # 5 4 3 2 1
\`\`\`

### Generators — the easy way to write iterators

A **generator function** uses \`yield\` instead of \`return\`. When called, it returns a generator object immediately without running any code. The code runs lazily — pausing at each \`yield\` and resuming on the next \`next()\` call.

This is enormously valuable: you can produce millions of values without ever holding them all in memory at once:

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:               # infinite sequence — but lazy!
        yield a
        a, b = b, a + b

gen = fibonacci()
next(gen)   # 0
next(gen)   # 1
next(gen)   # 1
next(gen)   # 2

# First 10 Fibonacci numbers
import itertools
list(itertools.islice(fibonacci(), 10))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

### Real-world generator: chunked file reading

Without a generator, reading a large file loads everything into memory. With a generator, you process one chunk at a time:

\`\`\`python
def read_in_chunks(filepath: str, chunk_size: int = 8192):
    with open(filepath, "rb") as f:
        while chunk := f.read(chunk_size):
            yield chunk              # caller gets one chunk, then we pause

for chunk in read_in_chunks("large_video.mp4"):
    upload_chunk(chunk)             # memory usage stays constant
\`\`\`

### Generator expressions — lazy comprehensions

Same syntax as list comprehensions but with \`()\` instead of \`[]\`. Nothing is computed until you iterate:

\`\`\`python
# List comprehension — builds ALL squares immediately
squares_list = [x**2 for x in range(1_000_000)]    # uses ~8MB of RAM

# Generator expression — computes one at a time
squares_gen  = (x**2 for x in range(1_000_000))    # uses ~200 bytes

# Works perfectly in sum/any/all — no intermediate list needed
total = sum(x**2 for x in range(1_000_000))
found = any(x > 500 for x in data)
\`\`\`

### \`yield from\` — delegating to another iterable

\`yield from\` forwards every item from an iterable as if you had yielded them one by one:

\`\`\`python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)   # recurse into sub-lists
        else:
            yield item

list(flatten([1, [2, 3], [4, [5, 6]]]))   # [1, 2, 3, 4, 5, 6]
\`\`\`

### itertools — power tools for iterators

\`\`\`python
from itertools import islice, chain, combinations, groupby, product

# chain — join multiple iterables
list(chain([1,2], [3,4], [5]))   # [1, 2, 3, 4, 5]

# combinations
list(combinations("ABC", 2))    # [('A','B'), ('A','C'), ('B','C')]

# product — cartesian product (nested loops)
list(product([1,2], ["a","b"])) # [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# groupby — group consecutive identical keys
data = [("a",1), ("a",2), ("b",3)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(key, list(group))
\`\`\``,
  },
  {
    slug: "file-io",
    title: "File I/O & JSON",
    description: "Reading and writing text and binary files, JSON serialisation, CSV, and working with paths.",
    category: "python",
    content: `## File I/O & JSON

### Opening files — always use \`with\`

The \`with\` statement guarantees the file is closed when the block exits, even if an exception occurs:

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()         # entire file as one string

with open("data.txt") as f:
    lines = f.readlines()      # list of lines (includes \\n)

with open("data.txt") as f:
    for line in f:             # memory-efficient: one line at a time
        print(line.strip())
\`\`\`

Always specify \`encoding="utf-8"\` explicitly — the default varies by OS and can cause silent data corruption.

### File modes

| Mode | Behaviour |
|------|-----------|
| \`"r"\` | Read text (default — fails if file missing) |
| \`"w"\` | Write text (creates or **truncates** existing) |
| \`"a"\` | Append text (creates if missing) |
| \`"x"\` | Create and write (fails if file already exists) |
| \`"rb"\` | Read binary |
| \`"wb"\` | Write binary |

### Writing files

\`\`\`python
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Line one\\n")
    f.write("Line two\\n")

# writelines — write a list of strings (does NOT add newlines automatically)
lines = ["apple\\n", "banana\\n", "cherry\\n"]
with open("fruits.txt", "w") as f:
    f.writelines(lines)

# Append — add to end of existing file
with open("log.txt", "a") as f:
    f.write(f"{timestamp}: user logged in\\n")
\`\`\`

### pathlib — modern path handling

Prefer \`pathlib.Path\` over string manipulation for file paths. It works correctly on Windows, Mac, and Linux:

\`\`\`python
from pathlib import Path

# Build paths safely — no manual "/" + "/" concatenation
base = Path("data") / "reports" / "2024"
base.mkdir(parents=True, exist_ok=True)

output = base / "summary.txt"
output.write_text("Total: 42", encoding="utf-8")
text = output.read_text(encoding="utf-8")

# Inspect paths
output.exists()          # True
output.is_file()         # True
output.suffix            # ".txt"
output.stem              # "summary"
output.parent            # Path("data/reports/2024")

# Find files
for csv in Path(".").glob("**/*.csv"):
    print(csv)
\`\`\`

### JSON — serialise Python objects

\`\`\`python
import json

user = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Python → JSON string
json_str = json.dumps(user)             # compact
json_str = json.dumps(user, indent=2)  # readable with indentation

# JSON string → Python
parsed = json.loads(json_str)
parsed["name"]    # "Alice"
parsed["scores"]  # [95, 87, 92]

# Read/write JSON files directly
with open("config.json", "w") as f:
    json.dump(user, f, indent=2)

with open("config.json") as f:
    config = json.load(f)
\`\`\`

**Python ↔ JSON type mapping:**

| Python | JSON |
|--------|------|
| \`dict\` | object \`{}\` |
| \`list\` / \`tuple\` | array \`[]\` |
| \`str\` | string |
| \`int\` / \`float\` | number |
| \`True\` / \`False\` | \`true\` / \`false\` |
| \`None\` | \`null\` |

### CSV

\`\`\`python
import csv

# Write CSV
headers = ["name", "email", "age"]
rows = [
    {"name": "Alice", "email": "alice@example.com", "age": 30},
    {"name": "Bob",   "email": "bob@example.com",   "age": 25},
]

with open("users.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

# Read CSV
with open("users.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])
\`\`\`

The \`newline=""\` when writing prevents double line endings on Windows.`,
  },
  {
    slug: "async-await",
    title: "Async & Await",
    description: "Coroutines, the event loop, asyncio.gather, tasks, and when to use async vs threads vs processes.",
    category: "python",
    content: `## Async & Await

### The core problem: waiting on I/O

A typical web server spends most of its time *waiting* — for a database query to return, for a network response, for a file to be read. During that wait, a traditional synchronous program sits idle and can't do anything else.

Async Python solves this with **cooperative concurrency**: while one task waits on I/O, control is handed to another task that's ready to run. No wasted idle time.

### Coroutines — the building block

A coroutine is a function defined with \`async def\`. It does not run when called — it returns a coroutine object. You must \`await\` it to actually run it:

\`\`\`python
import asyncio

async def greet(name: str) -> str:
    await asyncio.sleep(1)   # pause here — give control to other tasks
    return f"Hello, {name}!"

# Run the event loop
result = asyncio.run(greet("Alice"))
print(result)   # "Hello, Alice!" (after 1 second)
\`\`\`

\`asyncio.run()\` starts the event loop, runs the coroutine, and closes the loop when it finishes. Use it only at the top level.

### Concurrent tasks — the whole point

Running coroutines sequentially with \`await\` is just as slow as synchronous code. The power comes from running them **concurrently** with \`asyncio.gather()\`:

\`\`\`python
async def fetch(url: str) -> str:
    await asyncio.sleep(1)     # simulates 1s network request
    return f"data from {url}"

async def main():
    # Sequential — takes 3 seconds total
    r1 = await fetch("url1")
    r2 = await fetch("url2")
    r3 = await fetch("url3")

    # Concurrent — takes ~1 second total
    r1, r2, r3 = await asyncio.gather(
        fetch("url1"),
        fetch("url2"),
        fetch("url3"),
    )

asyncio.run(main())
\`\`\`

### Tasks — fire and forget

\`asyncio.create_task()\` schedules a coroutine to run immediately without waiting for it. Useful when you want to kick off work and continue:

\`\`\`python
async def main():
    task = asyncio.create_task(long_background_job())
    # task is running now, we can do other work
    await do_something_else()
    result = await task   # wait for background job to finish
\`\`\`

### Error handling with gather

By default, if one coroutine fails, \`gather\` cancels and re-raises the first exception. Use \`return_exceptions=True\` to collect both results and errors:

\`\`\`python
results = await asyncio.gather(
    fetch("url1"),
    fetch("bad_url"),
    return_exceptions=True   # exceptions returned as values, not raised
)
for r in results:
    if isinstance(r, Exception):
        print(f"Error: {r}")
    else:
        print(r)
\`\`\`

### Async context managers and iterators

Third-party async libraries (aiohttp, asyncpg, aiofiles) use async context managers:

\`\`\`python
import aiohttp

async def fetch_json(url: str) -> dict:
    async with aiohttp.ClientSession() as session:       # async with
        async with session.get(url) as response:
            return await response.json()

async def read_lines(filepath: str):
    import aiofiles
    async with aiofiles.open(filepath) as f:
        async for line in f:                             # async for
            yield line.strip()
\`\`\`

### When to use what

| Use case | Right tool | Why |
|----------|-----------|-----|
| Many HTTP requests | **asyncio** | I/O-bound, high concurrency |
| Database queries | **asyncio** | I/O-bound |
| CPU-heavy computation | **multiprocessing** | Bypasses the GIL |
| Legacy blocking code | **threading** | asyncio requires async-compatible libraries |
| Simple parallel tasks | \`concurrent.futures\` | Cleaner API over both thread/process pools |

### The GIL — why async doesn't help with CPU work

Python's **Global Interpreter Lock (GIL)** means only one thread executes Python bytecode at a time. This makes threading and async safe for I/O (they yield voluntarily) but ineffective for CPU-bound work. For true parallel CPU computation, use \`multiprocessing\`.`,
  },
  {
    slug: "testing",
    title: "Testing with pytest",
    description: "Writing tests, fixtures, parametrize, mocking, and measuring test coverage.",
    category: "python",
    content: `## Testing with pytest

### Why test?

Tests are your safety net. They let you change code with confidence — if you break something, a test catches it before production does. Good tests also document how your code is supposed to behave.

### Installing and running pytest

\`\`\`bash
pip install pytest pytest-cov

pytest                           # discover and run all tests
pytest tests/test_user.py        # run a specific file
pytest tests/test_user.py::test_login  # run a specific test
pytest -v                        # verbose — show each test name
pytest -k "login or register"    # run tests matching a name pattern
pytest --tb=short                # shorter traceback on failures
\`\`\`

pytest discovers tests by looking for files named \`test_*.py\` or \`*_test.py\` and functions named \`test_*\`.

### Writing basic tests

Tests are plain functions. Use \`assert\` to check expected outcomes:

\`\`\`python
# tests/test_math.py
from myapp.utils import add, slugify

def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, -1) == -2

def test_slugify_replaces_spaces():
    assert slugify("Hello World") == "hello-world"

def test_slugify_lowercases():
    assert slugify("PYTHON") == "python"
\`\`\`

Keep tests **small and focused** — one concept per test. Give them descriptive names that read like sentences.

### Testing exceptions

\`\`\`python
import pytest
from myapp.utils import divide

def test_divide_by_zero_raises():
    with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
        divide(10, 0)

def test_invalid_input_raises():
    with pytest.raises(TypeError):
        divide("ten", 2)
\`\`\`

### Fixtures — reusable setup and teardown

A fixture is a function that provides a resource to tests. pytest injects them by name:

\`\`\`python
import pytest
from myapp.db import Database, User

@pytest.fixture
def db():
    # Setup — runs before the test
    database = Database(":memory:")
    database.migrate()
    yield database          # the test receives this value
    # Teardown — runs after the test, even if it fails
    database.close()

def test_create_user(db):
    user = db.create_user("alice@example.com")
    assert user.id is not None
    assert user.email == "alice@example.com"

def test_duplicate_email_raises(db):
    db.create_user("alice@example.com")
    with pytest.raises(ValueError):
        db.create_user("alice@example.com")
\`\`\`

Fixtures can have **scope** to control how often they run:

| Scope | Fixture runs |
|-------|-------------|
| \`function\` (default) | Once per test |
| \`class\` | Once per test class |
| \`module\` | Once per test file |
| \`session\` | Once for the entire test run |

### Parametrize — one test, many inputs

Instead of writing five nearly identical tests, parametrize them:

\`\`\`python
@pytest.mark.parametrize("text, expected", [
    ("hello world", "hello-world"),
    ("Python 3.11", "python-3.11"),
    ("  Trim me  ", "trim-me"),
    ("already-fine", "already-fine"),
])
def test_slugify(text, expected):
    assert slugify(text) == expected
\`\`\`

This runs four separate tests and reports each independently.

### Mocking — isolate the code under test

Mocks replace real dependencies (HTTP calls, databases, email sending) with controlled stand-ins:

\`\`\`python
from unittest.mock import patch, MagicMock

def test_send_welcome_email():
    with patch("myapp.mailer.smtp_send") as mock_send:
        mock_send.return_value = {"status": "sent"}

        result = send_welcome_email("alice@example.com")

        assert result is True
        mock_send.assert_called_once_with(
            to="alice@example.com",
            subject="Welcome to the app!"
        )
\`\`\`

### Test coverage

Coverage measures which lines of code are actually executed by your tests:

\`\`\`bash
pytest --cov=myapp --cov-report=term-missing
# Shows which lines are NOT covered in the terminal

pytest --cov=myapp --cov-report=html
# Generates htmlcov/index.html — click through files to see uncovered lines
\`\`\`

Aim for coverage on your **business logic**. Don't chase 100% — covering every possible exception path is often not worth the cost.

### conftest.py — shared fixtures

Put fixtures used across multiple test files in a \`conftest.py\` at the directory level. pytest finds them automatically:

\`\`\`python
# tests/conftest.py
import pytest
from myapp import create_app, db as _db

@pytest.fixture(scope="session")
def app():
    return create_app(testing=True)

@pytest.fixture(scope="function")
def db(app):
    with app.app_context():
        _db.create_all()
        yield _db
        _db.drop_all()
\`\`\``,
  },
  {
    slug: "python-performance",
    title: "Performance & Best Practices",
    description: "Profiling, common pitfalls, idiomatic Python, and writing code that is fast and readable.",
    category: "python",
    content: `## Performance & Best Practices

### Measure before optimising

Never guess where the bottleneck is — profile first. Optimising the wrong code wastes time and creates complexity for no gain.

\`\`\`bash
# cProfile — find which functions consume the most time
python -m cProfile -s cumulative my_script.py | head -20

# timeit — micro-benchmark specific snippets
python -m timeit "'-'.join(str(i) for i in range(1000))"
\`\`\`

\`\`\`python
import timeit

# Compare two implementations
def approach_a():
    return "".join([str(i) for i in range(1000)])

def approach_b():
    return "".join(str(i) for i in range(1000))

print(timeit.timeit(approach_a, number=10_000))
print(timeit.timeit(approach_b, number=10_000))
\`\`\`

### String building — always use join

Building strings with \`+\` in a loop creates a new string every iteration — O(n²) memory and time:

\`\`\`python
# Slow — O(n²): each iteration allocates a new string
result = ""
for word in words:
    result += word + " "

# Fast — O(n): one allocation at the end
result = " ".join(words)

# Fast for complex cases — collect in list, join at end
parts = []
for item in data:
    parts.append(format_item(item))
output = "\\n".join(parts)
\`\`\`

### Use sets and dicts for membership testing

A list's \`in\` operator scans every element — O(n). A set's \`in\` uses a hash table — O(1):

\`\`\`python
# Slow: scanned every time
valid_roles = ["admin", "member", "moderator", "guest"]
if user.role in valid_roles:   ...

# Fast: O(1) lookup
VALID_ROLES = {"admin", "member", "moderator", "guest"}
if user.role in VALID_ROLES:   ...
\`\`\`

### Generators for large data

If you only iterate once, a generator uses a tiny amount of memory compared to a list:

\`\`\`python
# Builds 1 million items in memory
big_list = [process(x) for x in range(1_000_000)]
total = sum(big_list)

# Memory-efficient: processes one item at a time
total = sum(process(x) for x in range(1_000_000))
\`\`\`

### lru_cache — memoize pure functions

Cache the results of expensive function calls that always return the same output for the same input:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

fib(100)   # instant — all sub-results cached
\`\`\`

### \`__slots__\` — reduce memory for many small objects

By default, every Python object has a \`__dict__\` which is a hash table. For classes with fixed attributes that you'll create millions of, \`__slots__\` removes \`__dict__\` and uses a compact array instead:

\`\`\`python
class Point:
    __slots__ = ("x", "y")

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

# ~50% less memory per instance than without __slots__
\`\`\`

### Common pitfalls

| Pitfall | What goes wrong | Fix |
|---------|----------------|-----|
| Mutable default argument | State shared across calls | Use \`None\`, set inside function |
| \`except:\` with no type | Catches SystemExit, KeyboardInterrupt | Always name the exception |
| \`==\` for None/True/False | Slower and less correct | Use \`is None\`, \`is True\` |
| Modifying a list while iterating it | Skip items or IndexError | Iterate a copy: \`for x in lst[:]\` |
| Using \`+\` to build strings in loops | O(n²) time and memory | Use \`"".join(parts)\` |
| Missing \`with\` for file opens | File not closed on exception | Always use \`with open(...)\` |

### Idiomatic Python — write it the Pythonic way

\`\`\`python
# Swap two variables
a, b = b, a

# Check empty collections
if not my_list:   ...       # instead of: if len(my_list) == 0
if my_dict:       ...       # instead of: if len(my_dict) > 0

# Use enumerate instead of range+index
for i, item in enumerate(items):
    ...

# Safe dict access with default
name = data.get("name", "Unknown")

# Unpack function returns
x, y = get_coordinates()
first, *rest = get_items()

# One-line conditional assignment
value = a if condition else b

# Check multiple conditions cleanly
if status in {"pending", "processing", "waiting"}:
    ...
\`\`\``,
  },
];

export default notes;
