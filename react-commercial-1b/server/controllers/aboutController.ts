import { Request, Response } from "express";

export const getAbout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ heading: "About Us" });
  } catch (error) {
    console.error("Error on About Page:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
