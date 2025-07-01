import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
// import type { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string;[key: string]: any };
    }
  }
}

function optAuthToken(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded) => {
      if (!err && decoded && typeof decoded !== "string") {
        req.user = decoded as { email: string;[key: string]: any };
      } else if (err) {
        console.log("Token invalid:", err.message);
      }
      next();
    });
  } else {
    next();
  }
}

export default optAuthToken;
