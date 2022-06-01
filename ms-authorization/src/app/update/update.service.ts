import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateEntity } from './update.entity';

@Injectable()
export class UpdateService {

    constructor(
        @InjectRepository(UpdateEntity)
        private updateService: Repository<UpdateEntity>
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.updateService.find(options);
    }

    async findOneOrFail(
        conditions: FindConditions<UpdateEntity>,
        options?: FindOneOptions<UpdateEntity>,
    ) {
        options = { relations: ['Screens'] };
        try {
            return await this.updateService.findOneOrFail(
                conditions,
                options,
            );
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateUpdateDto) {
        const Update = this.updateService.create(data);
        return await this.updateService.save(module);
    }

    async destroy(id: string) {
        try {
            await this.updateService.findOneOrFail({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.updateService.softDelete({ id });
    }

}
