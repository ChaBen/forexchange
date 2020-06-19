import { ExecutionContext } from '@nestjs/common';

import { getSwitchToWs } from './test-helpers';
import { AuthGuard } from './auth.guard';
import { StoreService } from '../modules/store/store.service';

describe('AuthGuard', () => {
  let auth: AuthGuard;
  const context: ExecutionContext = <any>{};

  beforeAll(() => {
    const storeService = new StoreService();
    auth = new AuthGuard(storeService);
    context.switchToWs = getSwitchToWs({ token: 'test' });
  });

  it('canActivate return true', () => {
    expect(auth.canActivate(context)).toBeTruthy();
  });

  describe('Auth info not found', () => {
    const ctx: ExecutionContext = <any>{};

    it('switchToWs is undefined', () => {
      ctx.switchToWs = getSwitchToWs({});
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });

  describe('Authentication failed', () => {
    const ctx: ExecutionContext = <any>{};

    it('token is wrong', () => {
      ctx.switchToWs = getSwitchToWs({ token: 'z' });
      expect(auth.canActivate(ctx)).toBeFalsy();
    });
  });
});
