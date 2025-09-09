from fastapi import WebSocket
import json
import asyncio
import requests
import ollama
import os
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
SYSTEM_PROMPT = "You are an AI assistant to help answer user questions by provided data."
LLM_MODEL_NAME = 'llama3.2:1B'
EMBEDDING_MODEL_NAME = 'nomic-embed-text'

client = ollama.Client(host=OLLAMA_URL)


def get_system_prompt(knowledge: str | None) -> str:
    system_prompt = SYSTEM_PROMPT
    if knowledge:
        system_prompt += f"""
        
You are provided with the following background knowledge. Use it as the primary source when answering the user.
If the knowledge is relevant, prioritize it over your own reasoning. 
If it is not sufficient, you may combine it with your general knowledge, but make it clear when you are going beyond the provided context.

Background Knowledge:
{knowledge}
"""
    return system_prompt


def query_model(user_query: str, knowledge: str | None):
    response = client.chat(
        model=LLM_MODEL_NAME,
        messages=[
            {"role": "system", "content": get_system_prompt(knowledge)},
            {"role": "user", "content": user_query}
        ],
    )
    answer = response["message"]["content"]
    return answer


async def query_model_ws(websocket: WebSocket, user_query: str, knowledge: str | None):
    try:
        await websocket.send_text(json.dumps({
            "type": "start",
            "content": ""
        }))
        stream = client.chat(
            model=LLM_MODEL_NAME,
            messages=[
                {"role": "system", "content": get_system_prompt(knowledge)},
                {"role": "user", "content": user_query}
            ],
            stream=True,
        )

        for chunk in stream:
            content = chunk['message']['content']
            if content:
                await websocket.send_text(json.dumps({
                    "type": "chunk",
                    "content": content
                }))
                await asyncio.sleep(0)

        await websocket.send_text(json.dumps({
            "type": "done",
            "content": ""
        }))
    except requests.exceptions.RequestException as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "content": f"Connection error to LLM server: {str(e)}"
        }))
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "content": f"Unexpected error: {str(e)}"
        }))


def get_embedding(text: str):
    response = client.embeddings(
        model=EMBEDDING_MODEL_NAME,
        prompt=text
    )
    return response.embedding
  
def summarize_text(text):
    prompt = f"Summarize the following text concisely, avoiding repetition:\n\n{text}"
    response = client.generate(model=LLM_MODEL_NAME, prompt=prompt)
    return response.response