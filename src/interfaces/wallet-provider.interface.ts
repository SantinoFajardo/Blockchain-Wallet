import { IWallet } from './wallet.interface';

export interface WalletProvider {
  getOrCreateWallet(userId: string): Promise<IWallet>;
}
