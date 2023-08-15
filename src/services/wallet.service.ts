import {
  ITransaction,
  Transaction as TransactionModel,
} from "../models/transaction";
import { Block as BlockModel, IBlock } from "../models/block";
import { generateHash } from "../utils/utility";

const WalletService = {
  async getBalance(address: string): Promise<Number> {
    const blocks = await WalletService.fetchBlockchain();

    let balance = 0;

    for (const block of blocks) {
      const { fromAddress, toAddress, amount } = block.transaction;

      if (fromAddress == address) {
        balance -= amount;
      } else if (toAddress == address) {
        balance += amount;
      }
    }

    return balance;
  },

  async getTransactions(address: string): Promise<IBlock[]> {
    const transactions = await BlockModel.find({
      $or: [
        { "transaction.fromAddress": address },
        { "transaction.toAddress": address },
      ],
    })
      .select({ transaction: 1, _id: 0 })
      .exec();

    return WalletService._prepareTransactions(transactions);
  },

  async addTransaction(
    fromAddress: string,
    toAddress: string,
    amount: number
  ): Promise<IBlock> {
    const newTransaction = new TransactionModel({
      fromAddress: fromAddress,
      toAddress: toAddress,
      amount: amount,
    });

    // we can save in transaction model as well
    // await newTransaction.save();

    const latestBlock: IBlock | null = await WalletService.fetchLatestBlock();

    const hash = generateHash(
      newTransaction,
      latestBlock ? latestBlock.hash : "#"
    );

    const newBlock = await WalletService.createBlock(
      latestBlock,
      newTransaction,
      hash
    );

    return newBlock;
  },

  async createBlock(
    latestBlock: IBlock,
    transaction: ITransaction,
    hash: String
  ): Promise<IBlock> {
    const newBlock = new BlockModel({
      prevHash: latestBlock ? latestBlock.hash : "#",
      transaction,
      hash,
    });
    await newBlock.save();
    return newBlock;
  },

  async fetchBlockchain() {
    return await BlockModel.find({});
  },

  async fetchLatestBlock() {
    const latestBlock = await BlockModel.findOne({})
      .sort({ createdAt: -1 })
      .exec();
    return latestBlock;
  },

  _prepareTransactions(transactions: any) {
    const finalTransactions = [];
    for (const transaction of transactions) {
      finalTransactions.push(transaction.transaction);
    }
    return finalTransactions;
  },
};

export default WalletService;
