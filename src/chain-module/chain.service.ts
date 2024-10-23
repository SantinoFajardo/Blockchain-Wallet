import { Injectable } from '@nestjs/common';
import { IChain } from '../interfaces/chain.interface';
import { supportedChains } from 'src/interfaces/supported-chains.enum';
import { ChainRepository } from './chain.repository';

@Injectable()
export class ChainService {
  constructor(private readonly chainRepository: ChainRepository) {}

  public async loadChain(chainName: supportedChains): Promise<IChain> {
    return await this.chainRepository.getChainByName(chainName);
  }
}
