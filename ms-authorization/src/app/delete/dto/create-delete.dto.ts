import { IsNotEmpty, IsOptional } from "class-validator";
import { RoleEntity } from "src/app/roles/role.entity";
import { ScreensEntity } from "src/app/screens/screens.entity";

export class CreateDeleteDto {

    @IsOptional()
    Screens: ScreensEntity[];

    @IsNotEmpty()
    Role: RoleEntity;
}