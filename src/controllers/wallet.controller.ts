import { Request, Response } from "express";
import { invoker, writeResponse } from "../utils/utility";
import walletService from "../services/wallet.service";
import { addTransactionSchema } from "../utils/validationSchema";

const WalletController = {
  async getBalance(req: Request, res: Response) {
    const address = req.params.address;

    const [response, err] = await invoker(walletService.getBalance(address));

    if (err) {
      console.log(err.message, `getBalance:[WalletController]`);
      return writeResponse(
        {
          code: 500,
          message: "Something went wrong while fetching balance.",
        },
        null,
        res
      );
    }

    return writeResponse(null, response, res);
  },

  async getTransaction(req: Request, res: Response) {
    const address = req.params.address;

    const [response, err] = await invoker(
      walletService.getTransactions(address)
    );

    if (err) {
      console.log(err.message, `getTransaction:[WalletController]`);
      return writeResponse(
        {
          code: 500,
          message: "Something went wrong while fetching transactions.",
        },
        null,
        res
      );
    }

    return writeResponse(null, response, res);
  },

  async addTransaction(req: Request, res: Response) {
    const { error, value } = addTransactionSchema.validate(req.body);

    if (error) {
      return writeResponse(
        {
          code: 400,
          message: error.details[0].message,
        },
        null,
        res
      );
    }

    const [response, err] = await invoker(
      walletService.addTransaction(
        value.fromAddress,
        value.toAddress,
        value.amount
      )
    );

    if (err) {
      console.log(err.message, `addTransaction:[WalletController]`);
      return writeResponse(
        {
          code: 500,
          message: "Something went wrong while creating transaction.",
        },
        null,
        res
      );
    }

    return writeResponse(null, response, res);
  },
};

export default WalletController;
