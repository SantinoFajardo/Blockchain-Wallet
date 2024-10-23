import { Injectable } from '@nestjs/common';
import { Balances, BalancesProvider } from './balances.strategy';
import axios from 'axios';
import { formatEther, JsonRpcProvider, parseEther } from 'ethers';
import {
  supportedChains,
  SupportedEvmChains,
} from 'src/interfaces/supported-chains.enum';
import { ChainService } from '../../chain-module/chain.service';

@Injectable()
export class EvmBalancesProvider implements BalancesProvider {
  constructor(private readonly chainService: ChainService) {}

  public async getBalance(accountAddress: string) {
    const balances: Balances[] = [];
    for (const evmChain of SupportedEvmChains) {
      console.log('fetching evm balances for chain ', evmChain);
      const userBalances = await this.fetchChainBalances(
        accountAddress,
        evmChain,
      );

      console.log({ userBalances });
      balances.push(...userBalances);
    }

    return balances;
  }

  private async fetchChainBalances(
    walletAddress: string,
    chainName: supportedChains,
  ): Promise<Balances[]> {
    const chainInstance = await this.chainService.loadChain(chainName);
    const provider = new JsonRpcProvider(chainInstance.rpcUrl);

    const userBalances: Balances[] = [];

    const balances = (
      await axios.request({
        url: chainInstance.rpcUrl,
        method: 'POST',
        data: {
          id: 1,
          jsonrpc: '2.0',
          method: 'qn_getWalletTokenBalance',
          params: [{ wallet: walletAddress }],
        },
      })
    ).data?.result;

    const erc20Balances = balances?.result?.map((balance) =>
      this.formatBalances(balance, walletAddress),
    );

    if (erc20Balances?.length) userBalances.push(erc20Balances);

    const userNativeBalances = await provider.getBalance(walletAddress);

    const nativeBalance: Balances = {
      amount: Number(formatEther(userNativeBalances.toString())),
      tokenAddress: '0x00',
      account: walletAddress,
      name: chainName,
      symbol: chainInstance.label,
      url: chainInstance.icon,
    };

    if (userNativeBalances > BigInt(0)) userBalances.push(nativeBalance);

    return userBalances;
  }

  private formatBalances(balance: any, accountAddress: string): Balances {
    return {
      tokenAddress: balance.address,
      account: accountAddress,
      amount: balance.totalBalance,
      name: balance.name,
      symbol: balance.symbol,
    };
  }
}
