from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
import os
from dotenv import load_dotenv
from qdrant_client.http.models import PointStruct, FilterSelector, Filter, FieldCondition, MatchValue
from typing import List

load_dotenv()

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))

client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

TEXT_KNOWLEDGE_COLLECTION_NAME = "text_knowledge"


def ensure_collection(collection_name: str, vector_size: int, distance: Distance = Distance.COSINE):
    existing_collections = [
        c.name for c in client.get_collections().collections]
    if collection_name not in existing_collections:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=vector_size, distance=distance)
        )
        print(f"Collection '{collection_name}' is created.")
    else:
        print(f"Collection '{collection_name}' already existed.")


def add_text_knowledge(points: List[PointStruct]):
    client.upsert(
        collection_name=TEXT_KNOWLEDGE_COLLECTION_NAME, points=points)


def remove_text_knowledge(id: int):
    client.delete(
        collection_name=TEXT_KNOWLEDGE_COLLECTION_NAME,
        points_selector=FilterSelector(
            filter=Filter(
                must=[
                    FieldCondition(
                        key="knowledge_id",
                        match=MatchValue(value=id)
                    )
                ]
            )
        )
    )


def search_text_knowledge(query_embedding, limit = 20, score_threshold=0.7):
    search_result = client.query_points(
        collection_name=TEXT_KNOWLEDGE_COLLECTION_NAME,
        query=query_embedding,
        limit=limit,
        score_threshold=score_threshold
    ).points
    return search_result


def setup_qdrant_collection():
    ensure_collection(TEXT_KNOWLEDGE_COLLECTION_NAME, 768)
