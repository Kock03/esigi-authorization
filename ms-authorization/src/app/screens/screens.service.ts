import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateScreensDto } from './dto/create-screen.dto';
import { UpdateScreensDto } from './dto/update-screen.dto';
import { ScreensEntity } from './screens.entity';
@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(ScreensEntity)
    private screensService: Repository<ScreensEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      relations: ['Module'],
    };
    return await this.screensService.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<ScreensEntity>,
    options?: FindOneOptions<ScreensEntity>,
  ) {
    try {
      return await this.screensService.findOneOrFail(conditions, options);
    } catch (error){
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateScreensDto) {
    const screen = this.screensService.create(data);
    return await this.screensService.save(screen);
  }

  async update(id: string, data: UpdateScreensDto) {
    try {
      const screen = await this.screensService.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }
    return await this.screensService.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.screensService.findOneOrFail({ id });
    this.screensService.softDelete({ id });
  }
}
