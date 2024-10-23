import { Document } from 'mongoose';

export interface IWallet {
  userId: string;
  address: string;
  enctyptedPrivateKey: string;
  chains: string[];
  isEvm: boolean;
  isSmartWallet: boolean;
}

export interface IWalletDocument extends IWallet, Document {}
