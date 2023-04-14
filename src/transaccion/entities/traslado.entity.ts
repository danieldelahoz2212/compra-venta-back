import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Almacen, Caja, Inventario, Transaccion } from "./";

@Entity()
export class Traslado {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @ManyToOne(() => Almacen, (almacen) => almacen.id, { nullable: false })
    almacenDestino: Almacen;

    @ManyToOne(() => Almacen, (almacen) => almacen.id, { nullable: false })
    almacenOrigen: Almacen;

    @ManyToOne(() => Inventario, (inventario) => inventario.id, { nullable: false })
    inventario: Inventario;

    @OneToMany(() => Transaccion, transaccion => transaccion, { nullable: false })
    transacciones: Transaccion[];

    @Column({
        type: 'datetime'
    })
    fecha: Date;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
