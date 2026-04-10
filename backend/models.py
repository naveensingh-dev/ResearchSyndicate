from pydantic import BaseModel
from typing import List, Optional

class MissionRequest(BaseModel):
    topic: str

class AgentLog(BaseModel):
    agent: str
    log: str
    status: str # 'active', 'done', 'standby'
    progress: float

class MissionResponse(BaseModel):
    topic: str
    report: str
