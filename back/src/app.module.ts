import { Module } from '@nestjs/common';
import { DatafeedModule } from './modules/datafeed/datafeed.module';

@Module({
  imports: [DatafeedModule],
})
export class AppModule {}
