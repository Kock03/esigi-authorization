import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './module.controller';
import { ModuleEntity } from './module.entity';
import { ModuleService } from './module.service';

@Module({
    imports: [TypeOrmModule.forFeature([ModuleEntity])],
    controllers: [ModuleController],
    providers: [ModuleService]
})
export class ModuleModule { }
