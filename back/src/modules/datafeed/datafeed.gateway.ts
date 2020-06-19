import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { DatafeedService } from './datafeed.service';
import { GetBarsInput, OrderInput, RealtimeInput } from '../../types';
import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { ServiceExceptionFilter } from './exception';
import { gzipRx } from '../../utils';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '../../guards';

@WebSocketGateway()
@UseGuards(AuthGuard)
@UseFilters(ServiceExceptionFilter)
export class DatafeedGateway implements OnGatewayInit, OnGatewayDisconnect {
  private server: Server;
  constructor(private readonly datafeedService: DatafeedService) {}

  handleDisconnect(client: any): void {
    client.leaveAll();
    this.datafeedService.leaveAll(client);
  }

  afterInit(server: Server): void {
    this.server = server;
    server.on('disconnect', (socket: Socket) => {
      Logger.log(
        `server.disconnect, socketId=${socket.id}`,
        'afterInit-disconnect',
      );
    });
  }

  @SubscribeMessage('symbol')
  async symbol(_: any, symbol: string): Promise<Buffer> {
    const res = await this.datafeedService.getSymbolInfo(symbol);

    return gzipRx(res).toPromise();
  }

  @SubscribeMessage('bars')
  async bars(_: any, input: GetBarsInput): Promise<Buffer> {
    const bars = await this.datafeedService.getBars(input);

    return gzipRx(bars).toPromise();
  }

  @SubscribeMessage('subscribe')
  subscribe(client: Socket, input: RealtimeInput): void {
    this.datafeedService.subscribe(input, client, this.server);
  }

  @SubscribeMessage('unsubscribe')
  unsubscribe(client: Socket, input: RealtimeInput): void {
    this.datafeedService.unsubscribe(input, client);
  }

  @SubscribeMessage('order')
  order(client: Socket, input: OrderInput): void {
    this.datafeedService.order(input, this.server);
  }
}
