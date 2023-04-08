import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Almacenes' })
export class Almacen {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    NIT: string;


    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    nombre: string;


    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    direccion: string;


    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    telefono: string;


    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    id_tipoAlmacen: string

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
