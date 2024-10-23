import { forwardRef, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../schemas/transaction.schema';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { TransactionStrategyModule } from './transactions-strategy/transactions-strategy.module';
import { WalletModule } from '../wallets-module/wallets.module';

@Module({
  imports: [
    WalletModule,
    forwardRef(() => TransactionStrategyModule),
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionsRepository, TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsRepository],
})
export class TransactionsModule {}
