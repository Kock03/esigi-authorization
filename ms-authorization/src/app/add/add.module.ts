import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddEntity } from './add.entity';
import { AddService } from './add.service';
import { AddController } from './add.controller';


@Module({
    imports: [TypeOrmModule.forFeature([AddEntity])],
    controllers: [AddController],
    providers: [AddService]
})
export class AddModule { }
