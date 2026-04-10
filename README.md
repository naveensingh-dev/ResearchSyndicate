# ◈ ResearchSyndicate — Neural Command Interface

[![Framework: CrewAI](https://img.shields.io/badge/Framework-CrewAI-v0.100?style=flat-square&color=6d28d9)](https://crewai.com)
[![Engine: Gemini 1.5 Flash](https://img.shields.io/badge/Engine-Gemini_1.5_Flash-blue?style=flat-square&color=0e7490)](https://deepmind.google/technologies/gemini/)
[![UI: Angular 20](https://img.shields.io/badge/UI-Angular_20-red?style=flat-square&color=dd0031)](https://angular.dev)

> **Deploy a collaborative syndicate of autonomous agents to perform high-fidelity market intelligence gathering, strategic SWOT analysis, and executive brief synthesis in real-time.**

---

## ⚡ The Syndicate Architecture

ResearchSyndicate is a full-stack AI-powered command center. It orchestrates a "Crew" of specialized agents who communicate via a high-performance WebSocket grid to provide a live, immersive monitoring experience.

### 🤖 Operative Profiles
1.  **Researcher (Violet Clearance):** Elite intelligence gatherer. Uses SerpAPI to sweep the live web for market trends, competitor footprints, and raw data packages.
2.  **Analyst (Amber Clearance):** Strategic processing unit. Transforms raw data into actionable intelligence, identifying market gaps and constructing comprehensive SWOT matrices.
3.  **Writer (Green Clearance):** Executive narrative engine. Synthesizes complex strategic insights into a polished, 5-section Markdown report ready for C-suite consumption.

---

## 🛠 Tech Stack

### Backend (Neural Grid)
- **CrewAI:** Orchestrates agent roles, tasks, and multi-agent memory.
- **FastAPI:** High-performance asynchronous bridge for REST and WebSockets.
- **Google Gemini 1.5 Flash:** The underlying reasoning engine for high-speed, low-latency intelligence.
- **LangChain:** Direct Google GenAI integration with `transport="rest"` for maximum reliability.

### Frontend (Command Interface)
- **Angular 20:** Modern standalone architecture with Signal-based state management.
- **RxJS WebSockets:** Real-time stream synchronization for agent logs and status updates.
- **Neural UI/UX:** Cyberpunk-themed interface with orbital animations, data flow pipes, and pulsating neural activity monitors.

---

## 🚀 Deployment Protocol

### 1. Backend Initialization
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
GOOGLE_API_KEY=your_gemini_key
SERPAPI_API_KEY=your_serpapi_key
```

### 3. Frontend Initialization
```bash
cd frontend
npm install
```

### 4. System Launch
**Terminal 1 (Backend):**
```bash
python3 main.py
```

**Terminal 2 (Frontend):**
```bash
npm start
```

---

## 📡 Core Communication Flow

The system uses a **Socket-First** deployment strategy:
1.  **Neural Uplink:** Frontend initiates a WebSocket handshake with the `ConnectionManager`.
2.  **Command Injection:** The mission topic is sent as a `DEPLOY_MISSION` command over the socket.
3.  **Real-time Streaming:** CrewAI's `step_callback` and `task_callback` intercept agent thoughts and dispatch them immediately to the UI.
4.  **Intelligence Sync:** The final 5-section Markdown report is broadcasted upon mission completion.

---

## 🛡 Security & Safety
- **Clearance Protocols:** Each agent operates within its defined clearance (Violet, Amber, Green).
- **Environment Isolation:** Keys are strictly managed via `.env` and never exposed to the client-side.

---

<div align="center">
  <p><i>Proprietary Intelligence Grid // ResearchSyndicate v1.0.0</i></p>
</div>
