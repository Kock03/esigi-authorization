import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteEntity } from './delete.entity';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';


@Module({
    imports: [TypeOrmModule.forFeature([DeleteEntity])],
    controllers: [DeleteController],
    providers: [DeleteService]
})
export class DeleteModule { }
