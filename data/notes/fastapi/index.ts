import { Note } from "../../types";

const notes: Note[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. FastAPI at a Glance
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-overview",
    title: "FastAPI at a Glance",
    description: "What FastAPI is, why it's fast, and how it compares to Flask and Django REST.",
    category: "fastapi",
    content: `## FastAPI at a Glance

FastAPI is a modern Python web framework for building APIs. It is built on top of **Starlette** (ASGI web toolkit) and **Pydantic** (data validation), and it uses Python type hints to automatically generate request parsing, validation, serialization, and interactive documentation.

### Why FastAPI?

| Feature | FastAPI | Flask | Django REST |
|---|---|---|---|
| **Performance** | Very high (async ASGI) | Medium (sync WSGI) | Medium (sync WSGI) |
| **Auto validation** | Yes (Pydantic) | Manual | Serializer classes |
| **Auto docs** | Yes (Swagger + ReDoc) | Plugin needed | Plugin needed |
| **Type hints** | First-class | Optional | Optional |
| **Async support** | Native | Limited (via extensions) | Limited |
| **Learning curve** | Low | Very low | High |

FastAPI consistently ranks among the fastest Python frameworks — on par with Node.js and Go for I/O-bound workloads — because it uses async/await throughout and avoids the overhead of synchronous WSGI.

### Hello World

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, World!"}

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query": q}
\`\`\`

\`\`\`bash
uvicorn main:app --reload
# Docs at http://localhost:8000/docs
\`\`\`

### Key Concepts at a Glance

| Concept | Role |
|---|---|
| **Path operation** | A function decorated with \`@app.get/post/put/delete\` |
| **Path parameter** | \`/items/{id}\` — part of the URL |
| **Query parameter** | \`/items?skip=0&limit=10\` — after the \`?\` |
| **Request body** | JSON sent in the POST/PUT body, parsed via Pydantic |
| **Pydantic model** | A class that describes and validates data shapes |
| **Dependency** | A reusable function injected into route handlers |
| **Middleware** | Code that runs before/after every request |
| **Router** | A mini-app that groups related routes |

### How FastAPI Generates Docs

FastAPI reads your type hints and Pydantic models at startup and builds an OpenAPI schema automatically. This powers:
- **Swagger UI** at \`/docs\` — interactive, try-it-now API explorer
- **ReDoc** at \`/redoc\` — clean read-only documentation
- **OpenAPI JSON** at \`/openapi.json\` — machine-readable schema for code generation`,
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Path, Query & Request Body
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-params",
    title: "Path, Query & Request Body",
    description: "How FastAPI reads parameters from the URL, query string, and JSON body — with automatic type coercion.",
    category: "fastapi",
    content: `## Path, Query & Request Body

FastAPI determines where to read each parameter from based on its type annotation and whether it matches a path segment.

### Path Parameters

Declared in the route path with \`{name}\` and in the function signature with a matching argument name. FastAPI validates and coerces the type automatically.

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):          # FastAPI converts "42" → 42, rejects "abc"
    return {"user_id": user_id}

@app.get("/files/{file_path:path}")  # :path captures slashes too
def get_file(file_path: str):
    return {"path": file_path}
\`\`\`

### Query Parameters

Any function parameter that is **not** a path parameter and has no \`Body()\` annotation is treated as a query parameter.

\`\`\`python
@app.get("/items")
def list_items(
    skip: int = 0,          # optional, default 0
    limit: int = 10,        # optional, default 10
    q: str | None = None,   # optional, no default
):
    return {"skip": skip, "limit": limit, "q": q}

# GET /items?skip=20&limit=5&q=book
\`\`\`

### Required vs Optional

\`\`\`python
# Required — no default value
def get_item(item_id: int):          # must be in path or body

# Optional with default
def list_items(limit: int = 10):

# Optional, no value (None allowed)
def search(q: str | None = None):
\`\`\`

### Request Body

Declare a Pydantic model as the parameter type and FastAPI reads it from the JSON body.

\`\`\`python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True    # optional field with default

@app.post("/items")
def create_item(item: Item):
    return {"created": item.name, "price": item.price}

# POST /items  body: {"name": "Widget", "price": 9.99}
\`\`\`

### Mixing All Three

\`\`\`python
@app.put("/users/{user_id}/items/{item_id}")
def update_item(
    user_id: int,          # path
    item_id: int,          # path
    item: Item,            # body (Pydantic model)
    notify: bool = False,  # query parameter
):
    return {"user_id": user_id, "item_id": item_id, "notify": notify}
\`\`\`

### Field-Level Validation with Query() and Path()

\`\`\`python
from fastapi import Query, Path

@app.get("/items/{item_id}")
def get_item(
    item_id: int   = Path(ge=1),                       # must be >= 1
    q:       str   = Query(min_length=3, max_length=50, default=None),
    limit:   int   = Query(default=10, le=100),        # max 100
):
    return {"item_id": item_id, "q": q, "limit": limit}
\`\`\`

| Validator | Meaning |
|---|---|
| \`ge\` | Greater than or equal |
| \`le\` | Less than or equal |
| \`gt\` / \`lt\` | Strictly greater / less |
| \`min_length\` / \`max_length\` | String length bounds |
| \`pattern\` | Regex pattern for strings |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Pydantic Models & Validation
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-pydantic",
    title: "Pydantic Models & Validation",
    description: "Defining data shapes with Pydantic — field types, validators, nested models, and response schemas.",
    category: "fastapi",
    content: `## Pydantic Models & Validation

Pydantic is the engine behind FastAPI's validation. Every request body, response shape, and settings object is a Pydantic model. Pydantic validates data at runtime using Python type hints and raises clear errors when data doesn't conform.

### Basic Model

\`\`\`python
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    email: EmailStr                        # validates email format
    age: int = Field(ge=0, le=150)         # 0 ≤ age ≤ 150
    bio: str | None = None                 # optional
    created_at: datetime = Field(default_factory=datetime.utcnow)
\`\`\`

### Field()

\`Field()\` adds metadata and validation rules to individual fields.

\`\`\`python
from pydantic import BaseModel, Field

class Product(BaseModel):
    name:        str   = Field(min_length=1, max_length=100, description="Product name")
    price:       float = Field(gt=0, description="Price in USD")
    sku:         str   = Field(pattern=r"^[A-Z]{2}-\\d{4}$")   # e.g. AB-1234
    tags:        list[str] = Field(default_factory=list)
\`\`\`

### Nested Models

Pydantic models can be nested — FastAPI validates the entire tree.

\`\`\`python
class Address(BaseModel):
    street: str
    city:   str
    zip:    str

class UserWithAddress(BaseModel):
    name:    str
    email:   EmailStr
    address: Address            # nested model
    tags:    list[str] = []
    metadata: dict[str, str] = {}

# Accepts:
# {
#   "name": "Alice",
#   "email": "alice@example.com",
#   "address": {"street": "1 Main St", "city": "NYC", "zip": "10001"}
# }
\`\`\`

### Custom Validators

\`\`\`python
from pydantic import BaseModel, field_validator, model_validator

class SignupForm(BaseModel):
    username:         str
    password:         str
    confirm_password: str

    @field_validator("username")
    @classmethod
    def username_alphanumeric(cls, v: str) -> str:
        if not v.isalnum():
            raise ValueError("Username must be alphanumeric")
        return v.lower()

    @model_validator(mode="after")
    def passwords_match(self) -> "SignupForm":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self
\`\`\`

### Request vs Response Models

A common pattern is to have separate models for input (create/update) and output (response) to avoid exposing internal fields like passwords or computed fields.

\`\`\`python
class UserCreate(BaseModel):     # what the client sends
    name:     str
    email:    EmailStr
    password: str

class UserResponse(BaseModel):   # what the API returns
    id:         int
    name:       str
    email:      EmailStr
    created_at: datetime

    model_config = {"from_attributes": True}   # allow ORM objects

@app.post("/users", response_model=UserResponse)
def create_user(data: UserCreate):
    user = db.create_user(**data.model_dump(exclude={"password"}))
    return user                  # password never appears in response
\`\`\`

### Common Pydantic Field Types

| Type | Validates |
|---|---|
| \`str\`, \`int\`, \`float\`, \`bool\` | Built-in Python types |
| \`datetime\`, \`date\`, \`time\` | Parses ISO 8601 strings |
| \`EmailStr\` | Valid email format (requires \`email-validator\`) |
| \`HttpUrl\` | Valid HTTP/HTTPS URL |
| \`UUID\` | Valid UUID string |
| \`list[T]\`, \`dict[K, V]\` | Typed collections |
| \`Literal["a", "b"]\` | Only those exact values |
| \`T | None\` | Optional field |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Response Models & Status Codes
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-responses",
    title: "Response Models & Status Codes",
    description: "Controlling what FastAPI returns — response_model, status codes, custom responses, and error handling.",
    category: "fastapi",
    content: `## Response Models & Status Codes

### response_model

Pass a Pydantic model to \`response_model\` to filter, validate, and document the API's output. Any extra fields on the returned object are stripped.

\`\`\`python
class ItemResponse(BaseModel):
    id:    int
    name:  str
    price: float

@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: int):
    item = db.get_item(item_id)   # may have more fields (e.g. internal_cost)
    return item                   # only id, name, price reach the client
\`\`\`

### Status Codes

\`\`\`python
from fastapi import status

@app.post("/items", status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate):
    return db.create(item)

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int):
    db.delete(item_id)
    # return nothing — 204 has no body
\`\`\`

### HTTPException — Returning Errors

\`\`\`python
from fastapi import HTTPException

@app.get("/items/{item_id}")
def get_item(item_id: int):
    item = db.get_item(item_id)
    if not item:
        raise HTTPException(
            status_code=404,
            detail=f"Item {item_id} not found",
        )
    return item
\`\`\`

The \`detail\` field can be a string, dict, or list — FastAPI serialises it to JSON.

### Custom Exception Handlers

\`\`\`python
from fastapi import Request
from fastapi.responses import JSONResponse

class InsufficientFundsError(Exception):
    def __init__(self, balance: float, amount: float):
        self.balance = balance
        self.amount  = amount

@app.exception_handler(InsufficientFundsError)
async def insufficient_funds_handler(request: Request, exc: InsufficientFundsError):
    return JSONResponse(
        status_code=402,
        content={"error": "Insufficient funds", "balance": exc.balance, "required": exc.amount},
    )

# Now just raise it anywhere
raise InsufficientFundsError(balance=10.0, amount=50.0)
\`\`\`

### Union Response Types

\`\`\`python
from typing import Union

class Cat(BaseModel):
    name: str
    indoor: bool

class Dog(BaseModel):
    name: str
    breed: str

@app.get("/pets/{pet_id}", response_model=Union[Cat, Dog])
def get_pet(pet_id: int):
    return db.get_pet(pet_id)
\`\`\`

### Returning Raw Responses

Sometimes you need full control — binary files, streaming, custom headers:

\`\`\`python
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse, StreamingResponse

@app.get("/download/{filename}")
def download_file(filename: str):
    return FileResponse(
        path=f"files/{filename}",
        media_type="application/octet-stream",
        filename=filename,
    )

@app.get("/stream")
def stream_data():
    def generate():
        for i in range(100):
            yield f"data: {i}\\n\\n"
    return StreamingResponse(generate(), media_type="text/event-stream")
\`\`\`

### Common Status Codes

| Code | Meaning | Use when |
|---|---|---|
| 200 OK | Success | Default GET/PUT |
| 201 Created | Resource created | POST that creates |
| 204 No Content | Success, no body | DELETE |
| 400 Bad Request | Invalid input | Validation failed |
| 401 Unauthorized | Not authenticated | Missing/invalid token |
| 403 Forbidden | Not authorized | Valid token, no permission |
| 404 Not Found | Resource missing | Item doesn't exist |
| 422 Unprocessable | Pydantic validation failed | FastAPI auto-returns this |
| 500 Internal Error | Unhandled exception | Bug in your code |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Dependency Injection
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-dependencies",
    title: "Dependency Injection",
    description: "FastAPI's Depends() system — reusable logic for auth, DB sessions, pagination, and shared validation.",
    category: "fastapi",
    content: `## Dependency Injection

FastAPI has a built-in dependency injection system. A **dependency** is any callable (function or class) that FastAPI calls before your route handler and injects the result. Dependencies can themselves have dependencies, forming a tree that FastAPI resolves automatically.

### A Simple Dependency

\`\`\`python
from fastapi import Depends, FastAPI

app = FastAPI()

def get_pagination(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/items")
def list_items(pagination: dict = Depends(get_pagination)):
    return db.get_items(**pagination)

@app.get("/users")
def list_users(pagination: dict = Depends(get_pagination)):
    return db.get_users(**pagination)
\`\`\`

The same \`get_pagination\` logic is reused across routes without copying code.

### Database Session Dependency

The most common use of dependencies is managing DB sessions — open before the request, close after.

\`\`\`python
from sqlalchemy.orm import Session
from database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db       # yield → FastAPI runs cleanup after the route finishes
    finally:
        db.close()

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()
\`\`\`

### Authentication Dependency

\`\`\`python
from fastapi import Depends, HTTPException, Header

def require_api_key(x_api_key: str = Header(...)):
    if x_api_key != "secret-key":
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key

@app.get("/protected", dependencies=[Depends(require_api_key)])
def protected_route():
    return {"message": "You are authenticated"}

# Or inject the value
@app.get("/me")
def get_me(api_key: str = Depends(require_api_key)):
    return {"api_key": api_key}
\`\`\`

### Class-Based Dependencies

When a dependency needs configuration or state, use a class with \`__call__\`:

\`\`\`python
class RateLimiter:
    def __init__(self, max_calls: int):
        self.max_calls = max_calls

    def __call__(self, request: Request):
        client_ip = request.client.host
        count = redis.incr(client_ip)
        if count > self.max_calls:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")

strict_limit = RateLimiter(max_calls=10)
relaxed_limit = RateLimiter(max_calls=100)

@app.post("/login",   dependencies=[Depends(strict_limit)])
def login(): ...

@app.get("/search",   dependencies=[Depends(relaxed_limit)])
def search(): ...
\`\`\`

### Nested Dependencies

\`\`\`python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(db: Session = Depends(get_db), token: str = Header(...)):
    user = db.query(User).filter(User.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

def require_admin(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    return user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, admin: User = Depends(require_admin)):
    db.delete_user(user_id)
\`\`\`

FastAPI automatically caches dependency results within a request — \`get_db\` is called once even if multiple dependencies use it.`,
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Async & Background Tasks
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-async",
    title: "Async & Background Tasks",
    description: "Writing async route handlers, mixing sync and async code, and offloading work with BackgroundTasks.",
    category: "fastapi",
    content: `## Async & Background Tasks

### async def vs def

FastAPI supports both sync and async route handlers. Use \`async def\` when you're doing I/O — database queries, HTTP calls, file reads. Use plain \`def\` for CPU-bound work (FastAPI runs it in a thread pool automatically).

\`\`\`python
import httpx

# Async — awaits I/O without blocking other requests
@app.get("/weather")
async def get_weather(city: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.weather.com/{city}")
    return response.json()

# Sync — FastAPI runs this in a thread pool, safe for blocking libs
@app.get("/report")
def generate_report():
    data = slow_pandas_operation()   # blocking, but OK in def
    return data
\`\`\`

**Never call blocking code (\`time.sleep\`, synchronous DB drivers, \`requests\`) inside \`async def\`** — it freezes the entire server for the duration of the call.

| Situation | Use |
|---|---|
| Async DB driver (asyncpg, motor) | \`async def\` + \`await\` |
| Async HTTP (httpx, aiohttp) | \`async def\` + \`await\` |
| Sync ORM (SQLAlchemy sync) | \`def\` (FastAPI uses thread pool) |
| CPU-heavy computation | \`def\` or offload to a worker |

### Async Database with SQLAlchemy 2.0

\`\`\`python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

### Background Tasks

\`BackgroundTasks\` lets you run work after the response has been sent. Good for sending emails, logging, or triggering webhooks without making the client wait.

\`\`\`python
from fastapi import BackgroundTasks
import smtplib

def send_welcome_email(email: str, name: str):
    # Runs after response is sent — client doesn't wait for this
    mailer.send(to=email, subject="Welcome!", body=f"Hello {name}")

def log_signup(user_id: int):
    analytics.track("signup", user_id=user_id)

@app.post("/signup", status_code=201)
def signup(
    data: SignupForm,
    background_tasks: BackgroundTasks,
):
    user = db.create_user(data)
    background_tasks.add_task(send_welcome_email, user.email, user.name)
    background_tasks.add_task(log_signup, user.id)
    return {"id": user.id}   # returned immediately; tasks run after
\`\`\`

### Startup & Shutdown Events

Run code when the application starts or stops — connect to a database pool, load an ML model, etc.

\`\`\`python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await db_pool.connect()
    model = load_ml_model("model.pkl")
    app.state.model = model
    yield
    # Shutdown
    await db_pool.disconnect()

app = FastAPI(lifespan=lifespan)

@app.post("/predict")
async def predict(data: InputData):
    model = app.state.model
    return {"result": model.predict(data.features)}
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Authentication & JWT
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-auth",
    title: "Authentication & JWT",
    description: "Implementing JWT-based auth with OAuth2 password flow, token creation, and protected routes.",
    category: "fastapi",
    content: `## Authentication & JWT

FastAPI ships with OAuth2 helpers and integrates cleanly with JWT. The standard pattern is:

1. Client sends username + password to \`/token\`
2. Server validates, returns a signed JWT access token
3. Client includes the token in every subsequent request as \`Authorization: Bearer <token>\`
4. Server verifies the token on protected routes

### Install Dependencies

\`\`\`bash
pip install python-jose[cryptography] passlib[bcrypt]
\`\`\`

### Token Creation

\`\`\`python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY  = "your-secret-key-keep-it-safe"
ALGORITHM   = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
\`\`\`

### Login Endpoint

\`\`\`python
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
def login(form: OAuth2PasswordRequestForm = Depends()):
    user = db.get_user_by_email(form.username)
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
\`\`\`

### Verifying the Token (Current User Dependency)

\`\`\`python
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.get_user(int(user_id))
    if user is None:
        raise credentials_exception
    return user

# Protect any route
@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/admin/stats")
def admin_stats(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    return db.get_stats()
\`\`\`

### Refresh Tokens

For longer-lived sessions, issue a short-lived access token (15 min) and a long-lived refresh token (7 days). The client uses the refresh token to get a new access token silently.

\`\`\`python
def create_tokens(user_id: int):
    access_token  = create_access_token({"sub": str(user_id), "type": "access"},  expires_minutes=15)
    refresh_token = create_access_token({"sub": str(user_id), "type": "refresh"}, expires_minutes=60*24*7)
    return access_token, refresh_token

@app.post("/refresh")
def refresh(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user_id = payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": user_id, "type": "access"}, expires_minutes=15)
    return {"access_token": new_access_token}
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Routers & App Structure
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-routers",
    title: "Routers & App Structure",
    description: "Splitting a FastAPI app into modules with APIRouter — the right project layout for real applications.",
    category: "fastapi",
    content: `## Routers & App Structure

As an API grows, keeping all routes in \`main.py\` becomes unmanageable. FastAPI's \`APIRouter\` works like a mini app — you define routes on it and include it in the main app with a prefix.

### APIRouter

\`\`\`python
# routers/users.py
from fastapi import APIRouter, Depends
from dependencies import get_db, get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"],              # groups endpoints in docs
    dependencies=[Depends(get_current_user)],  # applies to all routes here
)

@router.get("/")
def list_users(db = Depends(get_db)):
    return db.query(User).all()

@router.get("/{user_id}")
def get_user(user_id: int, db = Depends(get_db)):
    return db.query(User).filter(User.id == user_id).first()

@router.post("/")
def create_user(data: UserCreate, db = Depends(get_db)):
    user = User(**data.model_dump())
    db.add(user)
    db.commit()
    return user
\`\`\`

\`\`\`python
# main.py
from fastapi import FastAPI
from routers import users, items, auth

app = FastAPI(title="My API", version="1.0.0")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(items.router, prefix="/api/v1")
\`\`\`

### Recommended Project Layout

\`\`\`
my_api/
├── main.py              # creates app, includes routers
├── dependencies.py      # shared Depends() functions
├── database.py          # engine, session, Base
├── models/              # SQLAlchemy ORM models
│   ├── __init__.py
│   ├── user.py
│   └── item.py
├── schemas/             # Pydantic request/response models
│   ├── __init__.py
│   ├── user.py
│   └── item.py
├── routers/             # APIRouter modules
│   ├── __init__.py
│   ├── auth.py
│   ├── users.py
│   └── items.py
├── services/            # business logic (no HTTP concerns)
│   ├── user_service.py
│   └── item_service.py
└── config.py            # Settings via pydantic-settings
\`\`\`

### Configuration with pydantic-settings

\`\`\`python
# config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url:  str
    secret_key:    str
    debug:         bool = False
    allowed_hosts: list[str] = ["*"]

    model_config = {"env_file": ".env"}

settings = Settings()   # reads from environment / .env

# Use anywhere
from config import settings
engine = create_engine(settings.database_url)
\`\`\`

### API Versioning

\`\`\`python
from fastapi import FastAPI
from routers.v1 import users as users_v1
from routers.v2 import users as users_v2

app = FastAPI()
app.include_router(users_v1.router, prefix="/api/v1")
app.include_router(users_v2.router, prefix="/api/v2")
\`\`\`

Or use separate sub-applications:

\`\`\`python
v1 = FastAPI()
v2 = FastAPI()

# attach routes to v1, v2...

app = FastAPI()
app.mount("/api/v1", v1)
app.mount("/api/v2", v2)
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Database with SQLAlchemy
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-database",
    title: "Database with SQLAlchemy",
    description: "Connecting FastAPI to a relational database using SQLAlchemy ORM — models, sessions, and CRUD.",
    category: "fastapi",
    content: `## Database with SQLAlchemy

### Setup

\`\`\`bash
pip install sqlalchemy psycopg2-binary alembic
\`\`\`

\`\`\`python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/mydb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass
\`\`\`

### Defining Models

\`\`\`python
# models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    email      = Column(String, unique=True, index=True, nullable=False)
    password   = Column(String, nullable=False)
    is_active  = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = "posts"

    id        = Column(Integer, primary_key=True)
    title     = Column(String, nullable=False)
    body      = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="posts")
\`\`\`

### Session Dependency

\`\`\`python
# dependencies.py
from database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
\`\`\`

### CRUD Operations

\`\`\`python
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", status_code=201)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(**data.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)    # load the generated id and defaults
    return user

@app.patch("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
\`\`\`

### Migrations with Alembic

\`\`\`bash
alembic init alembic
# Edit alembic/env.py to point to your DATABASE_URL and Base.metadata

alembic revision --autogenerate -m "create users table"
alembic upgrade head
alembic downgrade -1    # roll back one step
\`\`\`

### Filtering, Ordering, Pagination

\`\`\`python
@app.get("/users")
def list_users(
    skip:   int = 0,
    limit:  int = 20,
    active: bool = True,
    db: Session = Depends(get_db),
):
    return (
        db.query(User)
          .filter(User.is_active == active)
          .order_by(User.created_at.desc())
          .offset(skip)
          .limit(limit)
          .all()
    )
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 10. Middleware & CORS
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-middleware",
    title: "Middleware & CORS",
    description: "Writing custom middleware, adding CORS headers, and using built-in Starlette middleware.",
    category: "fastapi",
    content: `## Middleware & CORS

Middleware is code that wraps every request and response. It runs before the route handler on the way in and after it on the way out — perfect for logging, timing, CORS headers, and authentication at the transport layer.

### CORS

The most commonly needed middleware. Browsers block cross-origin requests unless the server explicitly allows them.

\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com", "http://localhost:3000"],
    allow_credentials=True,             # allow cookies / auth headers
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)
\`\`\`

For development set \`allow_origins=["*"]\` — restrict to specific domains in production.

### Custom Middleware with @app.middleware

\`\`\`python
import time
from fastapi import Request

@app.middleware("http")
async def add_timing_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)         # call the route handler
    duration = time.perf_counter() - start
    response.headers["X-Process-Time"] = str(round(duration * 1000, 2)) + "ms"
    return response
\`\`\`

### Request Logging Middleware

\`\`\`python
import logging
logger = logging.getLogger("api")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"→ {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"← {response.status_code}")
    return response
\`\`\`

### BaseHTTPMiddleware (Class-Based)

\`\`\`python
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests: int = 100):
        super().__init__(app)
        self.max_requests = max_requests

    async def dispatch(self, request: Request, call_next) -> Response:
        client_ip = request.client.host
        count = await redis.incr(f"rate:{client_ip}")
        if count > self.max_requests:
            return Response("Rate limit exceeded", status_code=429)
        return await call_next(request)

app.add_middleware(RateLimitMiddleware, max_requests=60)
\`\`\`

### Trusted Host & HTTPS Redirect

\`\`\`python
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

# Only accept requests for these hostnames
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["myapi.com", "*.myapi.com"])

# Redirect all HTTP traffic to HTTPS
app.add_middleware(HTTPSRedirectMiddleware)
\`\`\`

### GZip Compression

\`\`\`python
from starlette.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)  # compress responses > 1KB
\`\`\`

### Middleware Order

Middleware is applied in **reverse order** — the last one added wraps the outermost layer.

\`\`\`python
app.add_middleware(CORSMiddleware, ...)        # applied 3rd (outermost)
app.add_middleware(RateLimitMiddleware, ...)   # applied 2nd
app.add_middleware(GZipMiddleware, ...)        # applied 1st (innermost, closest to route)
\`\`\``,
  },

  // ─────────────────────────────────────────────────────────────
  // 11. Testing FastAPI
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-testing",
    title: "Testing FastAPI",
    description: "Writing unit and integration tests with pytest and FastAPI's TestClient — mocking dependencies and the DB.",
    category: "fastapi",
    content: `## Testing FastAPI

FastAPI ships with \`TestClient\` (based on HTTPX) that lets you test your API without running a real server. Combine it with pytest for a clean testing setup.

### Basic Setup

\`\`\`bash
pip install pytest httpx pytest-asyncio
\`\`\`

\`\`\`python
# tests/test_items.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}

def test_create_item():
    response = client.post("/items", json={"name": "Widget", "price": 9.99})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Widget"
    assert "id" in data

def test_item_not_found():
    response = client.get("/items/99999")
    assert response.status_code == 404
\`\`\`

### Overriding Dependencies

The most powerful testing feature — swap out the real database with a test database, or mock out auth:

\`\`\`python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, get_db
from main import app

TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSession = sessionmaker(bind=engine)

def override_get_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create tables before tests, drop after
Base.metadata.create_all(bind=engine)

def test_create_user():
    response = client.post("/users", json={
        "name": "Alice",
        "email": "alice@example.com",
        "password": "secret123",
    })
    assert response.status_code == 201
    assert response.json()["email"] == "alice@example.com"
\`\`\`

### Mocking Authentication

\`\`\`python
from dependencies import get_current_user

fake_user = User(id=1, name="Test User", email="test@example.com", is_admin=True)

app.dependency_overrides[get_current_user] = lambda: fake_user

def test_protected_route():
    response = client.get("/me")
    assert response.status_code == 200
    assert response.json()["name"] == "Test User"
\`\`\`

### Async Tests with pytest-asyncio

\`\`\`python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_async_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/async-route")
    assert response.status_code == 200
\`\`\`

### Fixtures for Common Setup

\`\`\`python
import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c

@pytest.fixture
def auth_client(client):
    # Log in and get a token
    response = client.post("/token", data={"username": "test@example.com", "password": "secret"})
    token = response.json()["access_token"]
    client.headers["Authorization"] = f"Bearer {token}"
    return client

def test_get_me(auth_client):
    response = auth_client.get("/me")
    assert response.status_code == 200
\`\`\`

### What to Test

| Test type | What to cover |
|---|---|
| **Happy path** | Valid input → correct status + response body |
| **Validation errors** | Invalid types, missing fields → 422 |
| **Not found** | Missing resource → 404 |
| **Auth** | No token → 401, wrong role → 403 |
| **Business rules** | Duplicate email → 400, rate limit → 429 |`,
  },

  // ─────────────────────────────────────────────────────────────
  // 12. WebSockets & Server-Sent Events
  // ─────────────────────────────────────────────────────────────
  {
    slug: "fastapi-websockets",
    title: "WebSockets & SSE",
    description: "Real-time communication with WebSockets and Server-Sent Events in FastAPI.",
    category: "fastapi",
    content: `## WebSockets & Server-Sent Events

### WebSockets

FastAPI supports WebSockets natively. A WebSocket handler is an \`async def\` function that receives a \`WebSocket\` object and manages the connection loop.

\`\`\`python
from fastapi import WebSocket, WebSocketDisconnect

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo from {client_id}: {data}")
    except WebSocketDisconnect:
        print(f"Client {client_id} disconnected")
\`\`\`

### Connection Manager (Broadcasting)

For chat or live feed scenarios where you need to broadcast to multiple connected clients:

\`\`\`python
class ConnectionManager:
    def __init__(self):
        self.active: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)

    async def broadcast(self, message: str):
        for ws in self.active:
            await ws.send_text(message)

    async def send_personal(self, message: str, ws: WebSocket):
        await ws.send_text(message)

manager = ConnectionManager()

@app.websocket("/chat")
async def chat(websocket: WebSocket, username: str):
    await manager.connect(websocket)
    await manager.broadcast(f"{username} joined the chat")
    try:
        while True:
            msg = await websocket.receive_text()
            await manager.broadcast(f"{username}: {msg}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{username} left the chat")
\`\`\`

### Sending JSON Over WebSocket

\`\`\`python
@app.websocket("/live")
async def live_data(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = {"price": get_current_price(), "timestamp": now()}
        await websocket.send_json(data)
        await asyncio.sleep(1)
\`\`\`

### Server-Sent Events (SSE)

SSE is simpler than WebSockets — one-directional from server to client over a regular HTTP connection. Great for live logs, notifications, and progress updates.

\`\`\`python
from fastapi.responses import StreamingResponse
import asyncio

@app.get("/events")
async def event_stream():
    async def generate():
        for i in range(10):
            yield f"data: Step {i + 1} of 10\\n\\n"
            await asyncio.sleep(0.5)
        yield "data: done\\n\\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
\`\`\`

On the client (browser):

\`\`\`javascript
const source = new EventSource("/events");
source.onmessage = (e) => console.log(e.data);
source.onerror   = ()  => source.close();
\`\`\`

### WebSocket vs SSE

| | WebSocket | SSE |
|---|---|---|
| **Direction** | Full-duplex (both ways) | Server → client only |
| **Protocol** | WS / WSS | HTTP |
| **Reconnect** | Manual | Automatic |
| **Binary support** | Yes | No (text only) |
| **Use case** | Chat, games, collaborative editing | Live feeds, notifications, logs |`,
  },
];

export default notes;
