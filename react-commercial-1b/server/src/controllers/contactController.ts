import { Request, Response } from "express";
import db from "../db";
import MailMe from "../services/MailMe";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    let heading = "Contact Us";
    let user: User | string = "Guest";

    if (req.user?.email) {
      const [users] = (await db.query(
        "SELECT * FROM users WHERE email = ?",
        [req.user.email]
      )) as [User[], any];

      if (users.length > 0) {
        user = users[0].email;
      }
    }

    res.json({ heading, user });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phoneNumber, topic, message } = req.body;

    await db.query(
      "INSERT INTO contacts (firstName, lastName, email, phoneNumber, topic, message) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, phoneNumber, topic, message]
    );

    await MailMe(
      "vern57@ethereal.email",
      email,
      `IceCream Vacations on request: ${topic}`,
      `Hello ${firstName},\n We have stored your request on ${topic} and you will have an answer soon!.`
    );

    res.status(201).json({ message: "Contact - Success" });
  } catch (error) {
    console.error("Error in Contact Form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
