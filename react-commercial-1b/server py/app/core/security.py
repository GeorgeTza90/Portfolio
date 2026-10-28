from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

MAX_BODY_BYTES = 100 * 1024

SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
    "Cross-Origin-Resource-Policy": "cross-origin",
}


async def limit_body_size(request: Request, call_next):
    length = request.headers.get("content-length")
    if length and int(length) > MAX_BODY_BYTES:
        return JSONResponse({"error": "Payload too large"}, status_code=413)
    return await call_next(request)


async def security_headers(request: Request, call_next):
    response = await call_next(request)
    for key, value in SECURITY_HEADERS.items():
        response.headers[key] = value
    return response


def setup_security(app: FastAPI) -> None:
    app.middleware("http")(limit_body_size)
    app.middleware("http")(security_headers)