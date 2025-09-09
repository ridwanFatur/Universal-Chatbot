from fastapi import BackgroundTasks
from sqlalchemy.orm import Session
from ai_services.ollama import get_embedding
from ai_services.qdrant import add_text_knowledge, remove_text_knowledge, search_text_knowledge
from models.text_knowledge import TextKnowledge
from utils import string_utils
from qdrant_client.http.models import PointStruct
import uuid
from sqlalchemy.exc import NoResultFound
from typing import List


def get_text_knowledge(db: Session, page: int, page_size: int) -> List[TextKnowledge]:
    if page < 1:
        page = 1
    if page_size < 1:
        page_size = 10

    return (
        db.query(TextKnowledge)
        .order_by(TextKnowledge.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )


def create_text_knowledge(db: Session, title: str, content: str, background_tasks: BackgroundTasks) -> TextKnowledge:
    new_knowledge = TextKnowledge(
        title=title,
        content=content
    )
    db.add(new_knowledge)
    db.commit()
    db.refresh(new_knowledge)
    
    background_tasks.add_task(process_vector_db, new_knowledge.id, content)
    return new_knowledge


def process_vector_db(knowledge_id: int, content: str):
    chunk_size = 200
    chunks = string_utils.chunk_text(content, chunk_size)
    points = []
    for idx, chunk in enumerate(chunks):
        vector = get_embedding(chunk)
        point = PointStruct(
            id=str(uuid.uuid4()),
            vector=vector,
            payload={
                "knowledge_id": knowledge_id,
                "text": chunk
            }
        )
        points.append(point)
    add_text_knowledge(points)


def delete_text_knowledge(db: Session, id: int):
    knowledge = db.query(TextKnowledge).filter(TextKnowledge.id == id).first()
    if not knowledge:
        raise NoResultFound(f"TextKnowledge with id={id} not found")
    db.delete(knowledge)
    db.commit()

    remove_text_knowledge(id)
    return True


def find_text_knowledge(query: str):
    query_embedding = get_embedding(query)
    search_result = search_text_knowledge(query_embedding)
    texts = [point.payload["text"]
             for point in search_result if "text" in point.payload]
    combined_text = " ".join(texts)
    return combined_text
