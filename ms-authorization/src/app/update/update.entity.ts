import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../roles/role.entity';
import { ScreensEntity } from '../screens/screens.entity';

@Entity()
export class UpdateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => ScreensEntity, (screens) => screens.Update, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  Screens: ScreensEntity[];

  @OneToOne(() => RoleEntity, (role) => role.Update)
  Role: RoleEntity;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date;
}
