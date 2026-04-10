# Plan: ResearchSyndicate — 3-Agent Market Intelligence Crew

Deploy a collaborative 'syndicate' of agents to perform high-fidelity market research using CrewAI and a modern Angular frontend inspired by the "Neural Command Interface" UI.

## 1. Objective
Build a full-stack AI-powered market intelligence tool that:
- Uses a multi-agent system (CrewAI) to research, analyze, and write reports.
- Integrates SerpAPI for real-time web search and Anthropic Claude for advanced reasoning.
- Provides a high-fidelity, cyberpunk-themed Angular frontend for monitoring and interacting with the agents.
- Delivers a 5-section Market Intelligence Report in Markdown.

## 2. Architecture & Tech Stack
- **Backend (Python/FastAPI):**
    - **CrewAI:** Orchestrates agent roles, tasks, and memory.
    - **Google Gemini (flash/pro):** The reasoning engine (via Vertex AI or Gemini API).
    - **SerpAPI:** Tool for raw data gathering.
    - **FastAPI:** Provides REST and WebSocket endpoints for real-time log streaming.
- **Frontend (Angular 21/latest):**
    - **Standalone Components:** For modularity and efficiency.
    - **Signal-based State Management:** To handle real-time agent statuses and logs.
    - **SCSS/CSS Modules:** To implement the provided "Neural Command Interface" styles.
    - **Marked.js:** For rendering the final Markdown report.
- **Integration:**
    - **REST API:** To trigger a "Mission" (market research).
    - **WebSockets:** To stream real-time mission logs from the CrewAI agents to the UI.

## 3. Backend Implementation (CrewAI)
### Agent Definitions
1.  **Researcher (Violet Clearance):**
    - **Role:** Gather raw market data.
    - **Tools:** SerpAPI (Google Search), WebScraper.
    - **Output:** Raw intelligence package.
2.  **Analyst (Amber Clearance):**
    - **Role:** Process raw data for market gaps, competitor weaknesses, and SWOT.
    - **Output:** Strategic assessment file.
3.  **Writer (Green Clearance):**
    - **Role:** Synthesize findings into a polished 5-section executive report.
    - **Output:** Markdown-formatted report.

### Task Workflow
- **Task 1:** Researcher performs deep-dive on [Topic].
- **Task 2:** Analyst reviews Researcher's output and performs SWOT.
- **Task 3:** Writer compiles final report based on Analyst's insights.

## 4. Frontend Implementation (Angular 19)
### Component Tree
- `ShellComponent` (Main Layout)
    - `HeaderComponent` (Logo, Status, Clock)
    - `TopologyStripComponent` (Visualizing Agent Handoffs)
    - `ArenaComponent` (Grid layout for Agent Cards)
        - `AgentCardComponent` (Visualizes Agent state, logs, and progress)
        - `PipelineComponent` (Animated data flow between agents)
    - `CommandBarComponent` (Mission input & Deploy button)
    - `ReportOverlayComponent` (Markdown report display)

### UI/UX Styling (from `index.html`)
- **Theme:** Cyberpunk dark mode (`--void` background).
- **Accents:** Neon Violet (Researcher), Amber (Analyst), Green (Writer).
- **Animations:** 
    - Hexagonal grid background.
    - Orbital rings for active agents.
    - Pulsating "Neural Activity" bars.
    - Particle flow effects for data transfer.

## 5. Integration: Real-time Monitoring
- Implement a custom `CrewAI` callback handler that emits logs via FastAPI WebSockets.
- Angular frontend subscribes to the WebSocket and updates the `AgentCard` logs and `TopologyStrip` in real-time.

## 6. Implementation Phases
### Phase 1: Backend Scaffolding
- Set up FastAPI project structure.
- Define Pydantic models for Mission requests and responses.
- Implement CrewAI agents and tasks.
- Integrate SerpAPI and Claude.

### Phase 2: Frontend Foundation
- Scaffold Angular project (`ng new research-syndicate`).
- Port CSS variables and global styles from `index.html`.
- Build the `Shell` and `CommandBar` components.

### Phase 3: Agent Components & UI/UX
- Build the `AgentCard` and `TopologyStrip`.
- Implement animations (CSS keyframes and Angular animations).
- Integrate `marked.js` for report rendering.

### Phase 4: Real-time Integration
- Implement WebSockets in FastAPI.
- Implement a WebSocket service in Angular.
- Wire up the "Mission Log" streaming.

## 7. Verification & Testing
- **Agent Validation:** Test individual agents with mock data.
- **End-to-End Test:** Trigger a mission for "EV Battery Market" and verify the 5-section report.
- **UI Responsiveness:** Ensure the cyberpunk layout holds up on different screen sizes.
- **API Resilience:** Handle SerpAPI/Claude rate limits with retries.
