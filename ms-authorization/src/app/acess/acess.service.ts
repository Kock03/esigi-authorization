import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { AcessEntity } from './acess.entity';
import { CreateAcessDto } from './dto/create-acess.dto';

@Injectable()
export class AcessService {

    constructor(
        @InjectRepository(AcessEntity)
        private acessService: Repository<AcessEntity>
    ) { }

    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.acessService.find(options);
    }

    async findOneOrFail(
        conditions: FindConditions<AcessEntity>,
        options?: FindOneOptions<AcessEntity>,
    ) {
        options = { relations: ['Screens'] };
        try {
            return await this.acessService.findOneOrFail(
                conditions,
                options,
            );
        } catch {
            throw new NotFoundException();
        }
    }

    async store(data: CreateAcessDto) {
        const acess = this.acessService.create(data);
        return await this.acessService.save(module);
    }

    async destroy(id: string) {
        try {
            await this.acessService.findOneOrFail({ id });
        } catch {
            throw new NotFoundException();
        }
        return await this.acessService.softDelete({ id });
    }

}
