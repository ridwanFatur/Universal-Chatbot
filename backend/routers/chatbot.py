import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ai_services.ollama import query_model_ws
from crud.text_knowledge import find_text_knowledge
from utils.websocket_connection_manager import manager

router = APIRouter(prefix="/chatbot", tags=["chatbot"])

@router.websocket("/ws")
async def chat(
    websocket: WebSocket
):
  await websocket.accept()
  try:
    await manager.connect(websocket)
    while True:
      data = await websocket.receive_text()
      message_data = json.loads(data)
      query = message_data.get("query", "")
      if query:
        knowledge = find_text_knowledge(query)
        await query_model_ws(websocket, query, knowledge)
  except WebSocketDisconnect:
    manager.disconnect(websocket)
  except Exception as e:
    await websocket.send_text(json.dumps({
			"type": "error",
			"content": f"Server error: {str(e)}"
    }))
    manager.disconnect(websocket)
