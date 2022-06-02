import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateScreensDto } from './dto/create-screen.dto';
import { UpdateScreensDto } from './dto/update-screen.dto';
import { ScreensService } from './screens.service';

@Controller('api/v1/screens')
export class ScreensController {
    constructor(private readonly screensService: ScreensService) { }

    @Get()
    async index() {
        return await this.screensService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.screensService.findOneOrFail({ id });
    }

    @Post()
    async store(@Body() body: CreateScreensDto) {
        return await this.screensService.store(body);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateScreensDto,
    ) {
        return await this.screensService.update(id, body);
    }

    @Delete(':id')
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.screensService.destroy(id);
    }

}
