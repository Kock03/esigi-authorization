import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeleteEntity } from './delete.entity';
import { DeleteService } from './delete.service';


@Module({
    imports: [TypeOrmModule.forFeature([DeleteEntity])],
    controllers: [],
    providers: [DeleteService]
})
export class DeleteModule { }
