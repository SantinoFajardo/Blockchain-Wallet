import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import { supportedChains } from '../interfaces/supported-chains.enum';
import { ChainService } from '../chain-module/chain.service';

export const ERC20ABI = [
  'function transfer(address recipient, uint256 amount) external returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
];

@Injectable()
export class Erc20Service {
  constructor(private readonly chainService: ChainService) {}

  public async getContractEncodedData(
    functionName: string,
    params: any[],
    tokenAddress: string,
    wallet: Wallet,
  ) {
    const erc20Contract = new Contract(tokenAddress, ERC20ABI, wallet);
    return erc20Contract.interface.encodeFunctionData(functionName, params);
  }

  public async getTokenMetadata(tokenAddress: string, chain: supportedChains) {
    const chainInstance = await this.chainService.loadChain(chain);
    const provider = new JsonRpcProvider(chainInstance.rpcUrl);

    const tokenContract = new Contract(tokenAddress, ERC20ABI, provider);
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();

    return { name, symbol, decimals };
  }

  public async getAccountTokenBalance(
    tokenAddress: string,
    account: string,
    chain: supportedChains,
  ) {
    const chainInstance = await this.chainService.loadChain(chain);
    const provider = new JsonRpcProvider(chainInstance.rpcUrl);

    const tokenContract = new Contract(tokenAddress, ERC20ABI, provider);
    const accountTokenBalance = await tokenContract.balanceOf(account);

    return accountTokenBalance;
  }
}
