import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "../roles/role.entity";
import { ScreensEntity } from "../screens/screens.entity";

@Entity()
export class ModuleEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identifier: number;

    @Column()
    name: string;

    @Column()
    inactive: boolean;

    @OneToMany(() => ScreensEntity, screens => screens.Module)
    Screens: ScreensEntity[];

    @ManyToMany(() => RoleEntity, (roles) => roles.Modules)
    Roles: RoleEntity[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;

}