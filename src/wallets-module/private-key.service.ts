import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivateKeyService {
  public encryptKey(key: string): string {
    return key;
  }

  public async decryptKey() {}
}
