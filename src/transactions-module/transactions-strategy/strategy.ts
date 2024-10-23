import { Injectable } from '@nestjs/common';
import { supportedChains } from 'src/interfaces/supported-chains.enum';
import { EvmTransactionStrategy } from './evm-transaction.strategy';
import {
  ITransaction,
  ITransactionDocument,
} from '../../interfaces/transaction.interface';
import { TransactionsRepository } from '../transactions.repository';

@Injectable()
export class TransactionsStrategy {
  private transactionProvider: TransactionProvider;

  constructor(
    private readonly evmTransctionProvider: EvmTransactionStrategy,
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  public setStrategy(chain: supportedChains) {
    switch (chain) {
      case supportedChains.ETHEREUM:
        this.transactionProvider = this.evmTransctionProvider;
        break;
      default:
        throw new Error('chain not supported');
    }
  }

  public async sendTransaction(
    transaction: ITransactionDocument,
  ): Promise<string> {
    const txHash = await this.transactionProvider.sendTransaction(transaction);

    await this.transactionRepository.updateTransaction(
      transaction._id.toString(),
      {
        status: 'SUCCESS',
        blockchainHash: txHash,
      },
    );

    return txHash;
  }
}

export abstract class TransactionProvider {
  public abstract sendTransaction(transaction: ITransaction): Promise<string>;
}
