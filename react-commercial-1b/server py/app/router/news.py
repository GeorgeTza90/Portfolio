from fastapi import APIRouter

router = APIRouter()


@router.get("/news")
def get_news():
    return {"api": "news", "method": "get"}