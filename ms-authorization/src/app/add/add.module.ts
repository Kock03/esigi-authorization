import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddEntity } from './add.entity';
import { AddService } from './add.service';


@Module({
    imports: [TypeOrmModule.forFeature([AddEntity])],
    controllers: [],
    providers: [AddService]
})
export class AddModule { }
