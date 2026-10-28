from fastapi import APIRouter

from app.router import (
    auth,
    comments,
    contact,
    destination,
    health,
    likes,
    news,
    purchase,
)

router = APIRouter()
router.include_router(likes.router)
router.include_router(comments.router)
router.include_router(news.router)
router.include_router(destination.router)
router.include_router(purchase.router)
router.include_router(contact.router)
router.include_router(auth.router)
router.include_router(health.router)