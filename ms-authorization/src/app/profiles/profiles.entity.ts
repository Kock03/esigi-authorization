import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../roles/role.entity';

@Entity({ name: 'profiles' })
export class ProfilesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: String;

  @Column({ nullable: true })
  UserId: string;

  @OneToOne(() => RoleEntity, {
    cascade: ['insert', 'update', 'remove'],
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  Role: RoleEntity;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: Date;
}
