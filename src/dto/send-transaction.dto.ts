import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class SendTransactionDTO {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  tokenAmount: number;

  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @IsString()
  @IsNotEmpty()
  chain: string;

  @IsBoolean()
  isTest: boolean;
}
