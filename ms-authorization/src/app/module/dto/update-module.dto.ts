import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateModuleDto {

    @IsNumber()
    @IsNotEmpty()
    inactive: boolean;

}