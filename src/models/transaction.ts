import { Schema, model } from "mongoose";

export interface ITransaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
}

export const TransactionSchema: Schema = new Schema<ITransaction>({
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amount: { type: Number, require: true },
});

export const Transaction = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
