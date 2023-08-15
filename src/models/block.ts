import { Schema, model } from "mongoose";
import { ITransaction, TransactionSchema } from "./transaction";

export interface IBlock {
  prevHash: string;
  transaction: ITransaction;
  hash: string;
}

const BlockSchema: Schema = new Schema<IBlock>(
  {
    prevHash: { type: String, required: true },
    transaction: { type: TransactionSchema, required: true },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Block = model<IBlock>("Block", BlockSchema);
