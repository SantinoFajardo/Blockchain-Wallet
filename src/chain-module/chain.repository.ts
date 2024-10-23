import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChainDocument } from '../interfaces/chain.interface';

@Injectable()
export class ChainRepository {
  constructor(
    @InjectModel('Chain') private readonly chainModel: Model<IChainDocument>,
  ) {}

  public async getChainByName(chainName: string): Promise<IChainDocument> {
    return await this.chainModel.findOne({ name: chainName });
  }
}
