import { Controller, Post, Req } from '@nestjs/common';
import { WalletService } from './wallets.service';
import { Authorization } from '../decorators/authorization.decorator';
import { IAuthorizationRequest } from '../interfaces/authorization-request';

@Controller('wallet')
export class WalletsController {
  constructor(private readonly walletsService: WalletService) {}

  @Post('/')
  @Authorization(true)
  public async getOrCreateWallets(@Req() req: IAuthorizationRequest) {
    try {
      const userWallets = await this.walletsService.getOrCreateWallets(
        req.userId,
      );

      return {
        data: userWallets,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error,
      };
    }
  }
}
