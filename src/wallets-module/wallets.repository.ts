import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IWallet, IWalletDocument } from '../interfaces/wallet.interface';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel('Wallet') private walletModel: Model<IWalletDocument>,
  ) {}

  public async getSmartWalletEvmWallet(userId: string): Promise<IWallet> {
    return await this.walletModel
      .findOne({ userId, isEvm: true, isSmartWallet: true })
      .exec();
  }

  public async getWalletOnChain(
    chains: string[],
    userId: string,
  ): Promise<IWallet> {
    return await this.walletModel
      .findOne({ userId, chains: { $in: chains } })
      .exec();
  }

  public async getAllUserWallets(userId: string): Promise<IWallet[]> {
    return await this.walletModel.find({ userId }).exec();
  }

  public async saveWalletOnDB(wallet: IWallet): Promise<IWallet> {
    const newWallet = new this.walletModel(wallet);

    return await newWallet.save();
  }

  public async getWalletByAddress(walletAddress: string): Promise<IWallet> {
    return await this.walletModel.findOne({ address: walletAddress }).exec();
  }
}
