import { Request, Response } from "express";
import db from "../db";

export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { kind, kindID, user } = req.body;

    await db.query(
      "INSERT INTO likes (kind, kindID, user) VALUES (?, ?, ?)",
      [kind, kindID, user]
    );

    res.status(201).json({ message: `${user} liked ${kind} No. ${kindID}` });
  } catch (error) {
    console.error("Like not accepted: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { kind, id, user } = req.body;

    await db.query(
      "DELETE FROM likes WHERE kind = ? AND kindID = ? AND user = ?",
      [kind, id, user]
    );

    res.status(200).json({ message: `${user} recalled like on ${kind} No. ${id}` });
  } catch (error) {
    console.error("Like removal failed: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
