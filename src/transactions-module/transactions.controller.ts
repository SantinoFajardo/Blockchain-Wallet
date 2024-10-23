import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SendTransactionDTO } from '../dto/send-transaction.dto';
import { TransactionsService } from './transactions.service';
import { Authorization } from '../decorators/authorization.decorator';
import { IAuthorizationRequest } from '../interfaces/authorization-request';
import { WalletService } from 'src/wallets-module/wallets.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly walletsService: WalletService,
  ) {}

  @Get('/')
  @Authorization(true)
  public async getTransactionsHistory(@Req() req: IAuthorizationRequest) {
    try {
      const userWallets = await this.walletsService.getOrCreateWallets(
        req.userId,
      );
      const userAddresses = userWallets.map((wallet) => wallet.address);

      const userTransactions =
        await this.transactionService.getUserTransactionsHistory(userAddresses);

      return {
        data: userTransactions,
        error: null,
      };
    } catch (error) {
      return {
        error,
        data: null,
      };
    }
  }

  @Post('/send')
  public async sendTransaction(@Body() body: SendTransactionDTO) {
    try {
      const transaction = await this.transactionService.createTransaction({
        ...body,
        status: 'PENDING',
      });

      const transactionHash =
        await this.transactionService.sendTransaction(transaction);

      return {
        data: transactionHash,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }
}
