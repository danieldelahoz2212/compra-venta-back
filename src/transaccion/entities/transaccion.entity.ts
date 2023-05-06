import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Caja, Compra, Traslado, Venta } from "./";
@Entity()
export class Transaccion {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'bigint'
    })
    idTipoTransaccion: number;

    @Column({
        type: 'datetime'
    })
    fecha: Date;

    @OneToOne(() => Caja, (caja) => caja.transaccion)
    caja: Caja;

    // @ManyToOne(() => Compra, (compra) => compra.id)
    // compra: Compra;

    // @ManyToOne(() => Venta, (venta) => venta.transacciones)
    // venta: Venta;

    // @ManyToOne(() => Traslado, (traslado) => traslado.transacciones)
    // traslado: Traslado;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}

