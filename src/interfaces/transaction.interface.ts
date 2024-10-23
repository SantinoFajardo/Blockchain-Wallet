import { Document } from 'mongoose';

export interface ITransaction {
  from: string;
  to: string;
  tokenAmount: number;
  chain: string;
  tokenAddress: string;
  status: string;
  isTest: boolean;
  blockchainHash?: string;
}

export interface ITransactionDocument extends ITransaction, Document {}
