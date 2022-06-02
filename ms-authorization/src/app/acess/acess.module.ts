import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessEntity } from './acess.entity';
import { AcessService } from './acess.service';
import { AcessController } from './acess.controller';


@Module({
    imports: [TypeOrmModule.forFeature([AcessEntity])],
    controllers: [AcessController],
    providers: [AcessService]
})
export class AcessModule { }
