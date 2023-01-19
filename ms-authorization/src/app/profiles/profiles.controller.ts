import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfiles } from './interfaces/i-profiles.interfaces';
import { ProfilesService } from './profiles.service';

@Controller('authorization/api/v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Get()
  async index() {
    return await this.profilesService.findAll();
  }


  @Post('/list')
  async findProfilessListById(@Body() body: IProfiles) {
    return await this.profilesService.findProfilesListById(body.idList);
  }

  @Post()
  async store(@Body() body: CreateProfileDto) {
    return await this.profilesService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.profilesService.findOneOrFail({ id });
  }

  @Get('find/name')
  async findByName(@Query() query: any) {
    return this.profilesService.findByName(query);
  }

  @Get('/short/list/profiles')
  async shortListProfiles() {
    return await this.profilesService.shortListProfiles();
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProfileDto,
  ) {
    return await this.profilesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.profilesService.destroy(id);
  }
}
