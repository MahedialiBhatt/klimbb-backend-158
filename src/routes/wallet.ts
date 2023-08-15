import express, { Request, Response } from "express";
import walletController from "../controllers/wallet.controller";

const router = express.Router();

router.get("/balance/:address", async (req: Request, res: Response) => {
  return await walletController.getBalance(req, res);
});

router.get("/transaction/:address", async (req: Request, res: Response) => {
  return await walletController.getTransaction(req, res);
});

router.post("/transaction", async (req: Request, res: Response) => {
  return await walletController.addTransaction(req, res);
});

export { router as walletRouter };
