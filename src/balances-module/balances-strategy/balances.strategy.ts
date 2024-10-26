import { Injectable } from '@nestjs/common';
import { supportedChains } from 'src/interfaces/supported-chains.enum';
import { EvmBalancesProvider } from './evm-balances.strategy';
import { BtcBalancesProvider } from './btc-balances.strategy';

@Injectable()
export class BalancesStrategy {
  strategy: BalancesProvider;
  constructor(
    private readonly evmBalancesProvider: EvmBalancesProvider,
    private readonly btcBalancesProvider: BtcBalancesProvider,
  ) {}

  public async setStrategy(chain: supportedChains) {
    switch (chain) {
      case supportedChains.ETHEREUM:
        this.strategy = this.evmBalancesProvider;
        break;
      case supportedChains.BITCOIN:
        this.strategy = this.btcBalancesProvider;
        break;
    }
  }

  public async fetchBalances(
    accountAddress: string,
    test: boolean = false,
  ): Promise<Balances[]> {
    try {
      return await this.strategy.getBalance(accountAddress, test);
    } catch (error) {
      return [];
    }
  }
}

export interface Balances {
  amount: number;
  tokenAddress: string;
  account: string;
  name: string;
  symbol: string;
  url?: string;
}

export abstract class BalancesProvider {
  abstract getBalance(
    accountAddress: string,
    test?: boolean,
  ): Promise<Balances[]>;
}
