import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateScreensDto {

    @IsNumber()
    @IsNotEmpty()
    inactive: boolean;

}