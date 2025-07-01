import { Request, Response } from "express";

export const getKeepItAlive = (_req: Request, res: Response): void => {
  res.send("Server is alive");
};
