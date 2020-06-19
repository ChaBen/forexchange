import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ServiceException } from '../modules/datafeed/exception';
import { StoreService } from '../modules/store/store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly storeService: StoreService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake.query['token'];

    if (!token) {
      throw new ServiceException('Please enter token.');
    }
    const res = await this.storeService.verifyToken(token);
    if (!res) {
      throw new ServiceException('Authentication failed.');
    }

    return true;
  }
}
