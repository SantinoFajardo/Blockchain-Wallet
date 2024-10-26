import { Injectable } from '@nestjs/common';
import {
  Balances,
  BalancesStrategy,
} from './balances-strategy/balances.strategy';
import { supportedChains } from 'src/interfaces/supported-chains.enum';
import { WalletService } from 'src/wallets-module/wallets.service';

@Injectable()
export class BalancesService {
  constructor(
    private readonly balancesStrategy: BalancesStrategy,
    private readonly walletService: WalletService,
  ) {}

  public async fetchUserBalances(
    userId: string,
    test: boolean = false,
  ): Promise<Balances[]> {
    const supportedChainsList = Object.values(supportedChains);

    const userBalances = [];

    for (const chain of supportedChainsList) {
      this.balancesStrategy.setStrategy(chain);

      const userWallet = await this.walletService.getWalletByChain(
        chain,
        userId,
      );

      const chainBalance = await this.balancesStrategy.fetchBalances(
        userWallet.address,
        test,
      );

      userBalances.push(...chainBalance);
    }

    return userBalances;
  }
}
