import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ITransaction,
  ITransactionDocument,
} from '../interfaces/transaction.interface';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectModel('Transactions')
    private readonly transactionModel: Model<ITransactionDocument>,
  ) {}

  public async updateTransaction(
    transactionId: string,
    updateData: Partial<ITransaction>,
  ) {
    return await this.transactionModel.findByIdAndUpdate(
      transactionId,
      { $set: updateData },
      {
        new: true,
        upsert: false,
      },
    );
  }

  public async getUserTransactions(
    userAddress: string[],
  ): Promise<ITransaction[]> {
    return await this.transactionModel
      .find({
        $or: [{ from: { $in: userAddress } }, { to: { $in: userAddress } }],
      })
      .exec();
  }

  public async saveTransactionOnDb(
    transaction: ITransaction,
  ): Promise<ITransactionDocument> {
    const newTransaction = new this.transactionModel(transaction);
    return await newTransaction.save();
  }
}
