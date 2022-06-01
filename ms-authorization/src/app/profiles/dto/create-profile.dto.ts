import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/app/roles/role.entity';

export class CreateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  Role: RoleEntity;

  @IsOptional()
  UserId: string
}
