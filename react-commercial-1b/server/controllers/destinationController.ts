import { Request, Response } from "express";
import db from "../db";

type Destination = {
  id: number;
  planet: string;
  text: string;
  price: string;
  city: string;
};

export const getDestination = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [destinations] = await db.query("SELECT * FROM destination") as [Destination[], any];

    console.log("Fetched destinations:", destinations);

    res.status(200).json({
      heading: "Our Locations - Your Destination",
      destinations
    });

  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
