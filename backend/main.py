import json
import asyncio
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import MissionRequest, AgentLog
from crew import ResearchCrew
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"WS: Neural link established. Active: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"WS: Neural link severed. Active: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        if not self.active_connections:
            return
        msg_str = json.dumps(message)
        for connection in self.active_connections:
            try:
                await connection.send_text(msg_str)
            except:
                pass

manager = ConnectionManager()

async def execute_mission_logic(topic: str):
    loop = asyncio.get_running_loop()
    
    async def log_callback(step_output, status="active"):
        log_msg = str(step_output)
        agent_name = "Researcher"
        if "Analyst" in log_msg or "Strategic Analyst" in log_msg:
            agent_name = "Analyst"
        elif "Writer" in log_msg or "Executive Brief Writer" in log_msg:
            agent_name = "Writer"
        
        await manager.broadcast({
            "agent": agent_name,
            "log": log_msg[:300],
            "status": status,
            "progress": 100 if status == "done" else 50
        })

    # Immediate acknowledgement
    await manager.broadcast({
        "agent": "Researcher",
        "log": f"MISSION START: {topic}. Synchronizing neural nodes...",
        "status": "active",
        "progress": 10
    })

    try:
        if not os.getenv("GOOGLE_API_KEY") or not os.getenv("SERPAPI_API_KEY"):
            raise ValueError("API Keys not configured in .env")

        crew = ResearchCrew(topic, log_callback=log_callback, loop=loop)
        report = await asyncio.to_thread(crew.run)
        
        await manager.broadcast({
            "agent": "Writer",
            "log": "Mission complete. Transferring intelligence report...",
            "status": "done",
            "report": str(report),
            "progress": 100
        })
    except Exception as e:
        print(f"Mission Error: {e}")
        await manager.broadcast({
            "agent": "Researcher",
            "log": f"CRITICAL FAILURE: {str(e)}",
            "status": "standby",
            "progress": 0
        })

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                payload = json.loads(data)
                if payload.get("command") == "DEPLOY_MISSION":
                    topic = payload.get("topic")
                    # Start mission in background task immediately
                    asyncio.create_task(execute_mission_logic(topic))
            except json.JSONDecodeError:
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WS Error: {e}")
        manager.disconnect(websocket)

@app.post("/api/mission")
async def create_mission(request: MissionRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(execute_mission_logic, request.topic)
    return {"status": "Mission Deployed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
