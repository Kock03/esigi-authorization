import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AcessService } from './acess.service';
import { CreateAcessDto } from './dto/create-acess.dto';

@Controller('api/v1/acess')
export class AcessController {
  constructor(private readonly acessService: AcessService) {}

  @Get()
  async index() {
    return await this.acessService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.acessService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateAcessDto) {
    return await this.acessService.store(body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.acessService.destroy(id);
  }
}
