from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_services.qdrant import setup_qdrant_collection
from config import ALLOWED_ORIGINS
from routers import chatbot, webhook, text_knowledge

app = FastAPI(title="Universal Chatbot", version="1.0.0")

setup_qdrant_collection()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot.router)
app.include_router(webhook.router)
app.include_router(text_knowledge.router)

@app.get("/")
def read_root():
    return {"message": "Your Project is Ready"}
