import { Injectable } from '@nestjs/common';
import {
  ITransaction,
  ITransactionDocument,
} from 'src/interfaces/transaction.interface';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsStrategy } from './transactions-strategy/strategy';
import { supportedChains } from 'src/interfaces/supported-chains.enum';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly transactionStrategy: TransactionsStrategy,
  ) {}

  public async getUserTransactionsHistory(
    userAddreses: string[],
  ): Promise<ITransaction[]> {
    return await this.transactionRepository.getUserTransactions(userAddreses);
  }

  public async createTransaction(
    transaction: ITransaction,
  ): Promise<ITransactionDocument> {
    return await this.transactionRepository.saveTransactionOnDb(transaction);
  }

  // todo: use strategy
  public async sendTransaction(
    transaction: ITransactionDocument,
  ): Promise<string> {
    this.transactionStrategy.setStrategy(transaction.chain as supportedChains);

    return await this.transactionStrategy.sendTransaction(transaction);
  }
}
