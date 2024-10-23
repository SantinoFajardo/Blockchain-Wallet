import { Document } from 'mongoose';
import { supportedChains } from './supported-chains.enum';

export interface IChain {
  name: supportedChains;
  chainId: number;
  icon: string;
  label: string;
  testnet: IChainTestnet;
  nativeTokenMetadata: INativeTokenMetadata;
  rpcUrl: string;
  isEvm: boolean;
}

export interface IChainTestnet {
  rpcUrl: string;
  name: string;
}

export interface INativeTokenMetadata {
  icon: string;
  name: string;
  symbol: string;
}

export interface IChainDocument extends IChain, Document {}
