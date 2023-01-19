import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AddService } from './add.service';
import { CreateAddDto } from './dto/create-add.dto';

@Controller('/authorization/api/v1/add')
export class AddController {
  constructor(private readonly addService: AddService) {}

  @Get()
  async index() {
    return await this.addService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateAddDto) {
    return await this.addService.store(body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addService.destroy(id);
  }
}
