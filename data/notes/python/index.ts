import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "python-intro",
    title: "Python at a Glance",
    description: "What Python is, how it runs, the REPL, and why it dominates so many domains.",
    category: "python",
    content: `## Python at a Glance

Python is a high-level, dynamically typed, interpreted language designed for readability. Its philosophy — "there should be one obvious way to do it" — keeps code clean and predictable.

### Where Python runs

\`\`\`
Source (.py) → CPython interpreter → Bytecode (.pyc) → PVM execution
\`\`\`

No compile step is required. Run a file with \`python script.py\` or experiment in the REPL:

\`\`\`python
python3          # start the REPL
>>> 2 + 2
4
>>> "hello".upper()
'HELLO'
>>> exit()
\`\`\`

### Why Python

| Domain | Tools |
|--------|-------|
| Web backends | Django, FastAPI, Flask |
| Data science | pandas, NumPy, Jupyter |
| Machine learning | PyTorch, TensorFlow, scikit-learn |
| Scripting / automation | standard library, subprocess |
| DevOps / infra | Ansible, AWS CDK, Terraform (via CDKTF) |
| CLIs | Click, Typer, argparse |

### Python versions

Always use **Python 3.10+**. Python 2 reached end-of-life in 2020. Check your version:

\`\`\`bash
python3 --version
\`\`\`

### Virtual environments

Isolate dependencies per project:

\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate    # Mac/Linux
.venv\\Scripts\\activate       # Windows

pip install requests
pip freeze > requirements.txt
pip install -r requirements.txt
\`\`\`

### Style guide

Python code follows **PEP 8** — 4-space indentation, snake_case names, 79-char line limit. Use a formatter like **black** and a linter like **ruff** to enforce it automatically.`,
  },
  {
    slug: "variables-types",
    title: "Variables & Data Types",
    description: "int, float, str, bool, None — how Python types work and type hints.",
    category: "python",
    content: `## Variables & Data Types

Python is dynamically typed — variables hold references to objects, not typed memory slots. The type lives on the object, not the variable.

### Core types

\`\`\`python
x = 42           # int
pi = 3.14159     # float
name = "Alice"   # str
active = True    # bool  (True / False, capital T/F)
nothing = None   # NoneType — Python's null
\`\`\`

### Type checking

\`\`\`python
type(42)          # <class 'int'>
isinstance(42, int)   # True
isinstance(42, (int, float))  # True — check multiple types
\`\`\`

### Numbers

\`\`\`python
10 / 3    # 3.3333... (true division, always float)
10 // 3   # 3         (floor division)
10 % 3    # 1         (modulo)
2 ** 10   # 1024      (exponent)
abs(-5)   # 5
round(3.567, 2)  # 3.57
\`\`\`

Python integers are arbitrary precision — no overflow.

### Strings

\`\`\`python
s = "hello"
s.upper()          # 'HELLO'
s.replace("l", "r")  # 'herro'
s[1:4]             # 'ell'  (slicing)
len(s)             # 5
"ll" in s          # True

# f-strings (Python 3.6+) — preferred interpolation
name = "Alice"
age = 30
f"Name: {name}, Age: {age}"        # "Name: Alice, Age: 30"
f"Pi is approx {3.14159:.2f}"      # "Pi is approx 3.14"
\`\`\`

### Multiline strings

\`\`\`python
text = """
Line one
Line two
Line three
"""
\`\`\`

### Type conversion

\`\`\`python
int("42")      # 42
float("3.14")  # 3.14
str(100)       # "100"
bool(0)        # False  (falsy: 0, "", [], {}, None)
bool(1)        # True
\`\`\`

### Type hints (Python 3.5+)

Type hints don't enforce types at runtime — they document intent and enable static analysis with mypy.

\`\`\`python
def greet(name: str, times: int = 1) -> str:
    return (name + " ") * times

from typing import Optional
def find(id: int) -> Optional[str]:  # returns str or None
    ...
\`\`\`

Python 3.10+ allows \`str | None\` instead of \`Optional[str]\`.`,
  },
  {
    slug: "control-flow",
    title: "Control Flow",
    description: "if/elif/else, for, while, break, continue, comprehensions, and the walrus operator.",
    category: "python",
    content: `## Control Flow

### if / elif / else

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

### Ternary (conditional expression)

\`\`\`python
label = "pass" if score >= 60 else "fail"
\`\`\`

### for loops

Python's \`for\` iterates over any iterable — not just ranges.

\`\`\`python
for name in ["Alice", "Bob", "Carol"]:
    print(name)

for i in range(5):       # 0 1 2 3 4
    print(i)

for i in range(2, 10, 2):  # 2 4 6 8
    print(i)

# enumerate — get index and value
for i, name in enumerate(["Alice", "Bob"], start=1):
    print(i, name)   # 1 Alice, 2 Bob

# zip — iterate two lists together
for name, score in zip(names, scores):
    print(name, score)
\`\`\`

### while loops

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### break and continue

\`\`\`python
for n in range(10):
    if n == 3:
        continue    # skip 3
    if n == 7:
        break       # stop at 7
    print(n)        # prints 0 1 2 4 5 6
\`\`\`

### for / else

The \`else\` clause on a loop runs if the loop completed **without** hitting \`break\`.

\`\`\`python
for item in items:
    if item == target:
        print("Found!")
        break
else:
    print("Not found")
\`\`\`

### List comprehensions

Compact, readable way to build lists:

\`\`\`python
squares = [x ** 2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]
flat    = [n for row in matrix for n in row]   # nested

# Dict and set comprehensions
square_map = {x: x**2 for x in range(5)}
unique_lengths = {len(w) for w in words}
\`\`\`

### Walrus operator \`:=\` (Python 3.8+)

Assign and test in one expression:

\`\`\`python
while chunk := file.read(8192):
    process(chunk)

# Instead of:
results = [y for x in data if (y := transform(x)) > 0]
\`\`\``,
  },
  {
    slug: "functions",
    title: "Functions",
    description: "def, args, kwargs, defaults, *args, **kwargs, lambdas, decorators, and closures.",
    category: "python",
    content: `## Functions

### Basic definition

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b
\`\`\`

### Default arguments

\`\`\`python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

greet("Alice")           # "Hello, Alice!"
greet("Bob", "Hi")       # "Hi, Bob!"
\`\`\`

**Never use mutable defaults** — they are shared across all calls:

\`\`\`python
# BAD
def add_item(item, lst=[]):
    lst.append(item)
    return lst

# GOOD
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
\`\`\`

### *args and **kwargs

\`\`\`python
def total(*args: int) -> int:          # variable positional args
    return sum(args)

total(1, 2, 3, 4)   # 10

def log(**kwargs) -> None:             # variable keyword args
    for k, v in kwargs.items():
        print(f"{k}={v}")

log(user="Alice", action="login")
\`\`\`

### Keyword-only arguments

Put a bare \`*\` to force callers to use keyword syntax:

\`\`\`python
def create_user(name: str, *, role: str = "member", active: bool = True):
    ...

create_user("Alice", role="admin")   # correct
create_user("Alice", "admin")        # TypeError
\`\`\`

### Lambda functions

Anonymous, single-expression functions:

\`\`\`python
square = lambda x: x ** 2
square(5)   # 25

items.sort(key=lambda x: x["score"], reverse=True)
\`\`\`

### Closures

A nested function that captures variables from its enclosing scope:

\`\`\`python
def make_multiplier(factor):
    def multiply(n):
        return n * factor    # 'factor' is captured
    return multiply

double = make_multiplier(2)
double(7)   # 14
\`\`\`

### Decorators

A decorator wraps a function to add behaviour:

\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.3f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

slow_function()  # slow_function took 1.001s
\`\`\`

Use \`functools.wraps\` to preserve the original function's metadata:

\`\`\`python
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ...
    return wrapper
\`\`\``,
  },
  {
    slug: "data-structures",
    title: "Built-in Data Structures",
    description: "list, dict, set, tuple — operations, complexity, and when to use each.",
    category: "python",
    content: `## Built-in Data Structures

### List — ordered, mutable sequence

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")          # add to end
fruits.insert(1, "avocado")   # insert at index
fruits.pop()                   # remove and return last
fruits.pop(0)                  # remove and return at index
fruits.remove("banana")        # remove first occurrence
fruits.sort()                  # in-place sort
sorted(fruits)                 # returns new sorted list
fruits.reverse()               # in-place reverse
fruits.index("cherry")         # find index
"apple" in fruits              # True
len(fruits)                    # count
\`\`\`

**Slicing:**
\`\`\`python
lst = [0, 1, 2, 3, 4, 5]
lst[2:5]     # [2, 3, 4]
lst[:3]      # [0, 1, 2]
lst[::2]     # [0, 2, 4]  (step)
lst[::-1]    # [5, 4, 3, 2, 1, 0]  (reversed)
\`\`\`

### Dictionary — key-value map (insertion-ordered, Python 3.7+)

\`\`\`python
user = {"name": "Alice", "age": 30}
user["email"] = "alice@example.com"   # add/update
user.get("phone", "N/A")              # safe read with default
user.pop("age")                       # remove key
"name" in user                        # True

# Iterate
for key in user:               print(key)
for key, val in user.items():  print(key, val)
for val in user.values():      print(val)

# Merge (Python 3.9+)
defaults = {"timeout": 30, "retries": 3}
config = defaults | {"timeout": 60}   # {"timeout":60, "retries":3}
\`\`\`

### Set — unordered, unique values

\`\`\`python
tags = {"python", "web", "python"}  # {"python", "web"}
tags.add("api")
tags.discard("missing")   # no error if not found

a = {1, 2, 3}
b = {2, 3, 4}
a | b    # union:        {1, 2, 3, 4}
a & b    # intersection: {2, 3}
a - b    # difference:   {1}
a ^ b    # symmetric diff: {1, 4}
\`\`\`

### Tuple — ordered, immutable

\`\`\`python
point = (10, 20)
x, y = point       # unpacking
a, *rest = (1, 2, 3, 4)  # a=1, rest=[2,3,4]

# Named tuples
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
p.x  # 3
\`\`\`

### Complexity at a glance

| Operation | List | Dict / Set |
|-----------|------|-----------|
| Access by index/key | O(1) | O(1) |
| Search (in) | **O(n)** | O(1) |
| Insert/delete at end | O(1) | O(1) |
| Insert/delete at start | **O(n)** | O(1) |

Use a **set** or **dict** instead of a list whenever you need fast membership testing.

### collections module extras

\`\`\`python
from collections import defaultdict, Counter, deque

# defaultdict — no KeyError on missing keys
dd = defaultdict(list)
dd["a"].append(1)

# Counter — count occurrences
c = Counter("abracadabra")
c.most_common(2)   # [('a', 5), ('b', 2)]

# deque — fast appends/pops from both ends
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.popleft()
\`\`\``,
  },
  {
    slug: "oop",
    title: "Object-Oriented Programming",
    description: "Classes, __init__, inheritance, dunder methods, dataclasses, and properties.",
    category: "python",
    content: `## Object-Oriented Programming

### Defining a class

\`\`\`python
class Animal:
    species = "Unknown"          # class attribute (shared)

    def __init__(self, name: str, age: int):
        self.name = name         # instance attribute
        self.age = age

    def speak(self) -> str:
        return f"{self.name} makes a sound"

    def __repr__(self) -> str:   # unambiguous string for debugging
        return f"Animal(name={self.name!r}, age={self.age})"

    def __str__(self) -> str:    # human-readable string
        return self.name

dog = Animal("Rex", 3)
print(dog)        # Rex
repr(dog)         # Animal(name='Rex', age=3)
\`\`\`

### Inheritance

\`\`\`python
class Dog(Animal):
    def __init__(self, name: str, age: int, breed: str):
        super().__init__(name, age)   # call parent __init__
        self.breed = breed

    def speak(self) -> str:           # override
        return f"{self.name} barks!"

    def fetch(self) -> str:           # new method
        return f"{self.name} fetches the ball"

rex = Dog("Rex", 3, "Labrador")
rex.speak()    # "Rex barks!"
isinstance(rex, Animal)  # True
\`\`\`

### Dunder (magic) methods

| Method | Triggered by |
|--------|-------------|
| \`__init__\` | \`ClassName(...)\` |
| \`__repr__\` | \`repr(obj)\` |
| \`__str__\` | \`str(obj)\`, \`print()\` |
| \`__len__\` | \`len(obj)\` |
| \`__eq__\` | \`obj == other\` |
| \`__lt__\` | \`obj < other\` |
| \`__add__\` | \`obj + other\` |
| \`__contains__\` | \`x in obj\` |
| \`__iter__\` | \`for x in obj\` |
| \`__enter__\` / \`__exit__\` | \`with obj:\` |

### Properties — controlled attribute access

\`\`\`python
class Circle:
    def __init__(self, radius: float):
        self._radius = radius

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self) -> float:
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
c.radius = 10
c.area   # 314.15...
\`\`\`

### dataclasses (Python 3.7+)

Eliminates boilerplate for data-holding classes:

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class User:
    name: str
    email: str
    age: int = 0
    tags: list[str] = field(default_factory=list)

    def is_adult(self) -> bool:
        return self.age >= 18

alice = User("Alice", "alice@example.com", 30)
# __init__, __repr__, __eq__ are auto-generated
\`\`\`

### Class and static methods

\`\`\`python
class Config:
    _instance = None

    @classmethod
    def get_instance(cls):       # cls = the class itself
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @staticmethod
    def validate_key(key: str) -> bool:  # no cls or self
        return len(key) >= 8
\`\`\``,
  },
  {
    slug: "modules-packages",
    title: "Modules & Packages",
    description: "import, __name__, creating packages, and the standard library highlights.",
    category: "python",
    content: `## Modules & Packages

### Importing

\`\`\`python
import math
math.sqrt(16)    # 4.0

from math import sqrt, pi
sqrt(16)         # 4.0

from math import *          # imports everything (avoid — pollutes namespace)

import numpy as np          # alias
np.array([1, 2, 3])
\`\`\`

### Creating a module

Any \`.py\` file is a module. \`utils.py\`:

\`\`\`python
# utils.py
def slugify(text: str) -> str:
    return text.lower().replace(" ", "-")

PI = 3.14159
\`\`\`

\`\`\`python
# main.py
from utils import slugify
slugify("Hello World")   # "hello-world"
\`\`\`

### \`__name__\` guard

Code inside this block only runs when the file is executed directly, not when imported:

\`\`\`python
def main():
    print("Running!")

if __name__ == "__main__":
    main()
\`\`\`

### Packages

A directory with \`__init__.py\` is a package:

\`\`\`
myapp/
  __init__.py
  models/
    __init__.py
    user.py
  utils/
    __init__.py
    format.py
\`\`\`

\`\`\`python
from myapp.models.user import User
from myapp.utils.format import slugify
\`\`\`

### Standard library highlights

| Module | Use |
|--------|-----|
| \`os\` | file paths, env vars, process management |
| \`sys\` | command-line args, Python version, exit |
| \`pathlib\` | object-oriented file path manipulation |
| \`json\` | encode/decode JSON |
| \`re\` | regular expressions |
| \`datetime\` | dates, times, timezones |
| \`collections\` | Counter, defaultdict, deque, OrderedDict |
| \`itertools\` | chain, product, combinations, groupby |
| \`functools\` | reduce, lru_cache, partial, wraps |
| \`dataclasses\` | auto-generated class boilerplate |
| \`typing\` | type hints |
| \`logging\` | structured application logging |
| \`unittest\` / \`pytest\` | testing |
| \`subprocess\` | run shell commands |
| \`threading\` / \`multiprocessing\` | concurrency |
| \`http.server\` | quick local HTTP server |

### pathlib example

\`\`\`python
from pathlib import Path

p = Path("data/reports")
p.mkdir(parents=True, exist_ok=True)

config = Path("config.json")
text = config.read_text()
config.write_text('{"debug": true}')

for f in Path(".").glob("**/*.py"):
    print(f)
\`\`\``,
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    description: "try/except/finally, raising exceptions, custom exception classes, and context managers.",
    category: "python",
    content: `## Error Handling

### try / except / else / finally

\`\`\`python
try:
    result = 10 / int(input("Enter a number: "))
except ZeroDivisionError:
    print("Cannot divide by zero")
except ValueError as e:
    print(f"Invalid input: {e}")
except (TypeError, OverflowError) as e:
    print(f"Math error: {e}")
else:
    print(f"Result: {result}")   # runs only if no exception
finally:
    print("Always runs — for cleanup")
\`\`\`

### Exception hierarchy

\`\`\`
BaseException
├── SystemExit
├── KeyboardInterrupt
└── Exception
    ├── ValueError
    ├── TypeError
    ├── IndexError
    ├── KeyError
    ├── AttributeError
    ├── FileNotFoundError  (subclass of OSError)
    ├── ZeroDivisionError
    └── RuntimeError
\`\`\`

Catch the **most specific** exception first.

### Raising exceptions

\`\`\`python
def set_age(age: int):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    ...
\`\`\`

### Custom exceptions

\`\`\`python
class AppError(Exception):
    pass

class AuthError(AppError):
    def __init__(self, message: str, code: int = 401):
        super().__init__(message)
        self.code = code

try:
    raise AuthError("Token expired", code=401)
except AuthError as e:
    print(e.code, e)   # 401 Token expired
\`\`\`

### Context managers — with statement

The \`with\` statement guarantees cleanup even if an exception occurs.

\`\`\`python
# File — always closed even on exception
with open("data.txt", "r") as f:
    content = f.read()

# Multiple contexts
with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read())
\`\`\`

### Custom context manager

\`\`\`python
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    import time
    start = time.time()
    try:
        yield
    finally:
        print(f"{label}: {time.time() - start:.3f}s")

with timer("loading data"):
    load_large_file()
\`\`\`

Or implement via \`__enter__\` / \`__exit__\`:

\`\`\`python
class DatabaseConnection:
    def __enter__(self):
        self.conn = connect()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # don't suppress exceptions
\`\`\``,
  },
  {
    slug: "iterators-generators",
    title: "Iterators & Generators",
    description: "The iterator protocol, yield, generator expressions, and lazy evaluation.",
    category: "python",
    content: `## Iterators & Generators

### The iterator protocol

Any object implementing \`__iter__\` and \`__next__\` is an iterator. The \`for\` loop calls these under the hood.

\`\`\`python
nums = [1, 2, 3]
it = iter(nums)
next(it)   # 1
next(it)   # 2
next(it)   # 3
next(it)   # StopIteration
\`\`\`

### Custom iterator

\`\`\`python
class Countdown:
    def __init__(self, start: int):
        self.n = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

list(Countdown(5))  # [5, 4, 3, 2, 1]
\`\`\`

### Generators — iterators via \`yield\`

A generator function pauses at each \`yield\` and resumes on the next \`next()\` call. It never builds the whole sequence in memory.

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
[next(gen) for _ in range(8)]  # [0, 1, 1, 2, 3, 5, 8, 13]
\`\`\`

\`\`\`python
def read_chunks(filepath: str, size: int = 8192):
    with open(filepath, "rb") as f:
        while chunk := f.read(size):
            yield chunk

for chunk in read_chunks("large_file.bin"):
    process(chunk)   # never loads whole file into memory
\`\`\`

### Generator expressions

Like list comprehensions, but lazy — values are produced on demand.

\`\`\`python
squares_gen = (x ** 2 for x in range(1_000_000))  # no memory spike
total = sum(x ** 2 for x in range(1_000_000))      # efficient

# Compare:
[x**2 for x in range(10)]   # list — eager, 10 items built now
(x**2 for x in range(10))   # generator — lazy, nothing built yet
\`\`\`

### \`yield from\`

Delegate to a sub-generator:

\`\`\`python
def chain(*iterables):
    for it in iterables:
        yield from it

list(chain([1, 2], [3, 4], [5]))  # [1, 2, 3, 4, 5]
\`\`\`

### itertools — generator tools

\`\`\`python
from itertools import islice, chain, product, groupby, combinations

list(islice(fibonacci(), 10))   # first 10 Fibonacci numbers

# combinations
list(combinations([1,2,3], 2))  # [(1,2),(1,3),(2,3)]

# groupby
data = [{"type": "a"}, {"type": "a"}, {"type": "b"}]
for key, group in groupby(data, key=lambda x: x["type"]):
    print(key, list(group))
\`\`\``,
  },
  {
    slug: "file-io",
    title: "File I/O & JSON",
    description: "Reading and writing files, CSV, JSON, and pathlib for path manipulation.",
    category: "python",
    content: `## File I/O & JSON

### Reading files

\`\`\`python
# Read entire file
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Read line by line (memory efficient for large files)
with open("data.txt") as f:
    for line in f:
        print(line.strip())

# Read all lines into a list
with open("data.txt") as f:
    lines = f.readlines()

# One-liner with pathlib
from pathlib import Path
text = Path("data.txt").read_text(encoding="utf-8")
\`\`\`

### Writing files

\`\`\`python
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\\n")

# Append mode
with open("log.txt", "a") as f:
    f.write("New log entry\\n")

# pathlib
Path("output.txt").write_text("Hello, World!")
\`\`\`

### File modes

| Mode | Meaning |
|------|---------|
| \`"r"\` | Read (default) |
| \`"w"\` | Write (truncates) |
| \`"a"\` | Append |
| \`"x"\` | Create, fail if exists |
| \`"b"\` | Binary mode (e.g., \`"rb"\`) |
| \`"t"\` | Text mode (default) |

### JSON

\`\`\`python
import json

# Serialize Python → JSON string
data = {"name": "Alice", "scores": [95, 87, 92]}
json_str = json.dumps(data, indent=2)

# Deserialize JSON string → Python
parsed = json.loads(json_str)
parsed["name"]   # "Alice"

# Read/write JSON files
with open("config.json", "w") as f:
    json.dump(data, f, indent=2)

with open("config.json") as f:
    config = json.load(f)
\`\`\`

### CSV

\`\`\`python
import csv

# Write CSV
with open("users.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "email", "age"])
    writer.writeheader()
    writer.writerows([
        {"name": "Alice", "email": "alice@example.com", "age": 30},
        {"name": "Bob",   "email": "bob@example.com",   "age": 25},
    ])

# Read CSV
with open("users.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])
\`\`\`

### pathlib for paths

\`\`\`python
from pathlib import Path

p = Path("/data/reports/2024")
p.mkdir(parents=True, exist_ok=True)

p.exists()          # True/False
p.is_file()
p.is_dir()
p.suffix            # ".txt"
p.stem              # "report" (filename without extension)
p.parent            # Path("/data/reports")
p / "output.csv"    # Path("/data/reports/2024/output.csv")

# Find files
for csv_file in Path(".").glob("**/*.csv"):
    print(csv_file)
\`\`\``,
  },
  {
    slug: "comprehensions-functional",
    title: "Comprehensions & Functional Tools",
    description: "map, filter, reduce, zip, sorted, functools.lru_cache, and partial.",
    category: "python",
    content: `## Comprehensions & Functional Tools

### List / dict / set comprehensions (recap)

\`\`\`python
# List
evens  = [x for x in range(20) if x % 2 == 0]
matrix = [[r * c for c in range(5)] for r in range(5)]

# Dict
lengths = {word: len(word) for word in ["hello", "world"]}

# Set
unique_domains = {email.split("@")[1] for email in emails}
\`\`\`

### map and filter

\`\`\`python
names = ["alice", "bob", "carol"]

# map — apply function to every element
upper = list(map(str.upper, names))      # ['ALICE', 'BOB', 'CAROL']

# filter — keep elements where function returns True
long_names = list(filter(lambda n: len(n) > 3, names))  # ['alice', 'carol']
\`\`\`

Comprehensions are usually more Pythonic than map/filter.

### zip and unzip

\`\`\`python
names  = ["Alice", "Bob", "Carol"]
scores = [85, 92, 78]

pairs = list(zip(names, scores))
# [('Alice', 85), ('Bob', 92), ('Carol', 78)]

# Unzip
names2, scores2 = zip(*pairs)

# zip_longest (from itertools) — pads shorter iterables
from itertools import zip_longest
list(zip_longest([1,2,3], [4,5], fillvalue=0))
# [(1,4), (2,5), (3,0)]
\`\`\`

### sorted with key

\`\`\`python
users = [{"name": "Carol", "age": 22}, {"name": "Alice", "age": 30}]

sorted_by_age  = sorted(users, key=lambda u: u["age"])
sorted_by_name = sorted(users, key=lambda u: u["name"])

# Sort by multiple fields
sorted(users, key=lambda u: (u["age"], u["name"]))
\`\`\`

### functools

\`\`\`python
from functools import reduce, lru_cache, partial

# reduce — fold a list into a single value
product = reduce(lambda acc, x: acc * x, [1, 2, 3, 4, 5])  # 120

# lru_cache — memoize expensive pure functions
@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

fib(100)   # fast — results cached

# partial — fix some arguments of a function
from functools import partial
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube   = partial(power, exp=3)
square(5)   # 25
cube(3)     # 27
\`\`\`

### any / all

\`\`\`python
scores = [85, 92, 78, 95]

any(s > 90 for s in scores)   # True — at least one
all(s > 70 for s in scores)   # True — every one
any(s < 0  for s in scores)   # False
\`\`\``,
  },
  {
    slug: "async-await",
    title: "Async & Await",
    description: "Coroutines, event loops, asyncio.gather, tasks, and async context managers.",
    category: "python",
    content: `## Async & Await

Python's async model is **cooperative concurrency** — tasks yield control at \`await\` points. It excels at I/O-bound work (HTTP, database queries, file I/O) but does not parallelize CPU-bound work.

### Coroutines

A coroutine is a function defined with \`async def\`. It doesn't run immediately — you need to \`await\` it or schedule it.

\`\`\`python
import asyncio

async def greet(name: str) -> str:
    await asyncio.sleep(1)   # simulates I/O wait
    return f"Hello, {name}!"

# Run it
asyncio.run(greet("Alice"))  # "Hello, Alice!"
\`\`\`

### Concurrent tasks with gather

\`\`\`python
async def fetch(url: str) -> str:
    await asyncio.sleep(0.5)   # simulate network latency
    return f"data:{url}"

async def main():
    # Both run concurrently — total time ~0.5s, not 1s
    results = await asyncio.gather(
        fetch("https://api.example.com/users"),
        fetch("https://api.example.com/posts"),
    )
    print(results)

asyncio.run(main())
\`\`\`

### Creating tasks

\`\`\`python
async def main():
    task1 = asyncio.create_task(fetch("url1"))
    task2 = asyncio.create_task(fetch("url2"))
    # Tasks start running immediately (unlike await)
    r1 = await task1
    r2 = await task2
\`\`\`

### Async context managers

\`\`\`python
async with aiohttp.ClientSession() as session:
    async with session.get(url) as response:
        data = await response.json()
\`\`\`

### Async iterators

\`\`\`python
async def stream_lines(filepath: str):
    async with aiofiles.open(filepath) as f:
        async for line in f:
            yield line.strip()

async def main():
    async for line in stream_lines("data.txt"):
        print(line)
\`\`\`

### Real HTTP example with httpx

\`\`\`python
import asyncio
import httpx

async def fetch_all(urls: list[str]) -> list[dict]:
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]

urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
]
results = asyncio.run(fetch_all(urls))
\`\`\`

### Async vs threading vs multiprocessing

| Use case | Best tool |
|----------|-----------|
| I/O-bound (HTTP, DB, files) | **asyncio** |
| I/O-bound + legacy code | threading |
| CPU-bound (compute, parsing) | **multiprocessing** |
| CPU-bound + easy API | concurrent.futures ProcessPoolExecutor |`,
  },
  {
    slug: "type-hints",
    title: "Type Hints & mypy",
    description: "Annotating functions, generics, Protocol, TypedDict, Literal, and running mypy.",
    category: "python",
    content: `## Type Hints & mypy

Type hints document intent and enable static analysis. They are **not enforced at runtime** — use mypy or pyright to check them.

### Function annotations

\`\`\`python
def add(a: int, b: int) -> int:
    return a + b

def greet(name: str, excited: bool = False) -> str:
    return f"Hello, {name}{'!' if excited else '.'}"
\`\`\`

### Common types

\`\`\`python
from typing import Optional, Union, Any

x: Optional[str] = None        # str or None
y: Union[int, str] = 42        # int or str

# Python 3.10+ shorthand
x: str | None = None
y: int | str = 42
\`\`\`

### Collection types

\`\`\`python
from typing import List, Dict, Tuple, Set  # old style (< 3.9)

# Python 3.9+ — use built-in generics directly
def process(items: list[int]) -> dict[str, int]:
    ...

def pair(a: int, b: str) -> tuple[int, str]:
    return a, b
\`\`\`

### Callable and TypeVar

\`\`\`python
from typing import Callable, TypeVar

T = TypeVar("T")

def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

def identity(x: T) -> T:    # generic function
    return x
\`\`\`

### TypedDict

\`\`\`python
from typing import TypedDict

class User(TypedDict):
    name: str
    email: str
    age: int

def create_user(data: User) -> None:
    ...

create_user({"name": "Alice", "email": "alice@example.com", "age": 30})
\`\`\`

### Protocol (structural subtyping)

\`\`\`python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

def render(shape: Drawable) -> None:
    shape.draw()

render(Circle())   # works — Circle matches the Protocol structurally
\`\`\`

### Literal

\`\`\`python
from typing import Literal

def set_direction(d: Literal["left", "right", "up", "down"]) -> None:
    ...
\`\`\`

### Running mypy

\`\`\`bash
pip install mypy
mypy src/                   # check all files in src/
mypy --strict main.py       # strictest mode
\`\`\``,
  },
  {
    slug: "testing",
    title: "Testing with pytest",
    description: "Writing tests, fixtures, parametrize, mocking, and measuring coverage.",
    category: "python",
    content: `## Testing with pytest

pytest is the standard Python testing library — cleaner than unittest and highly extensible.

\`\`\`bash
pip install pytest pytest-cov
pytest                   # run all tests
pytest tests/test_user.py
pytest -v                # verbose
pytest -k "test_login"  # run tests matching name
\`\`\`

### Basic tests

\`\`\`python
# tests/test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5

def test_add_negatives():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 5) == 5
\`\`\`

### Testing exceptions

\`\`\`python
import pytest

def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
        divide(10, 0)
\`\`\`

### Fixtures — reusable setup

\`\`\`python
import pytest
from myapp.db import Database

@pytest.fixture
def db():
    database = Database(":memory:")
    database.migrate()
    yield database          # teardown after test
    database.close()

def test_create_user(db):
    user = db.create_user("alice@example.com")
    assert user.id is not None

def test_find_user(db):
    db.create_user("bob@example.com")
    user = db.find_by_email("bob@example.com")
    assert user.email == "bob@example.com"
\`\`\`

### Parametrize — run one test with many inputs

\`\`\`python
@pytest.mark.parametrize("input,expected", [
    ("hello world", "hello-world"),
    ("Python 3.11", "python-3.11"),
    ("  spaces  ", "spaces"),
])
def test_slugify(input, expected):
    assert slugify(input) == expected
\`\`\`

### Mocking

\`\`\`python
from unittest.mock import patch, MagicMock

def test_send_email():
    with patch("myapp.mailer.smtp_send") as mock_send:
        mock_send.return_value = True
        result = send_welcome_email("alice@example.com")
        assert result is True
        mock_send.assert_called_once_with(
            to="alice@example.com",
            subject="Welcome!"
        )
\`\`\`

### Coverage

\`\`\`bash
pytest --cov=myapp --cov-report=html
# Opens htmlcov/index.html — shows which lines are untested
\`\`\`

### conftest.py

Shared fixtures go in \`conftest.py\` — pytest discovers them automatically across the test directory.

\`\`\`python
# tests/conftest.py
import pytest
from myapp import create_app

@pytest.fixture(scope="session")
def app():
    return create_app(testing=True)
\`\`\``,
  },
  {
    slug: "python-performance",
    title: "Performance & Best Practices",
    description: "Profiling, common pitfalls, slots, lru_cache, and writing idiomatic Python.",
    category: "python",
    content: `## Performance & Best Practices

### Profiling — find the bottleneck first

\`\`\`python
# cProfile — where does time go?
python -m cProfile -s cumulative script.py

# timeit — micro-benchmark a snippet
python -m timeit "'-'.join(str(i) for i in range(1000))"

# In code
import timeit
t = timeit.timeit(lambda: sum(range(10000)), number=1000)
print(f"{t:.4f}s")
\`\`\`

### String concatenation — use join, not +

\`\`\`python
# Slow — creates a new string each iteration O(n²)
result = ""
for word in words:
    result += word + " "

# Fast — single allocation O(n)
result = " ".join(words)
\`\`\`

### Local variable lookups are faster

\`\`\`python
# In a hot loop, cache global/attribute lookups
append = result.append    # local reference
for item in big_list:
    append(item)          # faster than result.append(item)
\`\`\`

### Use generators for large data

\`\`\`python
# Loads all 1M lines into memory
lines = [line.strip() for line in open("big.txt")]

# Processes one line at a time
lines = (line.strip() for line in open("big.txt"))
\`\`\`

### \`__slots__\` — reduce memory for many instances

\`\`\`python
class Point:
    __slots__ = ("x", "y")    # no __dict__ per instance
    def __init__(self, x, y):
        self.x = x
        self.y = y

# 10M Point objects → ~40% less memory than without __slots__
\`\`\`

### lru_cache for expensive pure functions

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=256)
def expensive_compute(n: int) -> int:
    ...  # result cached by argument value
\`\`\`

### Common pitfalls

| Pitfall | Fix |
|---------|-----|
| Mutable default argument | Use \`None\` and set inside function |
| Catching bare \`except:\` | Always catch specific exceptions |
| \`==\` for None/True/False | Use \`is None\`, \`is True\` |
| Modifying list while iterating | Iterate a copy or build a new list |
| N+1 queries in ORM loops | Use \`select_related\` / \`prefetch_related\` |

### Idiomatic Python (Pythonic)

\`\`\`python
# Swap variables
a, b = b, a

# Check empty
if not my_list: ...       # not: if len(my_list) == 0

# Enumerate instead of range+index
for i, item in enumerate(items): ...

# Dictionary get with default
name = d.get("name", "Unknown")

# Conditional import
try:
    import ujson as json
except ImportError:
    import json

# Unpack in assignment
first, *middle, last = range(10)

# Context manager for any cleanup
with open(f) as file, lock:
    ...
\`\`\``,
  },
];

export default notes;
