from fastapi import APIRouter

router = APIRouter()


@router.get("/purchase")
def get_purchase():
    return {"api": "purchase", "method": "get"}


@router.post("/purchase")
def post_purchase():
    return {"api": "purchase", "method": "post"}