import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaccion, Cliente, DetallesCompra, Inventario } from './';

@Entity()
export class Compra {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'double'
    })
    valorCompra: number;

    @Column({
        type: 'double'
    })
    valorPagado: number;

    @Column({
        type: 'int'
    })
    cuota: number;

    @Column({
        type: 'int'
    })
    cuotaPagadas: number;

    @Column({
        type: 'date'
    })
    Fecha: Date;

    @OneToOne(() => Inventario, { nullable: false })
    @JoinColumn()
    inventario: Inventario;

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { nullable: false })
    cliente: Cliente;

    @OneToMany(() => Transaccion, transaccion => transaccion, { nullable: false })
    transacciones: Transaccion[];

    @OneToMany(() => DetallesCompra, detallesCompra => detallesCompra.compra)
    detalles: DetallesCompra[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
