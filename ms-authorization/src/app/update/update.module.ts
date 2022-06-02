import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateEntity } from './update.entity';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';


@Module({
    imports: [TypeOrmModule.forFeature([UpdateEntity])],
    controllers: [UpdateController],
    providers: [UpdateService]
})
export class UpdateModule { }
