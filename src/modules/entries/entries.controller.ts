import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('entries')
export class EntriesController {
  @Post()
  public create() {}

  @Get(':id')
  public findById() {}

  @Put(':id')
  public update() {}

  @Delete(':id')
  public delete() {}
}
