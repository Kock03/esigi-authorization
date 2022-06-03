import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions, Like, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesEntity } from './profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesEntity)
    private readonly profilesRepository: Repository<ProfilesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
        order: { createdAt: 'DESC' },
    };
    return await this.profilesRepository.find(options);
}

  async findOneOrFail(
    conditions: FindConditions<ProfilesEntity>,
    options?: FindOneOptions<ProfilesEntity>,
  ) {
    options = { relations: ['Role'] };
    try {
      return await this.profilesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findByName(query): Promise<ProfilesEntity[]> {
    return this.profilesRepository.find({
      select:[ 'id','name'],
      where: [
        { name: Like(`${query.name}%`) },]
    });
  }

  async shortListProfiles(){
    return await this.profilesRepository.find({
      select: ['id', 'name'],
    });
  }

  async store(data: CreateProfileDto) {
    const profile = this.profilesRepository.create(data);
    return await this.profilesRepository.save(profile);

  }

  async update(id: string, data: UpdateProfileDto) {
    const profile = await this.findOneOrFail({ id });
    this.profilesRepository.merge(profile, data);
    return await this.profilesRepository.save(profile);
  }

  async destroy(id: string) {
    await this.profilesRepository.findOneOrFail({ id });
    this.profilesRepository.softDelete({ id });
  }
}
