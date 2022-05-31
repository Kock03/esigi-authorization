import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions, FindManyOptions } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly rolesRepository: Repository<RoleEntity>,
    ) { }

    // async findAll() {
    //     const rolesWithProfiles = await this.rolesRepository
    //         .createQueryBuilder('roles')
    //         .leftJoinAndSelect('roles.profiles', 'profiles')
    //         .getMany();

    //     return rolesWithProfiles;
    // }


    async findAll() {
        const options: FindManyOptions = {
            order: { createdAt: 'DESC' },
        };
        return await this.rolesRepository.find(options);
    }

    async findOneOrFail(
        conditions: FindConditions<RoleEntity>,
        options?: FindOneOptions<RoleEntity>,
    ) {
        options = { relations: ['Modules', 'Screens'] };
        try {
            return await this.rolesRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async store(data: CreateRoleDto) {
        const role = this.rolesRepository.create(data);
        return await this.rolesRepository.save(role);
    }

    async update(id: string, data: UpdateRoleDto) {
        try {
            const role = await this.rolesRepository.findOneOrFail({
                id,
            });
        } catch {
            throw new NotFoundException();
        }

        return await this.rolesRepository.save({ id: id, ...data });

    }

    async destroy(id: string) {
        await this.rolesRepository.findOneOrFail({ id });
        this.rolesRepository.softDelete({ id });
    }
}