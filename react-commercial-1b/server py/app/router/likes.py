from fastapi import APIRouter, Request

from app.core.limiter import limiter

router = APIRouter()


@router.get("/likes")
def get_likes():
    return {"api": "likes", "method": "get"}


@router.post("/likes")
@limiter.limit("50/minute")
def post_likes(request: Request):
    return {"api": "likes", "method": "post"}


@router.delete("/likes")
def delete_likes():
    return {"api": "likes", "method": "delete"}