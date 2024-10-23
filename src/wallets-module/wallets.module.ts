import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from '../schemas/wallet.schema';
import { WalletRepository } from './wallets.repository';
import { PrivateKeyService } from './private-key.service';
import { WalletsController } from './wallet.controller';
import { WalletService } from './wallets.service';
import { WalletFactory } from './wallets-factory/wallet.factory';
import { BtcWalletProvider } from './wallets-factory/btc-wallet.provider';
import { EvmWalletProvider } from './wallets-factory/evm-wallet.provider';
import { JwtAuthModule } from '../jwt-module/jwt.module';

@Module({
  providers: [
    EvmWalletProvider,
    BtcWalletProvider,
    WalletFactory,
    WalletRepository,
    PrivateKeyService,
    WalletService,
  ],
  controllers: [WalletsController],
  imports: [
    JwtAuthModule,
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
  ],
  exports: [WalletService],
})
export class WalletModule {}
