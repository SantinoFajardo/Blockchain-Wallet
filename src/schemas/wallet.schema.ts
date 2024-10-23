import { Schema } from 'mongoose';
import { IWalletDocument } from '../interfaces/wallet.interface';

export const WalletSchema = new Schema<IWalletDocument>(
  {
    userId: {
      type: String,
      required: [true, 'userId is needed'],
    },
    address: {
      type: String,
      required: [true, 'wallet address is needed'],
    },
    chains: {
      type: [String],
      required: [true, 'wallet supported chains is needed'],
    },
    enctyptedPrivateKey: {
      type: String,
      required: [true, 'encrypted private key is needed'],
    },
    isEvm: {
      type: Boolean,
    },
    isSmartWallet: {
      type: Boolean,
    },
  },
  { timestamps: true },
);
