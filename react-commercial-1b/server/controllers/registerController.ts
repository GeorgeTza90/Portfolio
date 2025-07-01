import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

export const getRegister = async (_req: Request, res: Response): Promise<void> => {
  res.json({ heading: "Sign Up" });
};

export const postRegister = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, pwd, email } = req.body;

    const [existingUsers] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [user, email]
    );
    if (existingUsers.length > 0) {
      res.status(409).json({ message: "Username or Email already exists" });
      return;
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [user, email, hashedPwd]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
