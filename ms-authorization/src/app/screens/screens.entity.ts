import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ModuleEntity } from "../module/module.entity";
import { RoleEntity } from "../roles/role.entity";

@Entity()
export class ScreensEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identifier: number;

    @Column()
    name: string;

    @Column()
    inactive: boolean
        ;

    @ManyToOne(() => ModuleEntity, module => module.Screens)
    Module: ModuleEntity;

    @ManyToMany(() => RoleEntity, (roles) => roles.Screens)
    Roles: RoleEntity[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;

    @BeforeInsert()
    InsertIdentifier() {
        this.identifier = Math.floor(Math.random() * 65536);
    }

}