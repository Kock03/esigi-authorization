import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleService } from './module.service';

@Controller('/api/v1/module')
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
