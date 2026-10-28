from fastapi import APIRouter, Request

from app.core.limiter import limiter

router = APIRouter()


@router.post("/login")
@limiter.limit("10/minute")
def login(request: Request):
    return {"api": "login", "method": "post"}


@router.post("/logout")
def logout():
    return {"api": "logout", "method": "post"}


@router.post("/register")
@limiter.limit("5/minute")
def register(request: Request):
    return {"api": "register", "method": "post"}