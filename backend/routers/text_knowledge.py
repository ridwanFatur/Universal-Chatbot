from fastapi import APIRouter, BackgroundTasks, Depends, Query, HTTPException
from pydantic import BaseModel
from requests import Session
from crud.text_knowledge import create_text_knowledge, delete_text_knowledge, get_text_knowledge
from database.database import get_db
from typing import Dict, Any

from models.text_knowledge import TextKnowledge

router = APIRouter(prefix="/text-knowledge", tags=["text-knowledge"])


class TextKnowledgeCreate(BaseModel):
    title: str
    content: str


@router.post("/")
def create_text_knowledge_route(
    body: TextKnowledgeCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> Dict[str, Any]:
    knowledge = create_text_knowledge(db, body.title, body.content, background_tasks)
    return {
        "id": knowledge.id,
        "title": knowledge.title,
        "content": knowledge.content,
        "created_at": knowledge.created_at,
    }


@router.delete("/{id}")
def delete_text_knowledge_route(
    id: int,
    db: Session = Depends(get_db),
):
    try:
        delete_text_knowledge(db, id)
        return {"message": f"TextKnowledge with id={id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/")
def fetch_text_knowledge(
    page: int = Query(1, ge=1),
    page_size: int = Query(5, ge=1, le=100),
    db: Session = Depends(get_db),
) -> Dict[str, Any]:
    items = get_text_knowledge(db, page, page_size)
    total = db.query(TextKnowledge).count()

    return {
        "page": page,
        "page_size": page_size,
        "total": total,
        "items": [
            {
                "id": item.id,
                "title": item.title,
                "content": item.content,
                "created_at": item.created_at,
            }
            for item in items
        ],
    }
