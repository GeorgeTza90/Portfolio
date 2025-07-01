import { Request, Response } from "express";
import db from "../db";
import { ResultSetHeader } from "mysql2";

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, text, kind, kindID } = req.body;

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO comments (username, text, kind, kindID) VALUES (?, ?, ?, ?)",
      [username, text, kind, kindID]
    );

    const commentID = result.insertId;

    res.status(201).json({
      message: `${username} commented on ${kind} No. ${kindID}`,
      commentID,
    });

  } catch (error) {
    console.error("Comment not accepted:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentID } = req.params;
    const { user } = req.body;

    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM comments WHERE id = ? AND username = ?",
      [commentID, user]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Comment not found or unauthorized" });
      return;
    }

    await db.query(
      "DELETE FROM likes WHERE kind = ? AND kindID = ?",
      ["comment", commentID]
    );

    res.status(200).json({ message: `Comment ID ${commentID} deleted` });

  } catch (error) {
    console.error("Cannot delete comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
