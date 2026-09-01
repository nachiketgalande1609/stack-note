import { Note } from "../../types";

const notes: Note[] = [
  {
    slug: "what-is-ai",
    title: "What is AI?",
    description: "A concept-first overview of AI history, from symbolic rules to large language models.",
    category: "ai",
    content: `## What is AI?

Artificial intelligence is the umbrella term for systems that perform tasks we normally associate with human cognition: recognizing patterns, making decisions, generating language, and adapting to new input. The field has moved through a few distinct eras:

- **Symbolic AI (1950s–80s)** — hand-written rules and logic trees, like expert systems that encoded a doctor's diagnostic knowledge as if-then statements. These were brittle: they only knew what a human explicitly told them, and failed the moment reality diverged from the rulebook.
- **Statistical machine learning (1990s–2000s)** — systems learned to infer patterns from examples instead of being told the rules directly, replacing hand-written logic with statistics learned from data.
- **Deep learning (2012–2017)** — neural networks with many layers began dramatically outperforming older methods on vision and speech tasks, once enough data and compute became available.
- **Large language models (2018–now)** — the same underlying deep learning idea extended to text at massive scale.

Progress wasn't linear — it stalled repeatedly in periods called "AI winters," when funding and enthusiasm collapsed after early hype outran results. It also helps to place AI on a spectrum of capability:

- **Narrow AI** — excellent at one task, like translation or spam detection. This is what every system in production today actually is, including LLMs.
- **General AI** — human-level flexibility across arbitrary tasks. Still a hypothetical goal, not a deployed reality.`,
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    description: "Supervised, unsupervised, and reinforcement learning — plus the training vs. inference distinction.",
    category: "ai",
    content: `## Machine Learning

Machine learning is the practice of letting a system learn a function from data instead of programming that function by hand. There are three broad paradigms:

- **Supervised learning** — trains on labeled examples, input paired with the correct output (like emails marked spam or not-spam), so the model learns a mapping it can apply to new, unlabeled inputs.
- **Unsupervised learning** — works on unlabeled data and looks for structure on its own, such as clustering customers into behavioral segments without being told what the segments should be.
- **Reinforcement learning** — an agent takes actions in an environment and learns from a reward signal, gradually favoring actions that lead to better outcomes, the way a game-playing system learns strategy through trial and error.

A distinction that matters enormously for developers is **training versus inference**:

- **Training** is the expensive, offline phase where the model's internal parameters are adjusted by repeatedly comparing its predictions to correct answers and nudging itself to be less wrong — this can take days or weeks on specialized hardware.
- **Inference** is what happens afterward, every time your application calls the model: it uses the already-learned, frozen parameters to produce an output for a new input, in milliseconds to seconds.

When you call an LLM API, you are almost always paying for inference; the training already happened, once, long before your request.`,
  },
  {
    slug: "neural-networks",
    title: "Neural Networks",
    description: "Neurons, weights, layers, activation functions, and backpropagation explained.",
    category: "ai",
    content: `## Neural Networks

A neural network is built from simple units called **neurons**, arranged in **layers**. Each neuron does the same three things:

- Receives numbers from the previous layer and multiplies each one by a learned **weight**.
- Adds a **bias** term to the result.
- Passes that sum through an **activation function** — a nonlinearity like ReLU or GELU that lets the network model curved, complex relationships instead of only straight lines.

A typical network has an input layer (raw features), one or more hidden layers (intermediate representations), and an output layer (the prediction). None of this is mysterious math magic: it is repeated weighted addition followed by a squashing function, stacked many times.

Information moves through the network in a **forward pass**: input values enter the first layer, get transformed layer by layer, and emerge as an output — a classification, a score, a next-token probability. The weights themselves are not designed by a human; they are learned by comparing the network's output to the correct answer, measuring the error, and adjusting every weight slightly in the direction that reduces that error, a procedure called **backpropagation**. Across millions of examples and adjustments, the network gradually discovers weight values that produce useful outputs — this is what "learning" concretely means at the mechanical level.`,
  },
  {
    slug: "deep-learning",
    title: "Deep Learning",
    description: "Feature hierarchies, CNNs, RNNs, and why depth matters.",
    category: "ai",
    content: `## Deep Learning

Deep learning is simply neural networks with many hidden layers stacked on top of each other — the "deep" refers to depth of layers, not depth of intelligence. Depth matters because it lets the network build a **feature hierarchy**: early layers learn tiny, generic patterns, and later layers combine those into increasingly abstract concepts. In an image model:

- The first layer might detect edges and color gradients.
- The next layer combines edges into textures and simple shapes.
- Deeper layers assemble shapes into recognizable objects like faces or cars.

No one programs this hierarchy explicitly; it emerges from training because it is an efficient way to solve the task. Two classic architectures illustrate the idea before transformers took over:

- **Convolutional neural network (CNN)** — scans small filters across an image, reusing the same weights at every position, which makes it efficient at detecting local visual patterns regardless of where they appear in the frame.
- **Recurrent neural network (RNN)** — processes sequences step by step, carrying a "hidden state" forward from one time step to the next, so it can in principle remember earlier parts of a sentence or a time series as it reads later parts.

Both were largely superseded for language tasks by the transformer architecture, but the underlying intuition — local pattern detection for CNNs, sequential memory for RNNs — is still useful for understanding why certain model choices exist in specialized domains like vision and audio.`,
  },
  {
    slug: "large-language-models",
    title: "Large Language Models (LLMs)",
    description: "Transformers, next-token prediction, emergent abilities, and developer-facing limitations.",
    category: "ai",
    content: `## Large Language Models (LLMs)

An LLM is a deep neural network, almost always built on the **transformer** architecture, trained to predict the next token in a sequence of text after ingesting a huge portion of the internet, books, code, and other text. That single objective — predict what comes next — turns out to be enough pressure for the model to internalize grammar, facts, reasoning patterns, and even some world knowledge, purely as a side effect of getting very good at prediction. "Large" refers to scale along three axes at once: number of parameters (the learned weights, often in the tens or hundreds of billions), volume of training data, and amount of compute used to train it.

Scale produces **emergent abilities**: capabilities like multi-step arithmetic, basic code generation, or following complex instructions that are essentially absent in smaller models but appear fairly abruptly once a model crosses a certain size threshold. This is why a model twice as large is not just "twice as good" — it can unlock qualitatively new behavior. LLMs still have hard limitations developers must design around:

- A fixed **knowledge cutoff** date.
- A tendency to state incorrect information confidently (hallucination).
- No persistent memory between separate API calls unless you build it yourself.
- Real per-token cost and latency that scale with how much text you send and receive.`,
  },
  {
    slug: "tokens",
    title: "Tokens",
    description: "How tokenizers work, sub-word encoding, and why tokens matter for pricing and context limits.",
    category: "ai",
    content: `## Tokens

LLMs do not read text as characters or whole words; they read **tokens**, chunks produced by a tokenizer that usually splits text into common words, sub-words, or punctuation marks. A word like "unbelievable" might be split into pieces like "un", "believ", and "able" if the tokenizer has not memorized the whole word as one unit — this sub-word approach lets the model handle rare words, typos, and new terms it has never seen intact, by assembling them from familiar fragments. As a rough rule of thumb, one token is close to four characters of English text, or about three-quarters of a word, though this varies a lot by language and content type.

Tokens matter directly to developers for two practical reasons:

- **API pricing** is almost universally billed per token, for both the text you send in and the text the model generates back, so verbose prompts and long responses cost real money at scale.
- Every model has a **token limit** — the context window — and if your prompt plus expected response exceeds it, the request will fail or get silently truncated.

Non-English languages and code often tokenize less efficiently than English prose, meaning the same idea can cost more tokens depending on the language or format it's expressed in, which is worth knowing when estimating cost for international or code-heavy products.`,
  },
  {
    slug: "embeddings",
    title: "Embeddings",
    description: "Vectors, semantic similarity, cosine distance, and how embeddings power search and RAG.",
    category: "ai",
    content: `## Embeddings

An embedding is a way of translating meaning into numbers. A piece of text — a word, sentence, or whole document — is passed through a model that outputs a fixed-length list of numbers, a **vector**, typically with hundreds or thousands of dimensions. The vector itself looks like meaningless noise to a human, but its position in that high-dimensional space is not arbitrary: it is learned so that texts with similar meaning end up close together, and texts with unrelated meaning end up far apart. "Puppy" and "dog" will have vectors that sit near each other; "dog" and "spreadsheet" will not, even though all three might share letters or be the same length as strings.

**Semantic similarity** is measured by comparing vectors mathematically, most commonly with cosine similarity, which checks how closely two vectors point in the same direction regardless of their magnitude. This is the mechanism that powers semantic search: instead of matching keywords, you convert a query into a vector and find stored vectors nearest to it, surfacing results that mean the same thing even if they use completely different words. Embeddings are the foundational building block for:

- Retrieval-augmented generation (RAG).
- Recommendation systems.
- Deduplication of near-identical content.
- Clustering — grouping text by topic without labels.

Anywhere "how alike are these two pieces of text" needs a numeric answer, embeddings are the tool.`,
  },
  {
    slug: "temperature-and-sampling",
    title: "Temperature & Sampling",
    description: "How temperature, top-p, and top-k shape LLM output randomness.",
    category: "ai",
    content: `## Temperature & Sampling

When an LLM generates the next token, it does not compute one certain answer — it computes a probability distribution over its entire vocabulary, essentially a ranked list of "how likely is each possible next token." **Temperature** controls how that distribution is sampled:

- Near zero, the model almost always picks the single most probable token, producing deterministic, focused, repeatable output — good for factual lookups, classification, or code generation where you want the same input to reliably produce the same output.
- Higher temperatures flatten the distribution, giving lower-probability tokens a real chance of being chosen, which produces more varied, surprising, and "creative" text — useful for brainstorming or fiction, riskier for anything requiring precision.

**Top-p (nucleus sampling)** and **top-k** are complementary controls that trim the distribution before sampling:

- **Top-k** keeps only the k most likely next tokens and ignores the rest entirely.
- **Top-p** keeps the smallest set of tokens whose combined probability adds up to p (say, 0.9), so the cutoff adapts to how confident the model is at that step — a very confident prediction might need just one or two tokens to reach 0.9, while an uncertain one might need dozens.

In practice, developers usually tune temperature first, use top-p as a safety rail against truly bizarre low-probability tokens, and lower both toward zero for any task where consistency matters more than variety.`,
  },
  {
    slug: "prompting",
    title: "Prompting",
    description: "Zero-shot, few-shot, chain-of-thought, system prompts, and prompt engineering.",
    category: "ai",
    content: `## Prompting

Prompting is how you steer an LLM's behavior using only natural language input, and the structure of your prompt has a measurable effect on output quality:

- **Zero-shot** — just asks the model to do the task directly, relying entirely on knowledge from training.
- **Few-shot** — includes a handful of worked examples of the task before the real question, which sharply improves consistency for tasks with a specific format or style the model hasn't reliably inferred on its own.
- **Chain-of-thought** — asks the model to reason step by step before giving a final answer, which measurably improves accuracy on multi-step problems because it gives the model room to work through intermediate logic rather than jumping straight to a guess.

Two more concepts round out the practice:

- A **system prompt** is a separate instruction channel, set once by the developer rather than the end user, that persists across the conversation to define the model's persona, constraints, and behavior — for example, telling it to always respond in valid JSON, or to refuse certain topics.
- **Prompt engineering** is the iterative practice of refining wording, structure, and examples to reliably get the output shape and quality you need — closer to writing a precise specification than to traditional programming, since small wording changes can produce surprisingly large differences in output.`,
  },
  {
    slug: "context-window",
    title: "Context Window",
    description: "What the context window is, why it matters, and strategies for managing it.",
    category: "ai",
    content: `## Context Window

The context window is the total number of tokens an LLM can consider at once, covering the system prompt, conversation history, any documents you inject, the user's current message, and the model's own response, all combined. It is not extra memory the model can draw on later — it is the entire working memory for that single request. Once a conversation or document exceeds this budget, something has to give: the API will reject the request, or your application has to actively decide what to drop or compress before sending it.

This limit is why real applications need explicit strategies rather than just dumping everything into the prompt:

- **Summarization** compresses older conversation turns into a shorter recap instead of keeping full transcripts.
- **Chunking** breaks large documents into smaller pieces so only relevant sections get included per request, usually paired with retrieval.
- **Sliding windows** keep only the most recent N turns of a conversation, discarding older ones outright.
- **Retrieval** fetches just the handful of facts relevant to the current question instead of including a whole knowledge base.

Larger context windows reduce how often you need these tricks, but even very large windows have diminishing returns: models tend to pay less attention to content buried in the middle of a very long prompt, a phenomenon often called "lost in the middle."`,
  },
  {
    slug: "rag",
    title: "RAG (Retrieval-Augmented Generation)",
    description: "How RAG works, the pipeline from chunks to grounded answers, and where to tune it.",
    category: "ai",
    content: `## RAG (Retrieval-Augmented Generation)

RAG exists to solve a concrete problem: an LLM's knowledge is frozen at its training cutoff and contains nothing about your private data — your company's documents, your product's support tickets, last week's changes. Instead of retraining or fine-tuning the model every time your data changes, RAG fetches relevant information at request time and inserts it directly into the prompt, so the model answers using fresh, specific, grounded context instead of relying purely on what it memorized during training. This also substantially reduces hallucination, because the model has real source material to draw from rather than guessing.

The pipeline has a consistent shape:

- Documents are first split into **chunks** — passages small enough to be individually relevant but large enough to retain meaning.
- Each chunk is converted into an embedding and stored in a vector database.
- At query time, the user's question is embedded the same way, and the database returns the chunks whose embeddings are closest to the query.
- Because raw similarity search can surface loosely related noise, many pipelines add a **reranking** step, a more precise (and more expensive) model that re-scores the retrieved candidates and keeps only the genuinely best matches.
- Those final chunks are inserted into the prompt alongside the user's question, and the LLM generates its answer grounded in that retrieved material.

Chunk size, overlap between chunks, and reranking quality are usually the biggest levers for improving RAG accuracy in practice.`,
  },
  {
    slug: "vector-databases",
    title: "Vector Databases",
    description: "ANN search, HNSW, speed vs. recall tradeoffs, and operational considerations.",
    category: "ai",
    content: `## Vector Databases

A vector database is purpose-built to store embeddings alongside their source metadata (the original text, a document ID, a timestamp) and to answer one core question extremely fast: "which stored vectors are closest to this new vector?" Doing this exactly — comparing a query against every single stored vector — becomes too slow once you have millions of entries, so vector databases use **approximate nearest neighbor (ANN)** search algorithms, such as HNSW graphs or IVF clustering, that pre-organize the vector space into a structure you can traverse quickly. The result is approximate rather than mathematically perfect — you might occasionally miss the single best match — but it is fast enough to query in milliseconds even against huge collections, which is the entire point.

In a RAG system, the vector database is the retrieval backend: it is what the query embedding actually gets compared against. A few things matter when evaluating one:

- Most let you tune the tradeoff between speed and recall (the fraction of true nearest neighbors actually found).
- Most combine vector similarity with traditional metadata filters, so you can ask for "the closest matches, but only from documents tagged 'billing' and updated in the last month."
- Choosing one in practice is less about raw search algorithms and more about operational concerns: how it scales, how it handles updates and deletes, and how well it integrates with the rest of your data infrastructure.`,
  },
  {
    slug: "fine-tuning",
    title: "Fine-tuning",
    description: "When to fine-tune, LoRA, RLHF, and the prompting vs. fine-tuning decision.",
    category: "ai",
    content: `## Fine-tuning

Fine-tuning means continuing to train an already-trained model on a smaller, task-specific dataset so it shifts its behavior — tone, format, domain vocabulary — toward that data. It is frequently reached for when prompting alone would actually solve the problem more cheaply. The rule of thumb:

- Use **prompting or RAG** when the model needs new *knowledge* or needs to reference information that changes often, since fine-tuning bakes patterns into weights and is expensive to redo every time data changes.
- Reserve **fine-tuning** for cases where you need to change the model's *behavior* in a way prompting can't reach — a very specific output format used thousands of times a day, a tone or style that few-shot examples can't reliably reproduce, or compressing a capability into a much smaller, cheaper model.

Two techniques dominate fine-tuning in practice:

- **LoRA** (low-rank adaptation) is what made fine-tuning affordable for most teams: instead of updating all of a model's billions of parameters, it freezes the original weights and trains a small pair of additional low-rank matrices that get added on top, capturing the needed behavior change with a tiny fraction of the trainable parameters and memory.
- **RLHF** (reinforcement learning from human feedback) is used to align a base model with human preferences: people rank multiple model outputs from best to worst, that ranking data trains a separate "reward model" to predict which outputs humans prefer, and the base model is then further trained to maximize that reward — this is the process that turns a raw next-token predictor into a model that behaves like a helpful assistant.`,
  },
  {
    slug: "agents",
    title: "Agents",
    description: "The tool-calling loop, observe-think-act, and why agents behave differently from plain LLM calls.",
    category: "ai",
    content: `## Agents

An AI agent is an LLM wrapped in a loop that lets it take actions in the world, not just generate text. Instead of only replying with words, the model is given a list of available **tools** (also called functions) — a web search, a calculator, a database query, an internal API — with a description of what each one does and what inputs it needs. When the model decides a tool would help answer the current request, it outputs a structured request to call that tool instead of a plain-text answer; your application code actually executes the tool and returns the result back to the model.

This creates the core **reasoning loop** that defines an agent, which repeats until the model decides it has enough information to respond:

- **Observe** — the model reads the current state: the user's request plus any tool results so far.
- **Think** — it decides what to do next based on that state.
- **Act** — it either calls another tool or produces a final answer.

The critical shift from a plain LLM call is that the model itself decides which actions to take and in what order, based on intermediate results, rather than following a fixed script you wrote in advance — which is also why agents are harder to test and more prone to unexpected behavior than a single prompt-and-response call.`,
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    description: "Multi-step autonomy: planning, long-term memory, and self-correction.",
    category: "ai",
    content: `## Agentic AI

"Agentic AI" describes systems that push the agent loop further into genuine multi-step autonomy: instead of one tool call to answer one question, the system pursues a broader goal across many steps, potentially over minutes or hours, with limited human intervention along the way. Three capabilities make this possible:

- **Planning** — breaking a high-level goal like "research this topic and draft a report" into an ordered sequence of concrete subtasks, rather than reacting to a single prompt in isolation.
- **Memory** beyond what fits in one context window — short-term memory holds the current task's working state inside the active context, while long-term memory persists facts, past decisions, or learned preferences in an external store that gets pulled back in when relevant.
- **Self-correction** — the ability to notice that a step failed or produced a bad result, and to revise the plan or retry rather than barreling ahead with a broken intermediate output.

This combination of planning, memory, and self-correction is what separates a simple chatbot-with-tools from a system that can be trusted to carry out an open-ended, multi-step piece of work.`,
  },
  {
    slug: "multi-agent-systems",
    title: "Multi-Agent Systems",
    description: "Orchestrators, specialist agents, and communication patterns between agents.",
    category: "ai",
    content: `## Multi-Agent Systems

Rather than asking one general-purpose agent to do everything, a multi-agent system splits work across several specialized agents, each with a narrower role, its own prompt, and often its own toolset — a researcher agent that gathers information, a coder agent that writes implementation, a reviewer agent that checks the output. This mirrors how human teams divide labor: a specialist with a focused prompt and a small tool surface tends to perform more reliably than one generalist asked to juggle every responsibility at once.

An **orchestrator** is typically the agent (or plain code) responsible for deciding which specialist handles which part of a task and in what order, then assembling their outputs into a final result. Communication between agents generally follows a handful of patterns:

- **Sequential handoff** — one agent's output becomes the next agent's input, like an assembly line.
- **Parallel fan-out/fan-in** — the same task is split across multiple agents working simultaneously and their results are merged afterward.
- **Hierarchical delegation** — a manager agent breaks a goal into sub-goals and assigns each to a subordinate agent, possibly several layers deep.

Multi-agent designs add real complexity and cost — more model calls, more failure points, and message-passing overhead between agents — so they earn their keep on tasks genuinely too broad or too varied for one focused agent to handle well.`,
  },
  {
    slug: "memory-systems",
    title: "Memory Systems",
    description: "In-context, external, and episodic memory strategies for long-running AI systems.",
    category: "ai",
    content: `## Memory Systems

Memory is what lets an AI system operate across time and context boundaries. There are several distinct types, each suited to different needs:

- **In-context memory** — everything currently sitting in the active context window. It's fast and zero-setup, but it vanishes at the end of the call and is bounded by the token limit.
- **External memory (retrieval)** — facts stored outside the model in a database, retrieved and injected into the prompt when relevant. This is the basis of RAG. It scales to enormous amounts of data and persists across sessions, but retrieval quality gates the results.
- **Episodic memory** — a log of past interactions that can be summarized or retrieved selectively. Enables a system to "remember" what happened in previous sessions with a user or on a past task.
- **Semantic memory** — distilled facts, user preferences, or key decisions stored in structured form (e.g., a knowledge graph or a profile document) and retrieved when relevant.

The right architecture depends on what needs to persist, for how long, and at what granularity. Most production AI systems combine at least two: in-context memory for the immediate task, and retrieval from an external store for background knowledge or history.`,
  },
  {
    slug: "tool-use-function-calling",
    title: "Tool Use / Function Calling",
    description: "How models emit structured tool calls, how your code executes them, and design patterns.",
    category: "ai",
    content: `## Tool Use / Function Calling

Function calling is the mechanism by which an LLM outputs a structured request to invoke a tool rather than writing plain text. You describe available tools to the model in a schema (name, description, and parameter types), and the model can respond with a structured object — tool name plus arguments — instead of a prose answer. Your application catches this response, calls the real function with those arguments, and feeds the return value back into the conversation.

\`\`\`json
// Example tool call the model emits
{
  "tool": "get_weather",
  "arguments": {
    "location": "London",
    "unit": "celsius"
  }
}
\`\`\`

A few patterns worth knowing:

- **Parallel tool calls** — many modern APIs let the model request several tools in one turn; your code executes them concurrently and returns all results together, which is faster than a sequential back-and-forth.
- **Tool choice control** — you can force the model to always call a specific tool, never call tools at all, or let it decide (the default), giving you control over when structured outputs are required.
- **Schema quality matters** — clear descriptions and well-named parameters directly affect how reliably the model picks the right tool and fills in correct arguments.`,
  },
  {
    slug: "hallucinations",
    title: "Hallucinations",
    description: "Why LLMs confabulate, how to detect it, and mitigation strategies.",
    category: "ai",
    content: `## Hallucinations

A hallucination is when a language model states something false with apparent confidence. It is not lying — the model has no concept of truth or intent; it is pattern-matching over its training data and generating plausible-sounding tokens. When the correct answer is outside its training distribution, or when it has learned competing patterns, it produces a fluent, confident-sounding wrong answer.

Common categories:

- **Factual errors** — wrong dates, names, or statistics stated as fact.
- **Citation fabrication** — inventing plausible-sounding paper titles, URLs, or author names that don't exist.
- **Reasoning gaps** — logically invalid steps presented as valid.

Mitigation strategies:

- **RAG** — ground answers in retrieved source documents so the model writes from evidence rather than memory.
- **Constrained outputs** — ask the model to only answer from a provided context and explicitly say "I don't know" when it can't.
- **Self-consistency** — sample the model multiple times and check agreement; confident wrong answers tend to be less consistent than correct ones.
- **Verification layers** — use a second model or external lookup to fact-check high-stakes claims before surfacing them to users.

No mitigation eliminates hallucination entirely; the practical goal is reducing its frequency and catching it before it reaches users.`,
  },
  {
    slug: "evaluation-and-benchmarks",
    title: "Evaluation & Benchmarks",
    description: "How models are evaluated, what benchmarks measure, and how to evaluate your own AI product.",
    category: "ai",
    content: `## Evaluation & Benchmarks

Evaluating an AI system means measuring whether it does what you need it to do, which turns out to be harder than it sounds.

### Public benchmarks

Academic benchmarks like MMLU (knowledge), HumanEval (code), and HellaSwag (commonsense reasoning) measure specific capabilities on held-out test sets. They are useful for comparing base model capabilities across labs, but they do not tell you whether a model is right for your specific task.

### Task-specific evaluation

For a production system, you need eval sets that reflect your actual use case:

- **Exact match** works when outputs have a single right answer (e.g., classification labels, SQL).
- **LLM-as-judge** uses a stronger model to rate the quality of another model's outputs — useful for open-ended tasks like summarization or dialogue, but introduces the judge model's own biases.
- **Human evaluation** is the gold standard but expensive to run at scale.

### What to measure

- Accuracy on a held-out test set representative of real inputs
- Latency and token cost (correctness isn't free)
- Failure mode distribution — not just average performance but tail behavior
- Regression over time as models or prompts change

Evals are not a one-time setup; they are a continuous process that should run on every prompt change or model upgrade.`,
  },
  {
    slug: "safety-and-alignment",
    title: "Safety & Alignment",
    description: "What alignment means, RLHF, Constitutional AI, jailbreaks, and practical safety considerations.",
    category: "ai",
    content: `## Safety & Alignment

Alignment is the problem of making an AI system reliably pursue the goals its designers intend, rather than finding unexpected shortcuts or harmful paths to an objective. For language models specifically, alignment work focuses on making models helpful, honest, and harmless.

### How alignment is applied in practice

- **RLHF** (reinforcement learning from human feedback) trains a reward model on human preference rankings, then fine-tunes the base model to maximize that reward — the primary method used to turn a next-token predictor into a model that behaves like a helpful assistant.
- **Constitutional AI** (Anthropic's approach) supplements human feedback with a set of principles the model uses to self-critique and revise its outputs, reducing the human labeling burden.
- **System-prompt constraints** — developers layer their own safety rules on top of the model's base alignment via the system prompt (e.g., "do not discuss competitor products").

### Practical considerations for developers

- **Jailbreaks** are user inputs crafted to bypass safety training; no deployed model is immune. Defense layers include input filtering, output classifiers, and rate limiting.
- **Prompt injection** is an attack where malicious text in user input or retrieved content attempts to override system instructions; treat LLM inputs and tool results as untrusted data.
- **Over-refusal** is the other failure mode — an over-cautious model refusing benign requests, which degrades usefulness. Alignment is a balance, not a single dial.`,
  },
  {
    slug: "ai-developer-stack",
    title: "The AI Developer Stack",
    description: "A map of the tools, services, and layers that make up a modern AI-powered application.",
    category: "ai",
    content: `## The AI Developer Stack

A modern AI-powered application is built from a layered stack, each layer abstracting over the one below it.

### Foundation models

The base: a large pre-trained model (GPT-4, Claude, Gemini, Llama) accessed via API or self-hosted. This is where capability comes from.

### Orchestration & agent frameworks

Libraries like LangChain, LlamaIndex, or the Vercel AI SDK that handle prompt assembly, tool calling loops, streaming, and memory management so you don't wire these by hand.

### Retrieval layer

A vector database (Pinecone, Weaviate, pgvector, Qdrant) plus an embedding model, enabling semantic search and RAG.

### Observability

Tracing tools (LangSmith, Langfuse, Arize) that record every prompt, response, token count, and latency for debugging and eval.

### Guardrails

Input/output classifiers or libraries (Guardrails AI, Nemo Guardrails) that enforce safety rules, format constraints, or topic restrictions on top of the base model.

### Compute & deployment

Inference infrastructure: API providers (Anthropic, OpenAI, Google), managed inference platforms (Together, Fireworks, Replicate), or self-hosted GPU clusters for open-weight models.

### Evaluation layer

Frameworks for running your eval suite on every release: prompt regression tests, LLM-as-judge pipelines, and human review workflows.

Knowing where each piece lives helps you make deliberate build-vs-buy decisions and diagnose failures at the right layer when things go wrong.`,
  },
  {
    slug: "mcp",
    title: "Model Context Protocol (MCP)",
    description: "A standard protocol for connecting LLMs to external tools, data sources, and services.",
    category: "ai",
    content: `## Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open standard introduced by Anthropic in 2024 that defines a consistent way for LLM applications to connect to external tools, data sources, and services. Think of it as a USB-C port for AI: instead of every application building its own custom integration for every tool, MCP gives both sides a single contract to implement once.

### Why MCP exists

Before MCP, every AI assistant that wanted to query a database, call an API, or read a file had to build a bespoke integration. This created an M×N problem — M different host applications each needing N separate connectors. MCP collapses that to M+N: each host implements the client protocol once, and each data source implements the server protocol once.

### Architecture

MCP is a client-server protocol that runs over a local or remote transport (typically stdio or HTTP with Server-Sent Events):

- **Host** — the LLM application (Claude Desktop, an IDE extension, a custom agent) that initiates connections and controls the model.
- **MCP Client** — lives inside the host; manages one connection per MCP server and passes tool calls and results between the model and the server.
- **MCP Server** — a lightweight process that exposes capabilities: tools, resources, or prompts. A server can be a local script, a cloud function, or a long-running service.

### Three primitive types

MCP exposes three kinds of primitives:

- **Tools** (model-controlled) — functions the model can call: search the web, run a query, send an email. Defined as JSON schemas; the model decides when to invoke them.
- **Resources** (application-controlled) — static or dynamic content the host exposes to the model: files, database rows, API responses.
- **Prompts** (user-controlled) — pre-written templates invoked by name to guide the model toward a specific workflow.

### Tool definition example

A tool definition is a JSON schema the server sends at connection time. The model reads it, generates a structured call when relevant, and the MCP client routes that call to the server — no custom parsing on your side.

\`\`\`json
{
  "name": "search_docs",
  "description": "Search the documentation for a given query.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" }
    },
    "required": ["query"]
  }
}
\`\`\`

### Sampling and roots

Two additional features round out the protocol:

- **Sampling** — MCP servers can ask the host to run an LLM completion on their behalf, enabling recursive agent patterns where tools themselves can reason.
- **Roots** — servers advertise filesystem or URL roots they care about, so the host can scope resource access without granting blanket permissions.

### When to use MCP

MCP pays off at the boundary between independently developed systems. Use it when you are building a tool that multiple AI applications should consume, or when your application wants to use tools that already exist as MCP servers (databases, GitHub, Slack, browser automation). For a one-off integration inside a single codebase, a direct function call is simpler.`,
  },
];

export default notes;
