import { Module } from '@nestjs/common';
import { BalancesStrategy } from './balances-strategy/balances.strategy';
import { EvmBalancesProvider } from './balances-strategy/evm-balances.strategy';
import { BalancesService } from '../balances-module/balances.service';
import { BalancesController } from './balances.controller';
import { WalletModule } from '../wallets-module/wallets.module';
import { BtcBalancesProvider } from './balances-strategy/btc-balances.strategy';
import { ChainsModule } from '../chain-module/chains.module';

@Module({
  imports: [WalletModule, ChainsModule],
  controllers: [BalancesController],
  providers: [
    BalancesStrategy,
    EvmBalancesProvider,
    BtcBalancesProvider,
    BalancesService,
  ],
})
export class BalancesModule {}
