import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateModuleDto {

    @IsNotEmpty()
    inactive: boolean;

}