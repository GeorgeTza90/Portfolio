from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.get("/keep-alive")
def keep_alive():
    return {"status": "alive"}