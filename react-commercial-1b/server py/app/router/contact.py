from fastapi import APIRouter

router = APIRouter()


@router.get("/contact")
def get_contact():
    return {"api": "contact", "method": "get"}


@router.post("/contact")
def post_contact():
    return {"api": "contact", "method": "post"}