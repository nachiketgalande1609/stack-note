import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "js-intro",
    title: "JavaScript at a Glance",
    description: "What JavaScript is, where it runs, how it executes, and the modern JS landscape.",
    category: "javascript",
    content: `## JavaScript at a Glance

JavaScript is the only programming language that runs natively in every web browser. It started as a simple scripting language for making web pages interactive, but today it powers everything from frontend UIs to backend servers, mobile apps, and desktop tools.

### How JavaScript runs

Browsers ship with a **JavaScript engine** that reads your code and executes it. The most widely used engine is **V8**, built by Google and used in Chrome and Node.js. Other engines: SpiderMonkey (Firefox), JavaScriptCore (Safari).

The engine does not compile your code to a binary ahead of time the way C does. Instead, it reads, parses, and executes it — but modern engines also apply **Just-In-Time (JIT) compilation** to optimise hot code paths as they run.

\`\`\`
Your .js file  →  Parser  →  AST  →  Bytecode  →  JIT machine code
\`\`\`

### Where JavaScript runs

| Environment | Runtime | Use for |
|-------------|---------|---------|
| Browser | V8, SpiderMonkey, JSCore | DOM manipulation, UI, web APIs |
| Server | Node.js (V8) | APIs, file system, databases |
| Mobile | React Native, Expo | iOS and Android apps |
| Desktop | Electron | Native desktop apps |
| Edge / CDN | Cloudflare Workers, Deno | Fast globally-distributed code |

### Script tags — running JS in a browser

\`\`\`html
<!-- At the end of body — page loads first, then script runs -->
<script src="app.js"></script>

<!-- defer — downloads in parallel, runs after HTML is parsed -->
<script src="app.js" defer></script>

<!-- async — downloads in parallel, runs as soon as ready (no order guarantee) -->
<script src="app.js" async></script>
\`\`\`

Always use **defer** for your own scripts. It is the safest default.

### The modern JavaScript landscape

JavaScript evolves through the **ECMAScript** standard. New features are added yearly. You will see references like ES6 (2015, the biggest update), ES2020, ES2023, etc.

**Tools you will encounter:**
- **Babel** — transpiles modern JS to older syntax for wider browser support
- **TypeScript** — JavaScript with static type annotations (compiles to plain JS)
- **Bundlers** (Vite, Webpack, esbuild) — combine many files into one optimised output
- **npm / pnpm / yarn** — package managers for installing third-party libraries
- **Node.js** — JavaScript runtime for the server, also used to run build tools`,
  },
  {
    slug: "js-variables",
    title: "Variables & Data Types",
    description: "var, let, const, primitives, typeof, type coercion, and the difference between == and ===.",
    category: "javascript",
    content: `## Variables & Data Types

### var, let, and const — three ways to declare variables

JavaScript has three keywords for declaring variables. In modern code, **always use \`const\` by default and \`let\` when you need to reassign. Never use \`var\`.**

| Keyword | Can reassign | Block scoped | Hoisted |
|---------|-------------|-------------|---------|
| \`var\` | Yes | No (function scope) | Yes (as \`undefined\`) |
| \`let\` | Yes | Yes | No (TDZ error) |
| \`const\` | No | Yes | No (TDZ error) |

\`\`\`javascript
const name = "Alice";    // cannot be reassigned
let count = 0;           // can be reassigned
count = 1;               // OK

const user = { name: "Alice" };
user.name = "Bob";       // OK — the object's contents can change
user = {};               // TypeError — you cannot point 'user' at a new object
\`\`\`

**const does not make the value immutable** — it only prevents reassigning the variable itself. Objects and arrays declared with const can still be mutated.

### Primitive types — the seven basic value types

| Type | Example | Notes |
|------|---------|-------|
| \`number\` | \`42\`, \`3.14\`, \`NaN\`, \`Infinity\` | All numbers are 64-bit floats |
| \`bigint\` | \`9007199254740992n\` | Integers beyond safe integer range |
| \`string\` | \`"hello"\`, \`'world'\`, \`\\\`hi\\\`\` | Immutable sequence of UTF-16 units |
| \`boolean\` | \`true\`, \`false\` | |
| \`undefined\` | \`undefined\` | Variable declared but not assigned |
| \`null\` | \`null\` | Intentional absence of value |
| \`symbol\` | \`Symbol("id")\` | Unique identifier, rarely used directly |

Everything else is an **object** (arrays, functions, dates, maps, etc.).

### typeof — checking a value's type

\`\`\`javascript
typeof 42           // "number"
typeof "hello"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object"  ← famous JS bug, null is NOT an object
typeof {}           // "object"
typeof []           // "object"  ← arrays are objects too
typeof function(){} // "function"
typeof Symbol()     // "symbol"
\`\`\`

To check for null: \`value === null\`. To check for array: \`Array.isArray(value)\`.

### == vs === — always use triple equals

\`==\` compares values after **type coercion** — JavaScript tries to convert one side to match the other, which produces confusing results:

\`\`\`javascript
0 == false      // true  — false is coerced to 0
"" == false     // true
null == undefined // true
"5" == 5        // true  — string coerced to number
[] == false     // true  — array coerced to 0
\`\`\`

\`===\` compares both **value AND type** with no coercion — the result is always predictable:

\`\`\`javascript
0 === false      // false
"5" === 5        // false
null === undefined // false
\`\`\`

**Rule: always use \`===\` and \`!==\`. Never use \`==\` or \`!=\`.**

### Falsy values — what evaluates to false

In a boolean context (\`if\`, \`&&\`, \`||\`), these six values are falsy — everything else is truthy:

| Falsy value | Note |
|-------------|------|
| \`false\` | |
| \`0\` and \`-0\` | |
| \`""\` (empty string) | |
| \`null\` | |
| \`undefined\` | |
| \`NaN\` | Result of invalid math operations |

\`\`\`javascript
if (!value) {
    // runs when value is any of the six falsy values
}
\`\`\`

### Nullish coalescing and optional chaining

\`\`\`javascript
// ?? — use right side only when left side is null or undefined
// (unlike ||, it does NOT trigger on 0 or "")
const port = config.port ?? 3000;

// ?. — stop and return undefined instead of throwing
// when a property doesn't exist in a chain
const city = user?.address?.city;         // undefined, not an error
const first = user?.orders?.[0]?.total;   // safe deep access
const name = user?.getName?.();           // safe method call
\`\`\``,
  },
  {
    slug: "js-control-flow",
    title: "Control Flow & Functions",
    description: "if/else, switch, loops, arrow functions, default params, rest/spread, and destructuring.",
    category: "javascript",
    content: `## Control Flow & Functions

### if / else if / else

\`\`\`javascript
const score = 85;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "F";
}
\`\`\`

### Ternary — one-line conditional

\`\`\`javascript
const label = score >= 60 ? "pass" : "fail";
const access = user.isAdmin ? "full" : "limited";
\`\`\`

### switch — cleaner than many else-ifs for discrete values

\`\`\`javascript
switch (status) {
    case "pending":
        handlePending();
        break;              // without break, it falls through to the next case
    case "active":
    case "approved":        // two cases, same handler
        handleActive();
        break;
    default:
        handleUnknown();
}
\`\`\`

### for loops

\`\`\`javascript
// Classic for — when you need the index
for (let i = 0; i < 5; i++) {
    console.log(i);     // 0 1 2 3 4
}

// for...of — iterate values of any iterable (array, string, Set, Map)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in — iterate keys of an object (avoid on arrays)
const user = { name: "Alice", age: 30 };
for (const key in user) {
    console.log(key, user[key]);    // name Alice, age 30
}
\`\`\`

### while and do...while

\`\`\`javascript
let n = 0;
while (n < 5) {
    console.log(n++);
}

// do...while runs at least once before checking the condition
do {
    input = prompt("Enter a number:");
} while (isNaN(input));
\`\`\`

### Functions — three ways to write them

\`\`\`javascript
// 1. Function declaration — hoisted, can be called before it's defined
function add(a, b) {
    return a + b;
}

// 2. Function expression — not hoisted
const add = function(a, b) {
    return a + b;
};

// 3. Arrow function — concise, does NOT have its own 'this'
const add = (a, b) => a + b;           // implicit return when body is one expression
const square = n => n * n;             // parentheses optional with one parameter
const greet = () => "Hello!";          // no parameters — parentheses required
const getUser = () => ({ id: 1 });     // returning an object — wrap in parentheses
\`\`\`

### Default parameters

\`\`\`javascript
function greet(name, greeting = "Hello") {
    return \`\${greeting}, \${name}!\`;
}

greet("Alice");           // "Hello, Alice!"
greet("Bob", "Hi");       // "Hi, Bob!"
greet("Carol", undefined) // "Hello, Carol!" — undefined triggers default
\`\`\`

### Rest parameters — collect extra arguments into an array

\`\`\`javascript
function total(...numbers) {
    return numbers.reduce((sum, n) => sum + n, 0);
}

total(1, 2, 3, 4)   // 10
total(10, 20)        // 30
\`\`\`

### Spread operator — unpack an array or object

\`\`\`javascript
const nums = [3, 1, 4, 1, 5];
Math.max(...nums)              // 5 — spread as individual arguments

const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b]; // [1, 2, 3, 4]

const original = { x: 1, y: 2 };
const copy = { ...original, z: 3 };  // { x: 1, y: 2, z: 3 }
\`\`\`

### Destructuring — unpack arrays and objects into variables

\`\`\`javascript
// Array destructuring — position-based
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

const [x, , z] = [10, 20, 30];  // skip the middle value

// Object destructuring — name-based
const { name, age, email = "N/A" } = user;  // default if key is missing

// Rename while destructuring
const { name: userName, age: userAge } = user;

// Nested destructuring
const { address: { city, zip } } = user;

// In function parameters — very common in React
function UserCard({ name, email, role = "member" }) {
    return \`\${name} (\${role})\`;
}
\`\`\``,
  },
  {
    slug: "js-arrays",
    title: "Arrays & Array Methods",
    description: "map, filter, reduce, find, forEach, flat, sort — the array methods every JS developer uses daily.",
    category: "javascript",
    content: `## Arrays & Array Methods

Arrays are ordered lists. JavaScript arrays are dynamic — they grow and shrink, can hold values of any type, and come packed with powerful built-in methods.

### Creating and accessing arrays

\`\`\`javascript
const fruits = ["apple", "banana", "cherry"];

fruits[0]         // "apple"  — zero-indexed
fruits.at(-1)     // "cherry" — at() accepts negative indexes (ES2022)
fruits.length     // 3

// Adding and removing
fruits.push("date")         // add to end — returns new length
fruits.pop()                // remove and return last item
fruits.unshift("avocado")   // add to beginning — slow, shifts all items
fruits.shift()              // remove and return first item

// splice — modify in place (powerful but mutates the array)
fruits.splice(1, 1)             // remove 1 item at index 1
fruits.splice(1, 0, "avocado") // insert without removing
fruits.splice(1, 1, "avocado") // replace 1 item at index 1

// slice — extract without mutation
fruits.slice(1, 3)    // items from index 1 up to (not including) 3
fruits.slice(-2)      // last two items
\`\`\`

### Iterating — forEach vs for...of

\`\`\`javascript
// forEach — call a function for each item (no return value)
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});

// for...of — simpler, supports break and continue
for (const fruit of fruits) {
    if (fruit === "banana") break;
    console.log(fruit);
}
\`\`\`

### map — transform every item into a new array

\`map\` creates a **new** array by applying a function to every item. The original array is not changed:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

const doubled  = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
const strings  = numbers.map(n => \`#\${n}\`);      // ["#1", "#2", "#3", "#4", "#5"]

const users = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
const names = users.map(user => user.name);       // ["Alice", "Bob"]
\`\`\`

### filter — keep only items that pass a test

\`filter\` creates a **new** array with only the items where the function returns \`true\`:

\`\`\`javascript
const scores  = [45, 82, 91, 34, 77, 60];
const passing = scores.filter(s => s >= 60);      // [82, 91, 77, 60]

const users   = [{ name: "Alice", active: true }, { name: "Bob", active: false }];
const active  = users.filter(u => u.active);       // [{ name: "Alice", active: true }]
\`\`\`

### reduce — fold an array into a single value

\`reduce\` walks through every item and accumulates a result. It takes a callback and an **initial value**:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const total = numbers.reduce((sum, n) => sum + n, 0);    // 15

// Build an object from an array
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const byId  = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});
// { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" } }
\`\`\`

### find and findIndex — locate a single item

\`\`\`javascript
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Carol" }];

const alice = users.find(u => u.id === 1);          // { id: 1, name: "Alice" }
const idx   = users.findIndex(u => u.id === 2);     // 1
const notFound = users.find(u => u.id === 99);      // undefined
\`\`\`

### some and every — test the whole array

\`\`\`javascript
const scores = [72, 85, 91, 68];

scores.some(s => s > 90)    // true  — at least one score is > 90
scores.every(s => s >= 60)  // true  — every score is >= 60
scores.every(s => s > 80)   // false — not every score is > 80
\`\`\`

### flat and flatMap — work with nested arrays

\`\`\`javascript
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat()     // [1, 2, 3, 4, [5, 6]]  — one level deep
nested.flat(2)    // [1, 2, 3, 4, 5, 6]    — two levels deep
nested.flat(Infinity)  // fully flatten regardless of depth

// flatMap — map then flatten one level (more efficient than map + flat)
const sentences = ["hello world", "foo bar"];
sentences.flatMap(s => s.split(" "))   // ["hello", "world", "foo", "bar"]
\`\`\`

### Sorting — be careful with the default

\`\`\`javascript
// Default sort converts to strings — wrong for numbers!
[10, 9, 2, 1, 100].sort()          // [1, 10, 100, 2, 9]  ← wrong

// Correct — provide a comparator function
[10, 9, 2, 1, 100].sort((a, b) => a - b)    // [1, 2, 9, 10, 100]  ascending
[10, 9, 2, 1, 100].sort((a, b) => b - a)    // [100, 10, 9, 2, 1]  descending

// Sort objects by a field
users.sort((a, b) => a.name.localeCompare(b.name))  // alphabetically
users.sort((a, b) => a.age - b.age)                 // by age ascending
\`\`\`

### Useful extras

\`\`\`javascript
[1, 2, 3].includes(2)               // true
[1, 2, 3].indexOf(2)                // 1  (-1 if not found)
[1, [2], [3, [4]]].flat(Infinity)   // [1, 2, 3, 4]
Array.from("hello")                 // ["h", "e", "l", "l", "o"]
Array.from({ length: 5 }, (_, i) => i)  // [0, 1, 2, 3, 4]
[...new Set([1, 2, 2, 3, 3])]      // [1, 2, 3]  — deduplicate
\`\`\``,
  },
  {
    slug: "js-objects",
    title: "Objects & Prototypes",
    description: "Object literals, methods, shorthand, Object utilities, prototypal inheritance, and classes.",
    category: "javascript",
    content: `## Objects & Prototypes

### Objects — the core data structure of JavaScript

An object is a collection of **key-value pairs** (called properties). Almost everything in JavaScript is an object, including arrays and functions. Objects are created with curly braces:

\`\`\`javascript
const user = {
    name: "Alice",             // string property
    age: 30,                   // number property
    active: true,              // boolean property
    greet() {                  // method shorthand (ES6)
        return \`Hi, I'm \${this.name}\`;
    },
};

user.name                  // "Alice"  — dot notation
user["name"]               // "Alice"  — bracket notation (useful for dynamic keys)
user.greet()               // "Hi, I'm Alice"
\`\`\`

### Shorthand properties — when variable name matches key name

\`\`\`javascript
const name = "Alice";
const age = 30;

// Old way
const user = { name: name, age: age };

// Shorthand — same result
const user = { name, age };
\`\`\`

### Computed property names — dynamic keys

\`\`\`javascript
const key = "color";
const obj = {
    [key]: "red",             // computed: { color: "red" }
    [\`get\${key.charAt(0).toUpperCase() + key.slice(1)}\`]() {
        return this[key];
    }
};

obj.color         // "red"
obj.getColor()    // "red"
\`\`\`

### Checking properties

\`\`\`javascript
const user = { name: "Alice", age: 30 };

"name" in user              // true — checks own AND inherited properties
user.hasOwnProperty("name") // true — checks own properties only
Object.hasOwn(user, "name") // true — modern version, preferred (ES2022)

user.phone                  // undefined — safe, does not throw
\`\`\`

### Useful Object methods

\`\`\`javascript
const user = { name: "Alice", age: 30, role: "admin" };

Object.keys(user)     // ["name", "age", "role"]
Object.values(user)   // ["Alice", 30, "admin"]
Object.entries(user)  // [["name","Alice"], ["age",30], ["role","admin"]]

// Iterate over key-value pairs
for (const [key, value] of Object.entries(user)) {
    console.log(\`\${key}: \${value}\`);
}

// Shallow copy — spread is simplest
const copy = { ...user };

// Merge objects — later keys win
const merged = { ...defaults, ...overrides };

// Create an object from an array of [key, value] pairs
const obj = Object.fromEntries([["a", 1], ["b", 2]]);  // { a: 1, b: 2 }

// Make object immutable — cannot add, change, or delete properties
const config = Object.freeze({ host: "localhost", port: 5432 });
\`\`\`

### Prototypes — how JavaScript inheritance works

Every JavaScript object has a hidden link to another object called its **prototype**. When you access a property that does not exist on the object, JavaScript looks up the prototype chain:

\`\`\`javascript
const animal = {
    breathe() { return "breathing"; }
};

const dog = Object.create(animal);   // dog's prototype is animal
dog.bark = function() { return "woof"; };

dog.bark()     // "woof"   — found directly on dog
dog.breathe()  // "breathing" — not on dog, found on animal (the prototype)
\`\`\`

### Classes — cleaner syntax for prototype-based inheritance

ES6 classes do not add a new inheritance system — they are **syntactic sugar** over prototype chains. They are cleaner and more familiar to developers coming from other languages:

\`\`\`javascript
class Animal {
    #name;                        // private field (ES2022) — # prefix

    constructor(name, sound) {
        this.#name = name;
        this.sound = sound;
    }

    get name() { return this.#name; }    // getter

    speak() {
        return \`\${this.#name} says \${this.sound}\`;
    }

    static create(name, sound) {         // static method — called on the class
        return new Animal(name, sound);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "woof");            // must call super() first
        this.tricks = [];
    }

    learn(trick) {
        this.tricks.push(trick);
        return this;                    // enables chaining
    }

    speak() {
        return super.speak() + "!";    // call parent method
    }
}

const rex = new Dog("Rex");
rex.learn("sit").learn("shake");        // chaining
rex.speak()    // "Rex says woof!"
rex.name       // "Rex" — via getter
rex instanceof Dog     // true
rex instanceof Animal  // true
\`\`\``,
  },
  {
    slug: "js-closures-scope",
    title: "Scope, Closures & the Module Pattern",
    description: "Lexical scope, the scope chain, closures, IIFE, and ES modules — understanding how JS finds variables.",
    category: "javascript",
    content: `## Scope, Closures & the Module Pattern

### What is scope?

**Scope** is the set of variables a particular line of code can access. JavaScript uses **lexical scope** — the scope of a variable is determined by where it is written in the source code, not by where or how the code is called.

\`\`\`javascript
const globalVar = "I'm global";       // accessible everywhere

function outer() {
    const outerVar = "I'm outer";     // accessible inside outer and inner

    function inner() {
        const innerVar = "I'm inner"; // accessible only inside inner
        console.log(globalVar);       // OK
        console.log(outerVar);        // OK
        console.log(innerVar);        // OK
    }

    inner();
    console.log(innerVar);            // ReferenceError — out of scope
}
\`\`\`

When JavaScript looks up a variable, it starts in the current scope and works outward (the **scope chain**) until it reaches the global scope. If the variable is not found anywhere, it throws a \`ReferenceError\`.

### Block scope — what let and const give you

\`var\` is function-scoped — it leaks out of \`if\` blocks, \`for\` loops, etc. This is one of the main reasons \`var\` causes bugs. \`let\` and \`const\` are block-scoped:

\`\`\`javascript
// var leaks out of blocks
if (true) {
    var x = 10;
}
console.log(x);   // 10 — x leaked out!

// let stays inside the block
if (true) {
    let y = 10;
}
console.log(y);   // ReferenceError — y does not exist here

// Classic var loop bug
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // prints 3, 3, 3 — all share the same i
}

// Fixed with let — each iteration gets its own i
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // prints 0, 1, 2
}
\`\`\`

### Closures — functions that remember their birthplace

A **closure** is a function that retains access to the variables of its outer scope even after the outer function has returned. The inner function "closes over" those variables:

\`\`\`javascript
function makeCounter(startFrom = 0) {
    let count = startFrom;             // this variable lives on inside the closure

    return {
        increment() { count++; },
        decrement() { count--; },
        value()     { return count; },
    };
}

const counter = makeCounter(10);
counter.increment();    // count is now 11
counter.increment();    // count is now 12
counter.decrement();    // count is now 11
counter.value();        // 11

// 'count' is private — there is no other way to access it
\`\`\`

Closures are the mechanism behind:
- **Private state** — variables visible only to specific functions
- **Factories** — functions that create other functions with pre-set behaviour
- **Memoisation** — caching results between calls
- **Event handlers** — callbacks that remember context from when they were created

### A practical closure example — memoisation

\`\`\`javascript
function memoize(fn) {
    const cache = {};               // this cache persists across calls via closure

    return function(...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];      // cache hit — skip computation
        }
        cache[key] = fn(...args);   // cache miss — compute and store
        return cache[key];
    };
}

const slowSquare = memoize(n => {
    // pretend this is expensive
    return n * n;
});

slowSquare(5)   // computes: 25
slowSquare(5)   // returns cached: 25
\`\`\`

### ES Modules — the modern way to share code

ES Modules (\`import\`/\`export\`) are the standard module system, available natively in modern browsers and Node.js:

\`\`\`javascript
// math.js — export what others can use
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export const PI = 3.14159;

export default function square(n) { return n * n; }  // default export
\`\`\`

\`\`\`javascript
// main.js — import what you need
import square from "./math.js";              // import the default export
import { add, multiply, PI } from "./math.js"; // import named exports
import { add as sum } from "./math.js";       // rename on import
import * as math from "./math.js";            // import everything as an object

math.add(2, 3)      // 5
math.PI             // 3.14159
\`\`\`

**Key rules about ES modules:**
- Each file is its own scope — nothing leaks to global by default
- \`import\` statements are **hoisted** and evaluated before any code runs
- Modules are **cached** — importing the same module twice does not run it twice
- Only one \`export default\` per module, but as many named exports as you want`,
  },
  {
    slug: "js-async",
    title: "Async JavaScript — Callbacks, Promises & Async/Await",
    description: "Why JS is async, the callback pattern, Promises, Promise.all, and async/await explained step by step.",
    category: "javascript",
    content: `## Async JavaScript

### Why JavaScript needs async at all

JavaScript runs on a **single thread** — it can only do one thing at a time. If a network request takes 2 seconds and JavaScript waited for it synchronously, the entire page would freeze for 2 seconds. No scrolling, no clicks, nothing.

The solution is **asynchronous code**: instead of waiting, you tell JavaScript "start this request, then call me back when it's done." JavaScript moves on to other work and responds when the result arrives.

### The callback pattern — the original approach

Before Promises existed, async results were handled with **callbacks** — functions you pass in to be called later:

\`\`\`javascript
// Reading a file in Node.js the old way
fs.readFile("data.txt", "utf8", function(error, content) {
    if (error) {
        console.error("Failed:", error);
        return;
    }
    console.log(content);     // content is available here, after the file is read
});
// code here runs BEFORE the callback — the file isn't read yet
\`\`\`

The problem: when you need multiple async steps, callbacks nest inside callbacks inside callbacks — this is called **callback hell**:

\`\`\`javascript
getUser(id, function(err, user) {
    if (err) return handleError(err);
    getOrders(user.id, function(err, orders) {
        if (err) return handleError(err);
        getInvoice(orders[0].id, function(err, invoice) {
            if (err) return handleError(err);
            // deeply nested, hard to read and handle errors
        });
    });
});
\`\`\`

### Promises — a cleaner model for async results

A **Promise** represents a value that does not exist yet but will eventually either **resolve** (success) or **reject** (failure). Instead of passing a callback in, you chain \`.then()\` and \`.catch()\`:

\`\`\`javascript
fetch("/api/user")
    .then(response => response.json())    // runs when fetch succeeds
    .then(user => {
        console.log(user.name);
        return fetch(\`/api/orders/\${user.id}\`);  // return another promise
    })
    .then(response => response.json())
    .then(orders => console.log(orders))
    .catch(error => console.error("Something failed:", error))  // catches ANY error in the chain
    .finally(() => hideLoadingSpinner());   // always runs, success or failure
\`\`\`

**A Promise is always in one of three states:**

| State | Meaning |
|-------|---------|
| Pending | The async operation is in progress |
| Fulfilled | It completed successfully — .then() is called |
| Rejected | It failed — .catch() is called |

### Creating your own Promise

\`\`\`javascript
function delay(ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0) {
            reject(new Error("Delay cannot be negative"));
            return;
        }
        setTimeout(() => resolve("done"), ms);
    });
}

delay(1000)
    .then(result => console.log(result))  // "done" after 1 second
    .catch(err => console.error(err));
\`\`\`

### async/await — Promises with synchronous-looking syntax

\`async/await\` is built on top of Promises. It is not a different system — it is just cleaner syntax that makes async code read like synchronous code. An \`async\` function always returns a Promise. \`await\` pauses the async function until the Promise settles:

\`\`\`javascript
// The Promise chain from above, rewritten with async/await
async function loadUserAndOrders(userId) {
    try {
        const userResponse = await fetch(\`/api/users/\${userId}\`);
        const user = await userResponse.json();

        const ordersResponse = await fetch(\`/api/orders/\${user.id}\`);
        const orders = await ordersResponse.json();

        return { user, orders };
    } catch (error) {
        console.error("Failed to load:", error);
        throw error;    // re-throw so the caller can handle it too
    }
}
\`\`\`

Much easier to read and reason about. Error handling with \`try/catch\` works just like synchronous code.

### Running multiple Promises in parallel

If two async operations do not depend on each other, run them at the same time instead of sequentially:

\`\`\`javascript
async function loadDashboard(userId) {
    // SLOW — sequential, total time = time(A) + time(B) + time(C)
    const user    = await fetchUser(userId);
    const posts   = await fetchPosts(userId);
    const friends = await fetchFriends(userId);

    // FAST — parallel, total time = max(time(A), time(B), time(C))
    const [user, posts, friends] = await Promise.all([
        fetchUser(userId),
        fetchPosts(userId),
        fetchFriends(userId),
    ]);

    return { user, posts, friends };
}
\`\`\`

### Other Promise methods

\`\`\`javascript
// Promise.allSettled — wait for all, get each result (success or failure)
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.error(r.reason);
});

// Promise.race — resolve/reject with whichever settles first
const data = await Promise.race([
    fetch("/api/data"),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
]);

// Promise.any — resolve with the first success (ignores rejections)
const fastest = await Promise.any([mirror1, mirror2, mirror3]);
\`\`\`

### Common async/await mistakes

\`\`\`javascript
// Missing await — data is a Promise, not the resolved value
const data = fetch("/api/data");   // bug!

// Accidentally sequential
const a = await fetchA();   // waits for A
const b = await fetchB();   // only starts after A — should run in parallel

// Fix with Promise.all
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// await outside async function — syntax error
function main() {
    const data = await fetchData();  // SyntaxError
}
// Fix: make the function async
async function main() {
    const data = await fetchData();
}
\`\`\``,
  },
  {
    slug: "js-event-loop",
    title: "The Event Loop",
    description: "The call stack, task queue, microtask queue — how JS stays single-threaded yet non-blocking.",
    category: "javascript",
    content: `## The Event Loop

### The single-threaded problem

JavaScript runs in a single thread, which means it can only execute one piece of code at a time. There is one **call stack** — a record of which function is currently running and which function called it.

Yet JavaScript can handle timers, network requests, user clicks, and file reads without freezing. How? Through the **event loop**.

### The call stack

The call stack is a last-in, first-out (LIFO) structure. When you call a function, it is pushed on top. When the function returns, it is popped off:

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}\`;
}

function main() {
    const message = greet("Alice");
    console.log(message);
}

main();

// Call stack sequence:
// main()
// main() → greet("Alice")    ← greet pushed
// main()                     ← greet returned, popped
// (empty)                    ← main returned, popped
\`\`\`

### Two types of async tasks — macrotasks and microtasks

Asynchronous callbacks do not jump straight back onto the call stack. They wait in queues:

**Macrotask queue (Task Queue):**
- \`setTimeout\` and \`setInterval\` callbacks
- I/O callbacks (file reads, network responses in Node.js)
- UI rendering tasks

**Microtask queue:**
- \`Promise.then\` / \`.catch\` / \`.finally\` callbacks
- \`queueMicrotask()\`
- \`MutationObserver\` callbacks

### The event loop — the orchestrator

The event loop runs continuously in a simple loop:

1. Run everything currently on the **call stack** until it is empty
2. **Drain the entire microtask queue** — run all microtasks until none are left (including new microtasks added during this step)
3. Take **one** macrotask from the task queue and run it
4. Drain the microtask queue again
5. Repeat

**Microtasks always run before the next macrotask.** This is the key rule.

### A concrete example — tracing execution order

\`\`\`javascript
console.log("1 — synchronous");

setTimeout(() => console.log("2 — macrotask"), 0);

Promise.resolve()
    .then(() => console.log("3 — microtask 1"))
    .then(() => console.log("4 — microtask 2"));

queueMicrotask(() => console.log("5 — microtask 3"));

console.log("6 — synchronous");

// Output order:
// 1 — synchronous
// 6 — synchronous
// 3 — microtask 1
// 5 — microtask 3
// 4 — microtask 2
// 2 — macrotask
\`\`\`

**Why this order?**
1. Lines 1 and 6 are synchronous — run immediately on the call stack
2. \`setTimeout\` callback is scheduled as a macrotask (even with 0ms delay)
3. \`Promise.then\` callbacks are microtasks
4. After the call stack empties, **all microtasks run first**: #3 runs (which schedules #4), then #5 runs, then #4 runs
5. Only then does the event loop pick up the macrotask: #2

### Why this matters for your code

\`\`\`javascript
// Promise callbacks run BEFORE setTimeout, even if setTimeout fires first
let data = null;

setTimeout(() => {
    data = "loaded";
}, 0);

Promise.resolve().then(() => {
    console.log(data);   // null — macrotask hasn't run yet
});
\`\`\`

\`\`\`javascript
// An infinite microtask loop freezes the page — macrotasks never run
function badLoop() {
    Promise.resolve().then(badLoop);  // schedules itself as a microtask forever
}
badLoop();  // setTimeout callbacks, UI rendering — all blocked
\`\`\`

### Hoisting — var and function declarations move up

**Hoisting** is a related concept: before your code runs, JavaScript scans the file and moves \`var\` declarations and function declarations to the top of their scope. The values are not moved — only the declarations:

\`\`\`javascript
console.log(x);   // undefined — x was hoisted (declared), but not yet assigned
var x = 5;
console.log(x);   // 5

greet("Alice");   // "Hello, Alice!" — function declaration is fully hoisted
function greet(name) {
    return \`Hello, \${name}\`;
}

sayHi();          // TypeError — sayHi is hoisted as undefined, not the function
var sayHi = function() { return "Hi!"; };
\`\`\`

\`let\` and \`const\` are also hoisted but are in the **Temporal Dead Zone (TDZ)** until their declaration line — accessing them before throws a \`ReferenceError\`.`,
  },
  {
    slug: "js-this",
    title: "this — Context & Binding",
    description: "What 'this' refers to in different contexts, explicit binding, arrow functions, and common pitfalls.",
    category: "javascript",
    content: `## this — Context & Binding

### What is \`this\`?

\`this\` is a special keyword in JavaScript that refers to the **object that the current function belongs to at the time of the call**. Unlike most languages where \`this\` is fixed at definition time, JavaScript's \`this\` is determined **at call time** — it depends on how the function is called, not where it is written.

This is one of JavaScript's most confusing features. Here are the rules.

### Rule 1 — Method call: \`this\` is the object before the dot

\`\`\`javascript
const user = {
    name: "Alice",
    greet() {
        console.log(\`Hello, I'm \${this.name}\`);
    }
};

user.greet();     // "Hello, I'm Alice" — this = user (the object before the dot)
\`\`\`

### Rule 2 — Plain function call: \`this\` is undefined (strict mode) or global

\`\`\`javascript
function showThis() {
    console.log(this);
}

showThis();          // undefined (strict mode) or window (non-strict, browser)

// Detaching a method loses its context
const greet = user.greet;
greet();             // "Hello, I'm undefined" — this is no longer user!
\`\`\`

This is the most common \`this\` bug: extracting a method and calling it without its object.

### Rule 3 — \`new\` call: \`this\` is the newly created object

\`\`\`javascript
function Person(name) {
    this.name = name;          // this = the new object being created
    this.greet = function() {
        return \`Hi, I'm \${this.name}\`;
    };
}

const alice = new Person("Alice");
alice.greet();    // "Hi, I'm Alice"
\`\`\`

### Rule 4 — Explicit binding with call, apply, and bind

You can manually set what \`this\` should be:

\`\`\`javascript
function greet(greeting, punctuation) {
    return \`\${greeting}, I'm \${this.name}\${punctuation}\`;
}

const user = { name: "Alice" };

// call — call immediately, pass arguments one by one
greet.call(user, "Hello", "!");      // "Hello, I'm Alice!"

// apply — call immediately, pass arguments as an array
greet.apply(user, ["Hello", "!"]); // "Hello, I'm Alice!"

// bind — return a NEW function with 'this' permanently fixed
const greetAlice = greet.bind(user, "Hello");
greetAlice("!");   // "Hello, I'm Alice!"
greetAlice("?");   // "Hello, I'm Alice?"
\`\`\`

### Rule 5 — Arrow functions: \`this\` is inherited from the enclosing scope

Arrow functions do **not have their own \`this\`**. They capture \`this\` from the surrounding code at the time they are defined. This makes them ideal for callbacks:

\`\`\`javascript
class Timer {
    constructor() {
        this.seconds = 0;
    }

    start() {
        // Bug: regular function — 'this' is lost inside setTimeout
        setInterval(function() {
            this.seconds++;     // this = undefined or window, NOT the Timer!
        }, 1000);

        // Fix: arrow function — 'this' is inherited from start(), which is Timer
        setInterval(() => {
            this.seconds++;     // this = Timer instance ✓
        }, 1000);
    }
}
\`\`\`

### The common React pattern — why arrow functions in JSX

\`\`\`javascript
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };

        // bind in constructor — explicit fix
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ clicked: true });
    }

    render() {
        // Arrow function in JSX — this is inherited from render() = the component
        return <button onClick={() => this.handleClick()}>Click me</button>;
    }
}
\`\`\`

### Summary — what \`this\` equals

| How the function is called | \`this\` refers to |
|---------------------------|------------------|
| \`obj.method()\` | \`obj\` |
| \`fn()\` — plain call | \`undefined\` (strict) or \`window\` |
| \`new Fn()\` | The new object |
| \`fn.call(ctx)\` / \`.apply(ctx)\` | \`ctx\` |
| \`fn.bind(ctx)\` | \`ctx\` (permanently) |
| Arrow function | \`this\` from surrounding scope |`,
  },
  {
    slug: "js-dom",
    title: "DOM Manipulation",
    description: "Selecting elements, reading and changing content, events, event delegation, and dynamic updates.",
    category: "javascript",
    content: `## DOM Manipulation

### What is the DOM?

When a browser loads an HTML page, it parses the HTML and builds a tree of objects called the **Document Object Model (DOM)**. Every HTML element becomes a node in that tree. JavaScript can read and modify this tree, which is how web pages become interactive.

\`\`\`
document
└── html
    ├── head
    │   └── title → "My Page"
    └── body
        ├── h1 → "Hello World"
        └── div.container
            ├── p → "Some text"
            └── button → "Click me"
\`\`\`

### Selecting elements

\`\`\`javascript
// querySelector — returns the first match (CSS selector syntax)
const btn    = document.querySelector("button");
const title  = document.querySelector("#title");       // by ID
const first  = document.querySelector(".card");        // by class
const input  = document.querySelector("form input");   // nested selector

// querySelectorAll — returns ALL matches as a NodeList
const cards  = document.querySelectorAll(".card");
const inputs = document.querySelectorAll("input[type='text']");

// Iterate over NodeList
cards.forEach(card => card.classList.add("loaded"));

// Older methods (still widely used)
document.getElementById("title")         // by ID — fastest
document.getElementsByClassName("card")  // live HTMLCollection
document.getElementsByTagName("div")     // live HTMLCollection
\`\`\`

### Reading and modifying content

\`\`\`javascript
const heading = document.querySelector("h1");

// Text content
heading.textContent          // reads the raw text
heading.textContent = "New title"  // sets text (safe — no HTML parsing)

heading.innerHTML            // reads the inner HTML string
heading.innerHTML = "<strong>Bold title</strong>"  // parses HTML — never use with user input!

// Attributes
const link = document.querySelector("a");
link.getAttribute("href")           // read any attribute
link.setAttribute("href", "/about") // set any attribute
link.removeAttribute("target")
link.href                           // shortcut for common attributes
link.id
link.className

// CSS classes — the clean way
element.classList.add("active")
element.classList.remove("hidden")
element.classList.toggle("open")        // add if missing, remove if present
element.classList.contains("active")    // true or false

// Inline styles (prefer CSS classes when possible)
element.style.color = "red";
element.style.backgroundColor = "#fff";  // camelCase, not kebab-case
element.style.display = "none";
\`\`\`

### Creating and inserting elements

\`\`\`javascript
// Create a new element
const card = document.createElement("div");
card.className = "card";
card.textContent = "New Card";

// Insert it into the page
document.body.appendChild(card);                           // at the end of body
document.body.prepend(card);                               // at the start
container.insertBefore(card, container.firstChild);        // before a specific element
existingCard.insertAdjacentElement("afterend", card);      // after existing element

// Modern — insertAdjacentHTML (parse HTML string and insert)
container.insertAdjacentHTML("beforeend", "<div class='card'>New Card</div>");

// Remove an element
card.remove();
\`\`\`

### Events — listening for user interaction

\`\`\`javascript
const button = document.querySelector("button");

// Add a listener
button.addEventListener("click", function(event) {
    console.log("Clicked!", event.target);   // event.target is the element that was clicked
});

// Arrow function listener
button.addEventListener("click", (event) => {
    event.preventDefault();    // stop default browser behaviour (e.g. form submission)
    event.stopPropagation();   // stop event from bubbling up to parent elements
});

// Remove a listener (must use the same function reference)
function handleClick() { console.log("clicked"); }
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
\`\`\`

### Common events

| Event | Triggered when |
|-------|---------------|
| \`click\` | Element is clicked |
| \`submit\` | Form is submitted |
| \`input\` | Input value changes (every keystroke) |
| \`change\` | Input loses focus with a changed value |
| \`keydown\` / \`keyup\` | Key is pressed / released |
| \`mouseover\` / \`mouseout\` | Mouse enters / leaves element |
| \`focus\` / \`blur\` | Element gains / loses focus |
| \`DOMContentLoaded\` | HTML parsed, DOM ready (before images load) |
| \`load\` | Page fully loaded including images |

### Event delegation — listen on parent, handle children

Instead of adding a listener to every list item (slow, and misses dynamically added items), add one listener to the parent and check which child was clicked:

\`\`\`javascript
const list = document.querySelector("ul");

// One listener handles ALL list items, including ones added later
list.addEventListener("click", (event) => {
    const item = event.target.closest("li");   // find the nearest li ancestor
    if (!item) return;                          // click was not inside an li

    console.log("Clicked item:", item.textContent);
    item.classList.toggle("selected");
});
\`\`\`

### Reading form values

\`\`\`javascript
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();   // stop page reload

    const name    = document.querySelector("#name").value.trim();
    const email   = document.querySelector("#email").value.trim();
    const checked = document.querySelector("#agree").checked;    // checkbox

    if (!name) {
        alert("Name is required");
        return;
    }

    submitData({ name, email, agree: checked });
});
\`\`\``,
  },
  {
    slug: "js-modern",
    title: "Modern JavaScript Features",
    description: "Optional chaining, nullish coalescing, logical assignment, Symbol, WeakMap, Proxy, and useful patterns.",
    category: "javascript",
    content: `## Modern JavaScript Features

### Optional chaining \`?.\` — safe property access

Before optional chaining, accessing a deeply nested property required multiple null checks. Now you can chain safely — if any step is \`null\` or \`undefined\`, the whole expression returns \`undefined\` instead of throwing:

\`\`\`javascript
// Old way — verbose and fragile
const city = user && user.address && user.address.city;

// With optional chaining — clean and safe
const city    = user?.address?.city;           // undefined if any step is null/undefined
const total   = order?.items?.[0]?.price;      // safe array access too
const result  = server?.getStatus?.();         // safe method call
\`\`\`

### Nullish coalescing \`??\` — better default values

\`||\` uses the right side when the left is any falsy value (including \`0\`, \`""\`, \`false\`). \`??\` only uses the right side when the left is \`null\` or \`undefined\` — much safer for defaults:

\`\`\`javascript
const port    = config.port    || 3000;    // bug: 0 is falsy, returns 3000 instead of 0
const port    = config.port    ?? 3000;    // correct: 0 is not nullish, stays 0

const name    = user.name      ?? "Anonymous";  // only uses "Anonymous" if name is null/undefined
const timeout = options.timeout ?? 5000;
\`\`\`

### Logical assignment operators

\`\`\`javascript
// ??= — assign only if null or undefined
user.name ??= "Guest";            // same as: user.name = user.name ?? "Guest"

// ||= — assign only if falsy
config.host ||= "localhost";      // same as: config.host = config.host || "localhost"

// &&= — assign only if truthy
user.profile &&= sanitize(user.profile);  // only sanitize if profile exists
\`\`\`

### Object and array patterns

\`\`\`javascript
// Rename and default value while destructuring
const { name: userName = "Anonymous", role = "member" } = user;

// Dynamic key from variable
const key = "theme";
const { [key]: themeValue } = settings;    // themeValue = settings.theme

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];    // a = 2, b = 1

// Build array of unique values
const unique = [...new Set(array)];

// Object from Map entries
const obj = Object.fromEntries(map);

// Array to Map
const map = new Map(Object.entries(obj));
\`\`\`

### Map and Set — better than plain objects for collections

\`\`\`javascript
// Map — like an object but keys can be ANY type, insertion order preserved
const cache = new Map();
cache.set("user:1", { name: "Alice" });
cache.set(42, "some value");           // number key
cache.get("user:1");                   // { name: "Alice" }
cache.has("user:1");                   // true
cache.size;                            // 2

for (const [key, value] of cache) {
    console.log(key, value);
}

// Set — unique values, fast lookup
const visited = new Set();
visited.add("/home");
visited.add("/about");
visited.add("/home");       // duplicate — ignored
visited.has("/home");       // true
visited.size;               // 2
\`\`\`

### Symbol — guaranteed unique identifiers

A Symbol is a primitive value that is always unique. Used to add properties to objects without risking name collisions:

\`\`\`javascript
const ID = Symbol("id");           // the string is just a description for debugging
const obj = {};
obj[ID] = 12345;

// Symbols are hidden from normal enumeration
Object.keys(obj)              // []  — Symbol key not included
Object.getOwnPropertySymbols(obj)  // [Symbol(id)]

// Well-known Symbols — customise built-in behaviour
class MyList {
    [Symbol.iterator]() {   // makes the object iterable with for...of
        let i = 0;
        return { next: () => i < 3 ? { value: i++, done: false } : { done: true } };
    }
}
for (const n of new MyList()) console.log(n);  // 0, 1, 2
\`\`\`

### Proxy — intercept and customise object operations

A \`Proxy\` wraps an object and lets you intercept operations like property reads, writes, and function calls:

\`\`\`javascript
const user = { name: "Alice", age: 30 };

const validatedUser = new Proxy(user, {
    set(target, key, value) {
        if (key === "age" && (typeof value !== "number" || value < 0)) {
            throw new TypeError("Age must be a non-negative number");
        }
        target[key] = value;
        return true;
    },
    get(target, key) {
        return key in target ? target[key] : \`Property '\${key}' not found\`;
    }
});

validatedUser.age = 25;       // OK
validatedUser.age = -1;       // TypeError: Age must be a non-negative number
validatedUser.email;          // "Property 'email' not found"
\`\`\`

### WeakMap and WeakRef — memory-friendly references

\`WeakMap\` holds references that do not prevent garbage collection. Useful for storing metadata about objects without causing memory leaks:

\`\`\`javascript
const metadata = new WeakMap();

function registerElement(el) {
    metadata.set(el, { createdAt: Date.now(), clicks: 0 });
}

function trackClick(el) {
    const data = metadata.get(el);
    if (data) data.clicks++;
}

// When the element is removed from the DOM and no other references exist,
// both the element AND its metadata entry are garbage collected automatically.
// This would NOT happen with a regular Map.
\`\`\``,
  },
  {
    slug: "js-error-patterns",
    title: "Error Handling & Useful Patterns",
    description: "try/catch, custom errors, the module pattern, short-circuit evaluation, and practical JS tips.",
    category: "javascript",
    content: `## Error Handling & Useful Patterns

### try / catch / finally — handling errors

When code inside a \`try\` block throws an error (or a rejected Promise is awaited), execution jumps to the \`catch\` block. \`finally\` always runs regardless:

\`\`\`javascript
async function loadUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);

        if (!response.ok) {
            throw new Error(\`HTTP error: \${response.status}\`);
        }

        const user = await response.json();
        return user;

    } catch (error) {
        // error is the thrown Error object
        console.error("Failed to load user:", error.message);
        throw error;                   // re-throw so the caller knows it failed

    } finally {
        hideLoadingSpinner();          // always hides the spinner, success or failure
    }
}
\`\`\`

### Custom error classes — meaningful error types

Extend the built-in \`Error\` class to create errors with extra information. Callers can then \`catch\` specific error types:

\`\`\`javascript
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.name  = "AppError";
        this.code  = code;
    }
}

class NotFoundError extends AppError {
    constructor(resource) {
        super(\`\${resource} not found\`, 404);
        this.name = "NotFoundError";
    }
}

class ValidationError extends AppError {
    constructor(field, message) {
        super(message, 400);
        this.name  = "ValidationError";
        this.field = field;
    }
}
\`\`\`

\`\`\`javascript
async function getUser(id) {
    const user = await db.find(id);
    if (!user) throw new NotFoundError("User");
    return user;
}

try {
    const user = await getUser(999);
} catch (error) {
    if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message, field: error.field });
    }
    throw error;   // unexpected error — re-throw
}
\`\`\`

### Short-circuit evaluation — concise conditionals

JavaScript evaluates \`&&\` and \`||\` lazily and returns the actual value, not just true/false:

\`\`\`javascript
// && — returns right side if left is truthy, otherwise returns left side
const name = user && user.name;          // user.name if user exists, else undefined/null/false
isAdmin && showAdminPanel();             // call only if isAdmin is truthy (like a guard)

// || — returns left side if truthy, otherwise returns right side
const host = config.host || "localhost"; // use config.host if truthy, else fallback

// Combined
const displayName = user?.name || "Anonymous";
\`\`\`

### Useful functional patterns

\`\`\`javascript
// Pipe — apply a series of functions left to right
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const process = pipe(
    str => str.trim(),
    str => str.toLowerCase(),
    str => str.replace(/\\s+/g, "-"),
);
process("  Hello World  ")   // "hello-world"

// Memoize — cache results of pure functions
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Debounce — delay execution until calls stop
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
const onSearch = debounce(searchAPI, 300);   // only calls API after user stops typing for 300ms

// Throttle — limit execution rate
function throttle(fn, interval) {
    let lastRun = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastRun >= interval) {
            lastRun = now;
            fn(...args);
        }
    };
}
const onScroll = throttle(updatePosition, 100);  // at most once per 100ms
\`\`\`

### JSON — serialising data

\`\`\`javascript
const data = { name: "Alice", scores: [95, 87], active: true };

// Serialise to JSON string
const json = JSON.stringify(data);               // compact
const json = JSON.stringify(data, null, 2);      // pretty-printed with 2 spaces

// Parse JSON string back to object
const parsed = JSON.parse(json);
parsed.name    // "Alice"

// Handle parse errors safely
function safeParseJSON(str) {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}
\`\`\`

### localStorage — persist data across page reloads

\`\`\`javascript
// Store
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ id: 1, name: "Alice" }));

// Read
const theme = localStorage.getItem("theme");          // "dark" or null
const user  = JSON.parse(localStorage.getItem("user") ?? "null");

// Delete
localStorage.removeItem("theme");
localStorage.clear();   // delete everything
\`\`\`

### Useful one-liners worth knowing

\`\`\`javascript
// Generate a random integer between min and max (inclusive)
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Deep clone an object (works for JSON-serialisable data)
const clone = obj => JSON.parse(JSON.stringify(obj));

// Group an array by a key
const groupBy = (arr, key) =>
    arr.reduce((acc, item) => {
        (acc[item[key]] ??= []).push(item);
        return acc;
    }, {});

// Chunk an array into pieces of size n
const chunk = (arr, n) =>
    Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
        arr.slice(i * n, i * n + n)
    );

chunk([1,2,3,4,5,6,7], 3)   // [[1,2,3],[4,5,6],[7]]
\`\`\``,
  },
];

export default notes;
