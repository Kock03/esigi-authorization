import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateScreensDto {

    @IsNotEmpty()
    inactive: boolean;

}