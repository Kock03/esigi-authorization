import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ModuleEntity } from '../module/module.entity';
import { ScreensEntity } from '../screens/screens.entity';

@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String;

    @Column()
    identifier: number;

    @ManyToMany(() => ModuleEntity, (modules) => modules.Roles)
    @JoinTable()
    Modules: ModuleEntity[]

    @ManyToMany(() => ScreensEntity, (screens) => screens.Roles)
    @JoinTable()
    Screens: ScreensEntity[]

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt: Date;

    @BeforeInsert()
    InsertIdentifier() {
        this.identifier = Math.floor(Math.random() * 65536);
    }

}