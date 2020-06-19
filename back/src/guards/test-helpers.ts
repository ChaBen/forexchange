import { WsArgumentsHost } from '@nestjs/common/interfaces';

export function getSwitchToWs(params: {
  token?: string;
}): jest.Mock<WsArgumentsHost, []> {
  return jest.fn(() => {
    return <WsArgumentsHost>{
      getClient: () => {
        return {
          handshake: {
            query: {
              token: params.token,
            },
          },
        };
      },
    };
  });
}
