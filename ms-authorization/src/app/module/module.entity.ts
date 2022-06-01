import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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