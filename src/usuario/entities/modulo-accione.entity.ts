import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
