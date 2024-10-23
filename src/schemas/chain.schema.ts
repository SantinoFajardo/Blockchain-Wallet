import { Schema } from 'mongoose';
import { IChainDocument } from '../interfaces/chain.interface';

export const ChainSchema = new Schema<IChainDocument>({
  chainId: { type: Number, required: [true, 'chainId cannot be empty'] },
  name: { type: String, required: [true, 'chain name cannot be empty'] },
  label: { type: String, required: [true, 'chain label cannot be empty'] },
  testnet: { type: Object, required: false },
  nativeTokenMetadata: {
    type: Object,
    required: [true, 'native token metadata is required'],
  },
  rpcUrl: { type: String, required: [true, 'chain rpc url cannot be empty'] },
  isEvm: { type: Boolean, required: false, default: true },
  icon: { type: String, required: [true, 'chain icon cannot be empty'] },
});
