import { Request, Response } from "express";
import db from "../db";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      email: string;
      [key: string]: any;
    };
  }
}

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    const [comments] = await db.query("SELECT * FROM comments");
    const [likes] = await db.query("SELECT * FROM likes");

    let heading = "Contact Us";
    let user: string | User = "Guest";

    if (req.user?.email) {
      const [users] = (await db.query("SELECT * FROM users WHERE email = ?", [req.user.email])) as [User[], any];
      if (users.length > 0) {
        user = users[0].username;
        heading = `Some news for you, ${user}`;
      }
    }

    res.json({ heading, user, posts, comments, likes });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
