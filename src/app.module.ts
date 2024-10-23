import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallets-module/wallets.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users-module/users.module';
import { TransactionsModule } from './transactions-module/transactions.module';
import { BalancesModule } from './balances-module/balances.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    WalletModule,
    UsersModule,
    TransactionsModule,
    BalancesModule,
  ],
})
export class AppModule {}
