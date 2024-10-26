import { Controller, Get, Query, Req } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { IAuthorizationRequest } from '../interfaces/authorization-request';
import { Authorization } from '../decorators/authorization.decorator';

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get('/')
  @Authorization(true)
  public async getWalletBalance(
    @Req() req: IAuthorizationRequest,
    @Query() query: { test?: string },
  ) {
    try {
      console.log(req.userId, query);
      const userBalances = await this.balancesService.fetchUserBalances(
        req.userId,
        query.test === 'true',
      );

      return {
        data: userBalances,
        error: null,
      };
    } catch (error) {
      console.log({ error });
      return {
        data: null,
        error,
      };
    }
  }
}
