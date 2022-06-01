import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "../roles/role.entity";
import { ScreensEntity } from "../screens/screens.entity";

@Entity()
export class DeleteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    Use: Boolean;

    @OneToMany(() => ScreensEntity, screens => screens.Delete)
    Screens: ScreensEntity[];

    @ManyToOne(() => RoleEntity, (role) => role.Delete)
    Role: RoleEntity;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;

}