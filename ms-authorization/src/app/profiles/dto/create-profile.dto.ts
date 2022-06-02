import { IsNotEmpty, IsObject, isObject, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/app/roles/role.entity';

export class CreateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsObject()
  Role: RoleEntity;

  @IsOptional()
  UserId: string
}
