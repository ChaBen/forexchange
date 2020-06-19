import { Module } from '@nestjs/common';
import { DatafeedGateway } from './datafeed.gateway';
import { DatafeedService } from './datafeed.service';
import { StoreService } from '../store/store.service';

@Module({
  providers: [DatafeedGateway, StoreService, DatafeedService],
})
export class DatafeedModule {}
