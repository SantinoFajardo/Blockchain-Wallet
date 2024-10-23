import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get(':id')
  public async getWalletBalance(@Param('id') id: string) {
    try {
      const userBalances = await this.balancesService.fetchUserBalances(id);

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
