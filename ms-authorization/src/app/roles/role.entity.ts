
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AcessEntity } from '../acess/acess.entity';
import { AddEntity } from '../add/add.entity';
import { DeleteEntity } from '../delete/delete.entity';
import { ModuleEntity } from '../module/module.entity';
import { ProfilesEntity } from '../profiles/profiles.entity';
import { ScreensEntity } from '../screens/screens.entity';
import { UpdateEntity } from '../update/update.entity';

@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    identifier: number;

    @OneToMany(() => AcessEntity, Acess => Acess.Role)
    @JoinTable()
    Acess: AcessEntity[];

    @OneToMany(() => AddEntity, add => add.Role)
    @JoinTable()
    Add: AddEntity[];

    @OneToMany(() => UpdateEntity, update => update.Role)
    @JoinTable()
    Updade: UpdateEntity[];

    @OneToMany(() => DeleteEntity, del => del.Role)
    @JoinTable()
    Delete: DeleteEntity[];

    @OneToOne(() => ProfilesEntity, (profile) => profile.Role)
    Profile: ProfilesEntity;

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