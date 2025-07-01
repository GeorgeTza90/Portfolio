import { Request, Response } from "express";

export const getPayment = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ heading: "Payment" });
  } catch (error) {
    console.error("Error on Payment Page:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
