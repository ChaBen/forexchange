import { ArgumentsHost } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

import { ServiceException } from './service-exception';
import { ServiceExceptionFilter } from './service-exception-filter';

describe('ServiceExceptionFilter', () => {
  let serviceExceptionFilter: ServiceExceptionFilter;
  const host = <ArgumentsHost>{};

  beforeAll(() => {
    serviceExceptionFilter = new ServiceExceptionFilter();
    host.switchToWs = jest.fn(() => {
      return <WsArgumentsHost>{
        getClient: () => {
          return { emit: (event: string, res: any) => {} };
        },
      };
    });
  });

  it('catch', () => {
    expect(
      serviceExceptionFilter.catch(new ServiceException('test'), host),
    ).toBeUndefined();
  });
});
