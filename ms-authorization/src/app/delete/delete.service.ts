import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { DeleteEntity } from './delete.entity';
import { CreateDeleteDto } from './dto/create-delete.dto';

@Injectable()
export class DeleteService {

    constructor(
        @InjectRepository(DeleteEntity)
        private deleteService: Repository<DeleteEntity>
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.deleteService.find(options);
    }

    async findOneOrFail(
        conditions: FindConditions<DeleteEntity>,
        options?: FindOneOptions<DeleteEntity>,
    ) {
        options = { relations: ['Screens'] };
        try {
            return await this.deleteService.findOneOrFail(
                conditions,
                options,
            );
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateDeleteDto) {
        const del = this.deleteService.create(data);
        return await this.deleteService.save(module);
    }

    async destroy(id: string) {
        try {
            await this.deleteService.findOneOrFail({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.deleteService.softDelete({ id });
    }

}
