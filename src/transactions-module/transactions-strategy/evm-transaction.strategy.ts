import { Injectable } from '@nestjs/common';
import { TransactionProvider } from './strategy';
import { WalletService } from '../../wallets-module/wallets.service';
import {
  JsonRpcProvider,
  parseEther,
  parseUnits,
  TransactionRequest,
  Wallet,
} from 'ethers';
import { Erc20Service } from '../erc20.service';
import { ITransaction } from '../../interfaces/transaction.interface';
import { supportedChains } from 'src/interfaces/supported-chains.enum';

@Injectable()
export class EvmTransactionStrategy implements TransactionProvider {
  constructor(
    private readonly walletService: WalletService,
    private readonly erc20Service: Erc20Service,
  ) {}

  public async sendTransaction(transaction: ITransaction): Promise<string> {
    const userWallet = await this.walletService.getWalletByAddress(
      transaction.from,
    );

    const provider = new JsonRpcProvider(
      'https://sepolia.infura.io/v3/326e3dc1f6824ec3983f121d2e2589bf',
    );

    const wallet = new Wallet(userWallet.enctyptedPrivateKey, provider);

    let tx: TransactionRequest = {
      to: transaction.to,
      value: parseEther(transaction.tokenAmount.toString()),
    };

    if (transaction.tokenAddress !== '0x00') {
      const tokenMetadata = await this.erc20Service.getTokenMetadata(
        transaction.tokenAddress,
        transaction.chain as supportedChains,
      );

      tx.to = transaction.tokenAddress;
      tx.value = BigInt(0);
      tx.data = await this.erc20Service.getContractEncodedData(
        'transfer',
        [
          transaction.to,
          parseUnits(
            transaction.tokenAmount.toString(),
            tokenMetadata.decimals,
          ),
        ],
        transaction.tokenAddress,
        wallet,
      );
    }

    const blockchainTransaction = await wallet.sendTransaction(tx);

    const transactionResponse = await blockchainTransaction.wait();

    if (transactionResponse.status == 1) return transactionResponse.hash;
  }
}
