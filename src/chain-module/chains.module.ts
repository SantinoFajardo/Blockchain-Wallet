import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChainSchema } from '../schemas/chain.schema';
import { ChainService } from './chain.service';
import { ChainRepository } from './chain.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chain', schema: ChainSchema }]),
  ],
  providers: [ChainService, ChainRepository],
  exports: [ChainService],
})
export class ChainsModule {}
