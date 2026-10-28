from fastapi import FastAPI
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.cors import setup_cors
from app.core.limiter import limiter
from app.core.security import setup_security
from app.router import index

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

setup_security(app)
setup_cors(app)

app.include_router(index.router, prefix="/api")