import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { AddEntity } from './add.entity';
import { CreateAddDto } from './dto/create-add.dto';

@Injectable()
export class AddService {

    constructor(
        @InjectRepository(AddEntity)
        private addService: Repository<AddEntity>
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.addService.find(options);
    }

    async findOneOrFail(
        conditions: FindConditions<AddEntity>,
        options?: FindOneOptions<AddEntity>,
    ) {
        options = { relations: ['Screens'] };
        try {
            return await this.addService.findOneOrFail(
                conditions,
                options,
            );
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateAddDto) {
        const add = this.addService.create(data);
        return await this.addService.save(module);
    }

    async destroy(id: string) {
        try {
            await this.addService.findOneOrFail({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.addService.softDelete({ id });
    }

}
