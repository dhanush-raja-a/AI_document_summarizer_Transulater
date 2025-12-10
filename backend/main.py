from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import upload
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Document Analyzer")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api", tags=["Document Processing"])

@app.get("/")
async def root():
    return {"message": "AI Document Analyzer Backend is Running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
