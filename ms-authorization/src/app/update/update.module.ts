import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateEntity } from './update.entity';
import { UpdateService } from './update.service';


@Module({
    imports: [TypeOrmModule.forFeature([UpdateEntity])],
    controllers: [],
    providers: [UpdateService]
})
export class UpdateModule { }
