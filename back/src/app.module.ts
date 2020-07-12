import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatafeedModule } from './modules/datafeed/datafeed.module';

@Module({
  imports: [DatafeedModule],
  controllers: [AppController]
})
export class AppModule {}
