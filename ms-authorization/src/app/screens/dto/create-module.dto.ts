import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ModuleEntity } from "src/app/module/module.entity";

export class CreateScreensDto {

    @ApiProperty()
    identifier: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    Module: ModuleEntity;

}