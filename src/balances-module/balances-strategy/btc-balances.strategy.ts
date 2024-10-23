import { Injectable } from '@nestjs/common';
import { Balances, BalancesProvider } from './balances.strategy';
import axios from 'axios';

@Injectable()
export class BtcBalancesProvider implements BalancesProvider {
  async getBalance(accountAddress: string): Promise<Balances[]> {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/main/addrs/${accountAddress}/balance`,
    );
    if (response.data.balance <= 0) return [];

    return [
      {
        amount: response.data.balance / 1e8,
        account: accountAddress,
        tokenAddress: 'BTC',
        name: 'BITCOIN',
        symbol: 'BTC',
        url: 'https://www.criptonoticias.com/wp-content/uploads/2023/10/BC_Logo_.png',
      },
    ];
  }
}
