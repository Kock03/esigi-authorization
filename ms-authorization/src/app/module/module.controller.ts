import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleService } from './module.service';


@Controller('api/v1/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) { }

  
  @Get()
  async index() {
    return await this.moduleService.findAll();
  }

  
  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moduleService.findOneOrFail({ id });
  }

  @Get('find/name')
  async findByName(@Query() query: any) {
    return this.moduleService.findByName(query);
  }

  @Get('screen/list')
  async screenModule() {
    return this.moduleService.screenModule();
  }

  @Get('list/active')
  async findActive() {
    return await this.moduleService.findActive();
  }


  @Post()
  async store(@Body() body: CreateModuleDto) {
    return await this.moduleService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateModuleDto,
  ) {
    return await this.moduleService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moduleService.destroy(id);
  }
}
