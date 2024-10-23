import { Injectable } from '@nestjs/common';
import { EvmWalletProvider } from './evm-wallet.provider';
import { BtcWalletProvider } from './btc-wallet.provider';
import { supportedChains } from '../../interfaces/supported-chains.enum';
import { WalletProvider } from '../../interfaces/wallet-provider.interface';

@Injectable()
export class WalletFactory {
  constructor(
    private readonly evmWalletProvider: EvmWalletProvider,
    private readonly btcWalletProvider: BtcWalletProvider,
  ) {}

  getProvider(chain: supportedChains): WalletProvider {
    switch (chain) {
      case supportedChains.ETHEREUM:
        return this.evmWalletProvider;
      case supportedChains.BITCOIN:
        return this.btcWalletProvider;
      default:
        throw new Error('Blockchain no soportada');
    }
  }
}
