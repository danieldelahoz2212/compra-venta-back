import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Caja, Inventario, Traslado } from './';

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
        type: 'bigint',
        unique: true,
    })
    id_tipoAlmacen: number

    @OneToMany(() => Caja, caja => caja.almacen)
    caja: Caja[];

    @OneToMany(() => Inventario, inventario => inventario.ubicacion)
    inventario: Inventario[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
