import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ModuleEntity } from "src/app/module/module.entity";

export class CreateScreensDto {

    @IsNumber()
    @IsNotEmpty()
    identifier: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    Module: ModuleEntity;

}