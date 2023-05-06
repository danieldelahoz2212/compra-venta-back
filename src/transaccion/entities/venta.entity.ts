import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Inventario, Cliente, Transaccion,  } from "./";

@Entity()
export class Venta {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'double'
    })
    valor: number;

    @OneToOne(() => Inventario, { nullable: false })
    @JoinColumn()
    inventario: Inventario;

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { nullable: false })
    cliente: Cliente;

    @OneToOne(() => Transaccion, { nullable: false })
    @JoinColumn()
    transacciones: Transaccion;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
