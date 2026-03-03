from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .routes import admin
from .utils.firebase import initialize_firebase

# Load environment variables
load_dotenv()

# Initialize Firebase
initialize_firebase()

# Create FastAPI app
app = FastAPI(
    title="ESG Calculator API",
    description="Backend API for emission calculations",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React dev server
        "https://esg-project-app.vercel.app",  # Your frontend
        os.getenv("FRONTEND_URL", "")  # Add from env
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin.router)

@app.get("/")
async def root():
    return {
        "message": "ESG Calculator API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "firebase": "connected"}