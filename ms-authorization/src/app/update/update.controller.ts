import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateService } from './update.service';

@Controller('api/v1/update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Get()
  async index() {
    return await this.updateService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.updateService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateUpdateDto) {
    return await this.updateService.store(body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.updateService.destroy(id);
  }
}
