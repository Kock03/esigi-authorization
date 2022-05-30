import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ScreensEntity } from "src/app/screens/screens.entity";

export class CreateModuleDto {

    @IsNumber()
    @IsNotEmpty()
    identifier: number;

    @IsString()
    @IsNotEmpty()
    name: string;

}