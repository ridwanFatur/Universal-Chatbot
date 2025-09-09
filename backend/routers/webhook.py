from fastapi import APIRouter, Request
import ollama
import requests

from ai_services.ollama import query_model
from config import TELEGRAM_API_URL
from crud.text_knowledge import find_text_knowledge


router = APIRouter(prefix="/webhook", tags=["webhook"])


@router.post("/telegram")
async def reply_telegram(req: Request):
    body = await req.json()

    chat_id = body.get("message", {}).get("chat", {}).get("id")
    message_text = body.get("message", {}).get("text")

    if chat_id and message_text:
        send_url = f"{TELEGRAM_API_URL}/sendMessage"
        knowledge = find_text_knowledge(message_text)
        answer = query_model(message_text, knowledge)

        payload = {
            "chat_id": chat_id,
            "text": answer
        }
        requests.post(send_url, json=payload)

    return {"ok": True}
