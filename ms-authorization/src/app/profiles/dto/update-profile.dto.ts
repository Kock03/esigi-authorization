import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/app/roles/role.entity';


export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  Role: RoleEntity;

  @IsOptional()
  UserId: string
}
