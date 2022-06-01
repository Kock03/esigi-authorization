import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessEntity } from './acess.entity';
import { AcessService } from './acess.service';


@Module({
    imports: [TypeOrmModule.forFeature([AcessEntity])],
    controllers: [],
    providers: [AcessService]
})
export class AcessModule { }
