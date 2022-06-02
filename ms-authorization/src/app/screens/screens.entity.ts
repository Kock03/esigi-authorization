import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AcessEntity } from "../acess/acess.entity";
import { AddEntity } from "../add/add.entity";
import { DeleteEntity } from "../delete/delete.entity";
import { ModuleEntity } from "../module/module.entity";
import { RoleEntity } from "../roles/role.entity";
import { UpdateEntity } from "../update/update.entity";

@Entity()
export class ScreensEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identifier: number;

    @Column()
    name: string;

    @Column()
    inactive: boolean;

    @ManyToOne(() => ModuleEntity, module => module.Screens)
    Module: ModuleEntity;

    @ManyToOne(() => AcessEntity, acess => acess.Screens)
    Acess: AcessEntity;

    @ManyToOne(() => AddEntity, add => add.Screens)
    Add: AddEntity;

    @ManyToOne(() => UpdateEntity, update => update.Screens)
    Update: UpdateEntity;

    @ManyToOne(() => DeleteEntity, del => del.Screens)
    Delete: DeleteEntity;

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