import { forwardRef, Module } from '@nestjs/common';
import { TransactionsStrategy } from './strategy';
import { EvmTransactionStrategy } from './evm-transaction.strategy';
import { WalletModule } from 'src/wallets-module/wallets.module';
import { Erc20Service } from '../erc20.service';
import { TransactionsModule } from '../transactions.module';
import { ChainsModule } from '../../chain-module/chains.module';

@Module({
  imports: [WalletModule, forwardRef(() => TransactionsModule), ChainsModule],
  providers: [TransactionsStrategy, EvmTransactionStrategy, Erc20Service],
  exports: [TransactionsStrategy],
})
export class TransactionStrategyModule {}
