import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreensController } from './screens.controller';
import { ScreensEntity } from './screens.entity';
import { ScreensService } from './screens.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScreensEntity])],
    controllers: [ScreensController],
    providers: [ScreensService]
})
export class ScreensModule { }
