export const portfolioData = {
  developer: {
    name: "Utkarsh Kushwaha",
    initials: "UK",
    role: "Gen AI & Full-Stack Consultant",
    company: "Deloitte USI",
    location: "Gurugram, Haryana, India",
    coordinates: "28.4595° N, 77.0266° E",
    status: "AVAILABLE FOR CONSULTING & MISSIONS",
    tagline: "Building intelligent digital experiences at the intersection of engineering, AI and interaction.",
    headline: "React • Python • FastAPI • AWS • Agentic AI",
    manifesto: "I BUILD DIGITAL EXPERIENCES WHERE ENGINEERING MEETS INTELLIGENCE.",
    bioEditorial: "I engineer intelligent, high-impact software solutions that bridge scalable full-stack web architecture with autonomous Agentic AI systems. Working with cross-functional teams at Deloitte USI, I build enterprise cloud applications, Gen AI retrieval pipelines, and high-frequency backend services that solve complex business challenges.",
    bioSecondary: "With a strong computer science foundation in Data Structures, Algorithms, and Software Engineering from Meerut Institute of Technology (2023), my engineering discipline focuses on clean code, optimal computational complexity, responsive frontend performance, and resilient microservice architectures.",
    education: {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Meerut Institute of Technology",
      year: "2023",
      focus: "Data Structures, Algorithms, Software Engineering, Database Systems, Web Technologies"
    },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "utkarsh.kushwaha.dev@gmail.com",
    }
  },

  philosophy: [
    {
      number: "01",
      title: "Algorithmic Rigor & Clean Code",
      description: "Strong computer science fundamentals in Data Structures and Algorithms ensure every system is architected for low computational complexity, zero memory bloat, and long-term enterprise maintainability."
    },
    {
      number: "02",
      title: "Autonomous Agentic Architecture",
      description: "Moving beyond basic LLM prompts into structured Agentic AI workflows with multi-agent orchestration, function routing, deterministic tool calling, and human-in-the-loop safety boundaries."
    },
    {
      number: "03",
      title: "Kinetic UI & 60 FPS Performance",
      description: "Bridging the visual depth of creative technology with high-speed rendering pipelines. Interfaces must feel immediate, tactile, responsive, and seamless across every viewport."
    }
  ],

  technologyHub: [
    { name: "React.js", category: "Frontend", level: "Expert", desc: "Component design systems, custom hooks, complex state flow, SPA performance." },
    { name: "Next.js", category: "Frontend", level: "Advanced", desc: "Server-side rendering, App Router, hybrid static/dynamic generation, SEO." },
    { name: "Python", category: "Backend", level: "Expert", desc: "Asynchronous backend engineering, data pipelines, algorithmic scripting." },
    { name: "FastAPI", category: "Backend", level: "Expert", desc: "High-throughput asynchronous REST APIs, Pydantic validation, OpenAPI specs." },
    { name: "AWS Cloud", category: "Cloud", level: "Advanced", desc: "Lambda serverless, ECS containers, S3 storage, API Gateway, CloudWatch." },
    { name: "Agentic AI", category: "AI", level: "Advanced", desc: "Autonomous agent workflows, LangChain, tool calling, multi-agent routing." },
    { name: "Generative AI", category: "AI", level: "Advanced", desc: "RAG retrieval pipelines, vector embeddings, prompt engineering, streaming." },
    { name: "TypeScript", category: "Frontend", level: "Advanced", desc: "Static type systems, interface design, robust refactoring safety." },
    { name: "Node.js", category: "Backend", level: "Advanced", desc: "Event-driven runtime, Express microservices, backend integration." },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert", desc: "Utility-first design systems, responsive layouts, zero-runtime CSS." },
    { name: "GSAP Motion", category: "Creative", level: "Mastery", desc: "ScrollTrigger choreography, timeline sequences, kinetic micro-interactions." },
    { name: "Three.js / WebGL", category: "Creative", level: "Advanced", desc: "3D scene graphs, particle clouds, custom shaders, camera rigs." },
    { name: "Data Structures", category: "Core CS", level: "Expert", desc: "Trees, graphs, dynamic programming, algorithmic optimization." },
    { name: "Software Engineering", category: "Core CS", level: "Expert", desc: "Design patterns, clean architecture, SOLID principles, modularity." }
  ],

  projects: [
    {
      id: "project-01",
      number: "01",
      systemId: "SYS-ORCHESTRATOR-v2",
      title: "Agentic AI Workflow Orchestrator",
      category: "Agentic AI / Full-Stack",
      tagline: "Autonomous Multi-Agent Task Routing & Tool Calling Engine",
      description: "An enterprise-grade agentic orchestration platform coordinating autonomous LLM agents for complex multi-step data verification, synthesis, and code execution workflows with real-time telemetry and deterministic safety controls.",
      tech: ["Python", "FastAPI", "React.js", "Agentic AI", "AWS ECS", "LangChain"],
      year: "2025",
      metrics: "Sub-50ms Routing • 99.4% Tool Accuracy • Full Observability",
      architecture: {
        layer1: "Client UI Layer (React.js + WebSocket Telemetry Stream)",
        layer2: "FastAPI Async Gateway (JWT Auth + Pydantic Type Contracts)",
        layer3: "Agentic Reasoning Core (LangChain Multi-Agent Router + Tool Calling)",
        layer4: "Distributed Execution Sandbox (AWS ECS Container Tasks)"
      },
      liveUrl: "#",
      githubUrl: "https://github.com",
    },
    {
      id: "project-02",
      number: "02",
      systemId: "SYS-RAG-ENGINE-v3",
      title: "Enterprise Gen AI Knowledge Hub",
      category: "Generative AI / RAG",
      tagline: "High-Accuracy Retrieval Augmented Generation Engine",
      description: "A semantic search and document intelligence engine built with RAG architecture, vector embeddings, and streaming responses, enabling instant cross-document query synthesis with source citation verification.",
      tech: ["Python", "FastAPI", "Next.js", "Vector DB", "AWS Lambda", "OpenAI"],
      year: "2024",
      metrics: "1M+ Tokens/Min • Hybrid BM25/Vector Search • Citation Provenance",
      architecture: {
        layer1: "Next.js App Router Frontend (Streaming Server Components)",
        layer2: "FastAPI Ingestion & Chunking Pipeline (Hierarchical Markdown Splitter)",
        layer3: "Dense Vector Embedding Index (Milvus / Pinecone HNSW Vector Space)",
        layer4: "Context Re-Ranking Engine (Cross-Encoder Synthesizer)"
      },
      liveUrl: "#",
      githubUrl: "https://github.com",
    },
    {
      id: "project-03",
      number: "03",
      systemId: "SYS-TELEMETRY-v1",
      title: "Full-Stack Cloud Telemetry Console",
      category: "Full-Stack / Cloud",
      tagline: "Real-Time Microservices Monitoring & Analytics Dashboard",
      description: "A high-performance monitoring interface connecting to distributed backend microservices, providing real-time telemetry metrics, automated threshold alerts, and asynchronous API orchestration.",
      tech: ["React.js", "Tailwind CSS", "Python", "FastAPI", "AWS CloudWatch", "WebSockets"],
      year: "2024",
      metrics: "60 FPS Visualizer • <12ms Socket Latency • Zero Frame Drop",
      architecture: {
        layer1: "React.js Dynamic Canvas Grid (RequestAnimationFrame 60 FPS Charts)",
        layer2: "FastAPI WebSocket Broadcast Server (Redis Pub/Sub Backbone)",
        layer3: "AWS CloudWatch Ingestion Bridge (Asynchronous Metric Aggregation)",
        layer4: "Automated Incident Dispatcher (Webhook & Pager Routing)"
      },
      liveUrl: "#",
      githubUrl: "https://github.com",
    },
    {
      id: "project-04",
      number: "04",
      systemId: "SYS-GATEWAY-v4",
      title: "Intelligent Microservices Gateway",
      category: "Backend / Cloud Architecture",
      tagline: "Scalable API Gateway & Middleware Framework",
      description: "A resilient backend gateway engineered with FastAPI and AWS infrastructure, handling JWT authentication, token-bucket rate limiting, request validation with Pydantic, and asynchronous service discovery.",
      tech: ["Python", "FastAPI", "Node.js", "AWS Lambda", "Docker", "Redis"],
      year: "2023",
      metrics: "10k+ Req/Sec • P99 < 8ms • Automated Failover",
      architecture: {
        layer1: "Edge Load Balancer & TLS Terminator (AWS ALB / CloudFront)",
        layer2: "FastAPI Token Bucket Rate Limiter (Distributed Redis Tokens)",
        layer3: "Pydantic Schema Validation & Sanitization Engine",
        layer4: "Downstream Async Microservice Router (HTTP/2 Connection Pooling)"
      },
      liveUrl: "#",
      githubUrl: "https://github.com",
    }
  ],

  articles: [
    {
      id: "article-01",
      number: "01",
      category: "AGENTIC AI",
      title: "Architecting Multi-Agent Autonomous Workflows with FastAPI & Python",
      subtitle: "Designing resilient state graphs, deterministic function execution boundaries, and asynchronous verification loops.",
      description: "How to structure autonomous agent routing, deterministic tool verification, and asynchronous task execution in enterprise environments without non-deterministic failure loops.",
      date: "FEB 2026",
      readTime: "08 MIN READ",
      author: "Utkarsh Kushwaha · Deloitte USI",
      tags: ["Python", "FastAPI", "Agentic AI", "LangGraph", "Architecture"],
      summary: "Single-prompt LLM applications crumble when confronted with multi-step enterprise workflows. This technical blueprint breaks down how we construct state-machine-driven multi-agent networks in Python with FastAPI orchestration, strict Pydantic schemas, and sandboxed tool execution.",
      sections: [
        {
          heading: "1. The Single-Agent Ceiling: Why Prompts Fail at Scale",
          body: "When an LLM is tasked with reasoning, database query generation, data analysis, and formatted output generation in a single monolithic prompt, context degradation and hallucination rates compound exponentially. In enterprise client environments at Deloitte USI, our benchmark evaluations showed that complex workflow accuracy dropped from 94% on single-hop tasks to under 48% on 5-step chained tasks.\n\nThe solution is decomposition: transforming monolithic prompts into specialized, stateful agent nodes governed by a deterministic router.",
          callout: "Key Rule: Never let the reasoning agent directly execute code in production. Segregate the reasoning brain from the deterministic execution runtime."
        },
        {
          heading: "2. Stateful Multi-Agent Architecture",
          body: "Our architecture relies on an asynchronous state graph where each agent node receives a typed snapshot of the workspace state, processes its designated domain task, and emits a structured state delta:\n\n• Supervisor / Router Agent: Evaluates input intent, delegates to specialized agents, and monitors completion criteria.\n• Retrieval & Research Agent: Queries vector stores and enterprise SQL databases via strict parameterized tool definitions.\n• Code Execution Agent: Dispatches sandbox container jobs on AWS ECS with deterministic timeout constraints.\n• Verification & Quality Critic Agent: Asserts schema compliance, cross-checks arithmetic, and verifies factual provenance.",
          code: `# FastAPI Asynchronous Multi-Agent Execution Node
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import asyncio

class AgentState(BaseModel):
    task_id: str
    iteration: int = 0
    current_agent: str = "supervisor"
    workspace_context: Dict[str, Any] = Field(default_factory=dict)
    execution_history: List[Dict[str, str]] = Field(default_factory=list)
    is_complete: bool = False

@app.post("/api/v1/agents/execute", response_model=AgentState)
async def dispatch_agent_workflow(payload: WorkflowRequest, background_tasks: BackgroundTasks):
    state = AgentState(task_id=payload.task_id)
    # Stream state updates via Redis Pub/Sub to active WebSockets
    background_tasks.add_task(orchestrate_agent_graph, state, payload.instructions)
    return state`
        },
        {
          heading: "3. Eliminating Non-Deterministic Failure Loops",
          body: "To prevent agents from getting caught in infinite refinement loops or calling invalid tool parameters, we implement strict guardrails:\n\n1. Hard Iteration Caps: Any graph cycle exceeding 6 state transitions automatically pauses and triggers a human-in-the-loop escalation webhook.\n2. Pydantic Runtime Contracts: Tool inputs are strictly validated against OpenAPI schemas. Schema mismatches are returned directly to the agent as self-correction feedback before execution.",
          callout: "Telemetry Impact: Implementing Pydantic validation reduced tool execution error rates by 91.2% across enterprise test runs."
        }
      ],
      takeaways: [
        "Decompose monolithic prompts into single-responsibility agent nodes.",
        "Use typed state graphs (Pydantic + Redis) rather than unstructured string buffers.",
        "Enforce strict deterministic verification boundaries between LLM thoughts and cloud execution."
      ]
    },
    {
      id: "article-02",
      number: "02",
      category: "GEN AI / RAG",
      title: "Enterprise RAG: Vector Search Optimization & Streaming Latency",
      subtitle: "Maximizing retrieval precision with hybrid BM25/Dense search, cross-encoder re-ranking, and low-latency token streaming.",
      description: "Techniques for optimizing dense vector retrieval, hybrid BM25 re-ranking, and low-latency token streaming across distributed cloud endpoints.",
      date: "DEC 2025",
      readTime: "06 MIN READ",
      author: "Utkarsh Kushwaha · Deloitte USI",
      tags: ["RAG", "Vector DB", "FastAPI", "BM25", "Streaming"],
      summary: "Standard vector retrieval often retrieves semantically similar but factually irrelevant text chunks. This guide explains how to engineer a production-ready Hybrid RAG pipeline combining sparse keyword indexing, dense embeddings, cross-encoder re-ranking, and sub-100ms streaming responses.",
      sections: [
        {
          heading: "1. The Limitation of Pure Vector Search",
          body: "Dense embeddings (e.g. text-embedding-3-large) excel at capturing high-level semantic meaning, but they consistently fail on exact alphanumeric queries like part numbers, error codes, legal clauses, or proper names. \n\nFor enterprise knowledge retrieval, relying solely on cosine distance in vector space results in precision drops on technical documentation.",
          callout: "The Hybrid Equation: Reciprocal Rank Fusion (RRF) combining Sparse BM25 + Dense HNSW embeddings yields up to a 34% increase in Mean Reciprocal Rank (MRR)."
        },
        {
          heading: "2. Implementing Reciprocal Rank Fusion & Cross-Encoder Re-Ranking",
          body: "Our multi-stage retrieval pipeline runs as follows:\n\n1. Dual Ingestion: Documents are split using hierarchical markdown chunking, generating both dense vector representations in Milvus/Pinecone and sparse token frequencies in OpenSearch.\n2. Parallel Query Retrieval: Top 50 chunks are retrieved concurrently from both sparse and dense indexes.\n3. RRF Combination: Results are fused using RRF scoring (k=60).\n4. Cross-Encoder Pass: The top 20 candidates pass through a lightweight BGE-Reranker model to calculate true query-passage relevance scores, filtering out irrelevant noise before prompt assembly.",
          code: `# Hybrid RAG Streamer with Async FastAPI & Server-Sent Events
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

async def stream_rag_tokens(query: str, session_id: str):
    # Stage 1: Parallel Dense + Sparse Retrieval (approx 35ms)
    dense_task = query_dense_vector_index(query, top_k=25)
    sparse_task = query_sparse_bm25_index(query, top_k=25)
    dense_results, sparse_results = await asyncio.gather(dense_task, sparse_task)
    
    # Stage 2: Cross-Encoder Re-ranking (approx 45ms)
    fused_candidates = reciprocal_rank_fusion(dense_results, sparse_results)
    ranked_chunks = await rerank_cross_encoder(query, fused_candidates[:15])
    
    # Stage 3: Low-Latency Streaming LLM Token Generation
    async for token in generate_llm_stream(query, ranked_chunks[:5]):
        yield f"data: {token}\\n\\n"`
        },
        {
          heading: "3. Citation Provenance & Hallucination Elimination",
          body: "Every streamed token is grounded in citation metadata. By injecting chunk IDs and page anchors into the system context, the frontend UI highlights the exact source document snippet in real-time as the response renders.",
          callout: "Benchmark: P95 First-Token Latency dropped from 2.4s to 420ms using streaming Server-Sent Events with persistent HTTP/2 connection pooling."
        }
      ],
      takeaways: [
        "Always combine Dense Vector Embeddings with Sparse BM25 via Reciprocal Rank Fusion.",
        "Introduce a Cross-Encoder Re-ranker to eliminate noisy context before LLM injection.",
        "Stream tokens via WebSockets or SSE for immediate First Contentful Paint perception."
      ]
    },
    {
      id: "article-03",
      number: "03",
      category: "FRONTEND",
      title: "State Management & Server Components in Enterprise Next.js",
      subtitle: "Balancing React Server Components, localized client islands, and server mutations for lightning-fast First Contentful Paint.",
      description: "Deep dive into combining React Server Components, server actions, and localized client state for ultra-fast First Contentful Paint and seamless UX.",
      date: "OCT 2025",
      readTime: "05 MIN READ",
      author: "Utkarsh Kushwaha · Deloitte USI",
      tags: ["React.js", "Next.js", "Server Components", "State Architecture"],
      summary: "Modern React architecture requires understanding where compute happens. By pushing heavy data fetching and serialization to React Server Components and isolating interactivity to lightweight client boundary nodes, we achieve sub-second FCP even on data-intensive enterprise portals.",
      sections: [
        {
          heading: "1. The Server/Client Boundary Principle",
          body: "In standard legacy SPAs, megabytes of JavaScript bundle code are shipped to the client just to render static layouts and fetch JSON payloads over REST waterfalls.\n\nWith Next.js App Router and React Server Components (RSC), zero bytes of server component code are shipped to the client bundle. The server streams pre-rendered HTML and the virtual DOM wire format directly to the browser.",
          callout: "Architectural Rule: Make components Server Components by default. Add 'use client' only to the smallest leaf components that require event listeners, state hooks, or browser APIs."
        },
        {
          heading: "2. Optimistic UI Updates & Server Actions",
          body: "When performing mutations, waiting for full round-trip network latency degrades the user experience. By pairing React's `useOptimistic` hook with asynchronous Server Actions, the UI reflects immediate state transitions while background validation runs.",
          code: `// Next.js Server Action with Optimistic Client Updates
'use client';
import { useOptimistic, useTransition } from 'react';
import { updateTaskStatusAction } from '@/actions/tasks';

export function TaskRow({ task }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    task.status,
    (state, newStatus) => newStatus
  );

  const handleToggle = async () => {
    const nextStatus = optimisticStatus === 'done' ? 'pending' : 'done';
    startTransition(async () => {
      setOptimisticStatus(nextStatus);
      await updateTaskStatusAction(task.id, nextStatus);
    });
  };

  return (
    <button onClick={handleToggle} className="flex items-center gap-2">
      <span className={optimisticStatus === 'done' ? 'line-through opacity-50' : ''}>
        {task.title}
      </span>
    </button>
  );
}`
        }
      ],
      takeaways: [
        "Keep client bundles lean by keeping heavy parsing & API orchestration inside Server Components.",
        "Use Server Actions for type-safe backend mutations with automatic cache revalidation.",
        "Implement useOptimistic for 0ms perceptual latency on interactive controls."
      ]
    },
    {
      id: "article-04",
      number: "04",
      category: "CLOUD & BACKEND",
      title: "Microservices API Gateway Routing with AWS Lambda & Docker",
      subtitle: "Engineering high-throughput, zero-trust gateways with token-bucket rate limiters and sub-8ms P99 latency.",
      description: "Designing zero-trust JWT authentication middleware, token bucket rate limiting, and containerized microservice routing with FastAPI.",
      date: "JUN 2025",
      readTime: "07 MIN READ",
      author: "Utkarsh Kushwaha · Deloitte USI",
      tags: ["AWS", "Docker", "FastAPI", "Microservices", "Redis"],
      summary: "When managing dozens of microservices, edge routing, authentication, and traffic policing must operate with extreme efficiency. Here is how we engineered an asynchronous Python/FastAPI gateway capable of processing 10,000+ requests/sec with P99 latency under 8ms.",
      sections: [
        {
          heading: "1. Zero-Trust Edge Authentication Middleware",
          body: "Every incoming HTTP request must be authenticated and authorized at the edge gateway before routing downstream to private ECS cluster services. Using asymmetric RS256 JWT validation with in-memory public key caching, cryptographic verification takes less than 0.8ms.",
          callout: "Security Design: Downstream services in the private VPC trust gateway headers signed with an internal HMAC secret, eliminating redundant database auth lookups across microservices."
        },
        {
          heading: "2. Distributed Token Bucket Rate Limiting with Redis",
          body: "To prevent denial-of-service and rogue client scraping, we implement atomic Lua scripts in Redis to execute token-bucket policing without race conditions under concurrency.",
          code: `# High-Throughput Token Bucket Lua Script via Redis & FastAPI
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local current_time = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'last_updated')
local tokens = tonumber(data[1]) or capacity
local last_updated = tonumber(data[2]) or current_time

-- Refill tokens based on elapsed time
local delta = math.max(0, current_time - last_updated)
tokens = math.min(capacity, tokens + delta * refill_rate)

if tokens >= requested then
    tokens = tokens - requested
    redis.call('HMSET', key, 'tokens', tokens, 'last_updated', current_time)
    redis.call('EXPIRE', key, 3600)
    return 1 -- Allowed
else
    return 0 -- Rate Limited
end`
        }
      ],
      takeaways: [
        "Verify JWTs at the edge with cached public keys to keep downstream services lean.",
        "Use Redis Lua scripts for race-condition-free distributed rate limiting.",
        "Utilize HTTP/2 connection pooling between the gateway and internal microservices."
      ]
    },
    {
      id: "article-05",
      number: "05",
      category: "CREATIVE ENGINEERING",
      title: "60 FPS WebGL & GSAP Animation Pipelines for Production",
      subtitle: "Preventing layout thrashing, coordinating smooth RAF tickers, and offloading compute to GPU shaders.",
      description: "Managing requestAnimationFrame cycles, offloading buffer geometry computations to WebGL, and avoiding layout thrashing in modern interactive web experiences.",
      date: "MAR 2025",
      readTime: "09 MIN READ",
      author: "Utkarsh Kushwaha · Deloitte USI",
      tags: ["Three.js", "WebGL", "GSAP", "Performance", "60 FPS"],
      summary: "Kinetic web experiences often suffer from jank, frame drops, and battery drain when animations trigger browser style recalculations and layout thrashing. This article details the production animation architecture behind high-performance 60 FPS web applications.",
      sections: [
        {
          heading: "1. The Single Ticker Synchronization Rule",
          body: "Running multiple uncoordinated `requestAnimationFrame` loops (e.g. Lenis smooth scroll, Three.js render loop, and GSAP timeline ticker) causes CPU thread contention and micro-stutter.\n\nIn our setup, we route all frame execution through GSAP's centralized ticker, ensuring that smooth scroll position, camera projection, and DOM transforms update in a single unified frame cycle.",
          callout: "Key Practice: Use 'gsap.ticker.add((time) => lenis.raf(time * 1000))' and 'gsap.ticker.lagSmoothing(0)' to guarantee synchronized rendering."
        },
        {
          heading: "2. Eliminating Forced Synchronous Layouts",
          body: "Never read layout properties (like `getBoundingClientRect()`, `offsetHeight`, `scrollTop`) immediately after writing styles. We batch all geometry calculations during initial setup or inside passive resize debouncers, updating only hardware-accelerated CSS properties (`transform: translate3d`, `opacity`, `filter`).",
          code: `# Unified GSAP & WebGL Render Pipeline
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function initializeKineticPipeline(renderer, scene, camera) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Direct Lenis to update ScrollTrigger on every tick
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Single unified render ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
    renderer.render(scene, camera);
  });

  gsap.ticker.lagSmoothing(0);
  return lenis;
}`
        }
      ],
      takeaways: [
        "Centralize all animation, smooth scroll, and WebGL loops under a single GSAP ticker.",
        "Animate only transform and opacity to keep computations on the GPU compositor layer.",
        "Dispose of Three.js geometries, materials, and textures when unmounting to eliminate memory leaks."
      ]
    }
  ],

  experience: [
    {
      period: "2023 — PRESENT",
      role: "Gen AI & Full-Stack Consultant",
      company: "Deloitte USI",
      location: "Gurugram, Haryana, India",
      description: "Collaborating with cross-functional teams to architect and deploy intelligent full-stack software solutions. Developing robust web applications using React.js and Next.js, building scalable backend services with Python and FastAPI, and implementing Generative AI & Agentic AI workflows deployed on AWS cloud infrastructure.",
      technologies: ["React.js", "Next.js", "Python", "FastAPI", "Generative AI", "Agentic AI", "AWS"]
    },
    {
      period: "2019 — 2023",
      role: "Bachelor of Technology — Computer Science & Engineering",
      company: "Meerut Institute of Technology",
      location: "Meerut, Uttar Pradesh, India",
      description: "Graduated with a comprehensive computer science curriculum emphasizing Data Structures, Algorithms, Software Engineering, Object-Oriented Programming, Database Management Systems, and Web Technologies. Built foundational full-stack web and backend projects.",
      technologies: ["Data Structures", "Algorithms", "Software Engineering", "Python", "JavaScript", "SQL"]
    }
  ]
};
