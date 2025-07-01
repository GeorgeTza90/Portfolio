import { Request, Response } from "express";

export const getPurchase = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ heading: "Purchase Tickets" });
  } catch (error) {
    console.error("Error on Purchase Page:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postPurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, ticketType, ticketQuantity } = req.body;

    res.status(200).json({
      message: `Purchasing: ${ticketQuantity} tickets for ${ticketType} by ${firstName} ${lastName}, ${email}`,
    });
  } catch (error) {
    console.error("Error on Purchase Page:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
