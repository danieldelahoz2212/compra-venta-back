import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Almacen, Inventario, Transaccion } from "./";

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

    @OneToOne(() => Transaccion, { nullable: false })
    @JoinColumn()
    transacciones: Transaccion;

    @Column({
        type: 'date'
    })
    fecha: Date;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
