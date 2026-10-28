from fastapi import APIRouter, Request

from app.core.limiter import limiter

router = APIRouter()


@router.get("/comments")
def get_comments():
    return {"api": "comments", "method": "get"}


@router.post("/comments")
@limiter.limit("50/minute")
def post_comments(request: Request):
    return {"api": "comments", "method": "post"}


@router.delete("/comments")
def delete_comments():
    return {"api": "comments", "method": "delete"}