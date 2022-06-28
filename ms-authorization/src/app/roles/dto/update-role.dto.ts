import { IsOptional } from "class-validator";
import { AcessEntity } from "src/app/acess/acess.entity";
import { AddEntity } from "src/app/add/add.entity";
import { DeleteEntity } from "src/app/delete/delete.entity";
import { ModuleEntity } from "src/app/module/module.entity";
import { ScreensEntity } from "src/app/screens/screens.entity";
import { UpdateEntity } from "src/app/update/update.entity";


export class UpdateRoleDto {

    @IsOptional()
    Modules: ModuleEntity[];

    @IsOptional()
    Screens: ScreensEntity[];

    @IsOptional()
    Acess: AcessEntity[];

    @IsOptional()
    Add: AddEntity[];

    @IsOptional()
    Update: UpdateEntity[];
    
    @IsOptional()
    Delete: DeleteEntity[];
}
