import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Permiso } from './permiso.entity';

@Entity()
export class ModuloAccione {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'bigint',
        unsigned: true
    })
    idAcciones: number;

    @Column({
        type: 'bigint',
        unsigned: true
    })
    idModulos: number;

    @OneToMany(() => Permiso, 
    permiso => permiso.id)
    permisos: Permiso;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
