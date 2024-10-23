import { Injectable } from '@nestjs/common';
import { Wallet } from 'ethers';
import { WalletProvider } from '../../interfaces/wallet-provider.interface';
import { WalletRepository } from '../wallets.repository';
import { PrivateKeyService } from '../private-key.service';
import { IWallet } from '../../interfaces/wallet.interface';
import { SupportedEvmChains } from '../../interfaces/supported-chains.enum';

@Injectable()
export class EvmWalletProvider implements WalletProvider {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly privateKeyService: PrivateKeyService,
  ) {}

  async getOrCreateWallet(userId: string): Promise<any> {
    let evmWallet = await this.walletRepository.getSmartWalletEvmWallet(userId);
    if (!evmWallet) {
      await this.walletRepository.saveWalletOnDB(this.createEvmWallet(userId));
    }
    return evmWallet;
  }

  private createEvmWallet(userId: string): IWallet {
    const wallet = Wallet.createRandom();
    const enctyptedPrivateKey = this.privateKeyService.encryptKey(
      wallet.privateKey,
    );

    return {
      address: wallet.address,
      enctyptedPrivateKey: enctyptedPrivateKey,
      chains: SupportedEvmChains,
      userId,
      isEvm: true,
      isSmartWallet: true,
    };
  }
}
