import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ServiceException } from './service-exception';

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient();
    const errorRespsonse = {
      name: exception.name,
      message: exception.message,
    };
    client.emit('exception', errorRespsonse);
  }
}
