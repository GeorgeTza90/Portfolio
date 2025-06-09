import { Request, Response } from "express";
import db from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

const SECRET_KEY = process.env.JWT_SECRET || "";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const getLogin = async (_req: Request, res: Response): Promise<void> => {
  res.json({ heading: "Sign In" });
};

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query<RowDataPacket[] & User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      res.status(401).json({ message: "User Does Not Exist" });
      return;
    }

    const foundUser = users[0];

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign({ email: foundUser.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Logged In Successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
