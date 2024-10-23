import { Schema } from 'mongoose';
import { ITransactionDocument } from 'src/interfaces/transaction.interface';

export const TransactionSchema = new Schema<ITransactionDocument>(
  {
    to: { type: String },
    from: { type: String },
    tokenAddress: { type: String },
    tokenAmount: { type: Number },
    chain: { type: String },
    status: { type: String },
    isTest: { type: Boolean, default: false },
    blockchainHash: { type: String },
  },
  { timestamps: true },
);
