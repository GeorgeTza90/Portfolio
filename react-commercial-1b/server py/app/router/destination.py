from fastapi import APIRouter

router = APIRouter()


@router.get("/destination")
def get_destination():
    return {"api": "destination", "method": "get"}