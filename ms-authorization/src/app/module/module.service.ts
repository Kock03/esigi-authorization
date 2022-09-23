import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Like,
  Repository,
} from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleEntity } from './module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleService: Repository<ModuleEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      relations: ['Screens'],
    };
    return await this.moduleService.find(options);
  }

  async screenModule() {
    return await this.moduleService
      .createQueryBuilder('modules')
      .leftJoinAndSelect('modules.Screens', 'Screens')
      .where('Screens.name is not null')
      .getMany();
  }

  findByName(query): Promise<ModuleEntity[]> {
    return this.moduleService.find({
      select: ['id', 'name'],
      where: [{ name: Like(`${query.name}%`), inactive: false }],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<ModuleEntity>,
    options?: FindOneOptions<ModuleEntity>,
  ) {
    options = { relations: ['Screens'] };
    try {
      return await this.moduleService.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async findActive() {
    return await this.moduleService
      .createQueryBuilder('modules')
      .where('modules.inactive =false')
      .getMany();
  }

  async store(data: CreateModuleDto) {
    const module = this.moduleService.create(data);
    return await this.moduleService.save(module);
  }

  async update(id: string, data: UpdateModuleDto) {
    try {
      const module = await this.moduleService.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }
    return await this.moduleService.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.moduleService.findOneOrFail({ id });
    await this.moduleService.softDelete({ id });
  }
}
