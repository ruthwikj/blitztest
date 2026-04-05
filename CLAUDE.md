AI-powered A/B testing tool that deploys browser agents simulating real customer personas to crawl ecommerce sites and surface what to test before going live.
What this does

User enters an ecom URL
Multiple Browser Use agents (one per persona) browse the site like real customers
Each agent navigates, clicks, and reports friction points and drop-off reasons
Claude synthesizes findings into ranked A/B test recommendations

Stack

Backend: Python + FastAPI + Browser Use + Anthropic SDK
Frontend: React (no UI libraries, plain CSS-in-JS)
AI: Claude claude-sonnet-4-20250514 via Anthropic API
Browser automation: Browser Use (wraps Playwright + Claude agent loop)

Project structure
testsim/
  backend/        # Python FastAPI server
    main.py       # API routes + SSE streaming
    personas.py   # Persona definitions + distribution weights
    agent.py      # Browser Use agent runner per persona
  frontend/
    src/
      App.js      # Main UI - URL input, live activity feed, results
      index.js    # Entry point
    public/
      index.html
  CLAUDE.md
  README.md
Key concepts
Personas
Defined in backend/personas.py. Each persona has:

id, name, initials, description — display info
weight — frequency in the distribution (must sum to 1.0)
system_prompt — full character description sent as system prompt to Claude inside Browser Use agent

Personas are sampled by weight when running simulations. Do not hardcode persona selection — always sample from the distribution.
Browser Use agents
We use Browser Use to run the web agents. Each persona runs as an independent Browser Use Agent instance with its own Chrome session:
pythonfrom browser_use import Agent
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-4-20250514")
agent = Agent(task=persona_task, llm=llm, headless=True)
result = await agent.run()

Agents run up to 3 in parallel using asyncio.gather()
Use headless=True for demo
Each agent gets a task string that includes the persona system prompt + the target URL + instructions to report journey, friction points, and conversion
After each run, extract journey steps, converted bool, friction_points, drop_off_reason, and ab_test_suggestion from the agent's result history

Streaming
Backend streams results via SSE (Server-Sent Events). Frontend consumes the stream and updates UI live. Event types: status | scraped | persona_start | persona_done | complete | error
Commands
bash# backend
cd backend && pip install -r requirements.txt
ANTHROPIC_API_KEY=your_key uvicorn main:app --reload --port 3001

# frontend
cd frontend && npm install && npm start
Environment

ANTHROPIC_API_KEY required in backend environment
Frontend proxies /simulate and /health to localhost:3001

Important notes

Never hardcode API keys
Browser Use agents need a real display or headless mode — use headless=True for demo
Keep persona system prompts concise — they go into every Browser Use agent call
The frontend activity feed animates in real time as SSE events arrive — don't batch events