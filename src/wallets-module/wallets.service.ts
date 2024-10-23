import { Injectable } from '@nestjs/common';
import { supportedChains } from '../interfaces/supported-chains.enum';
import { IWallet } from '../interfaces/wallet.interface';
import { WalletFactory } from './wallets-factory/wallet.factory';
import { WalletRepository } from './wallets.repository';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletFactory: WalletFactory,
    private readonly walletRepository: WalletRepository,
  ) {}

  public async getWalletByChain(chain: supportedChains, userId: string) {
    return await this.walletRepository.getWalletOnChain([chain], userId);
  }

  public async getOrCreateWallets(userId: string): Promise<IWallet[]> {
    const wallets = [];

    const chains = Object.values(supportedChains);

    for (const chain of chains) {
      const provider = this.walletFactory.getProvider(chain);
      const wallet = await provider.getOrCreateWallet(userId);
      wallets.push(wallet);
    }

    return wallets;
  }

  public async getWalletByAddress(userAddress: string): Promise<IWallet> {
    return await this.walletRepository.getWalletByAddress(userAddress);
  }
}
