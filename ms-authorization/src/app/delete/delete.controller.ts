import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DeleteService } from './delete.service';
import { CreateDeleteDto } from './dto/create-delete.dto';

@Controller('/authorization/api/v1/delete')
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @Get()
  async index() {
    return await this.deleteService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateDeleteDto) {
    return await this.deleteService.store(body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteService.destroy(id);
  }
}
