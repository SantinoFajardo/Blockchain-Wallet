import { Injectable } from '@nestjs/common';
import { supportedChains } from 'src/interfaces/supported-chains.enum';
import { IWallet } from 'src/interfaces/wallet.interface';
import { PrivateKey } from 'bitcore-lib';
import { WalletRepository } from '../wallets.repository';
import { WalletProvider } from '../../interfaces/wallet-provider.interface';
import { PrivateKeyService } from '../private-key.service';

@Injectable()
export class BtcWalletProvider implements WalletProvider {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly privateKeyService: PrivateKeyService,
  ) {}

  async getOrCreateWallet(userId: string): Promise<any> {
    let btcWallet = await this.walletRepository.getWalletOnChain(
      [supportedChains.BITCOIN],
      userId,
    );

    if (!btcWallet) {
      return await this.walletRepository.saveWalletOnDB(
        this.createBtcWallet(userId),
      );
    }

    return btcWallet;
  }

  private createBtcWallet(userId: string): IWallet {
    const privateKey = new PrivateKey();
    const address = privateKey.toAddress();

    const encryptedPrivateKey = this.privateKeyService.encryptKey(
      privateKey.toWIF(),
    );

    return {
      address: address.toString(),
      enctyptedPrivateKey: encryptedPrivateKey,
      chains: [supportedChains.BITCOIN],
      userId,
      isEvm: false,
      isSmartWallet: false,
    };
  }
}
