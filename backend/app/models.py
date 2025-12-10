from pydantic import BaseModel
from typing import Dict, Optional

class ProcessResponse(BaseModel):
    filename: str
    original_length: int
    summary: str
    translations: Dict[str, str]  # e.g., {'ta': '...', 'te': '...'}
    processing_time: float
