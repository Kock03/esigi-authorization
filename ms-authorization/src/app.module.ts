import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { ModuleModule } from './app/module/module.module';
import { RoleModule } from './app/roles/roles.module';
import { ScreensModule } from './app/screens/screens.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions
  ), ModuleModule, ScreensModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
