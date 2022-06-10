import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { AcessEntity } from "src/app/acess/acess.entity";
import { AddEntity } from "src/app/add/add.entity";
import { DeleteEntity } from "src/app/delete/delete.entity";
import { ModuleEntity } from "src/app/module/module.entity";
import { ScreensEntity } from "src/app/screens/screens.entity";
import { UpdateEntity } from "src/app/update/update.entity";

export class CreateRoleDto {

    @ApiProperty()
    identifier: number;

    @IsNotEmpty()
    Acess: AcessEntity;

    @IsNotEmpty()
    Add: AddEntity;

    @IsNotEmpty()
    Update: UpdateEntity;

    @IsNotEmpty()
    Delete: DeleteEntity;
}
