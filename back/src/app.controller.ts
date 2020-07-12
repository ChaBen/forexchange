import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return 'hello word'
  }
}
