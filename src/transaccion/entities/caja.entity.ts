import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Almacen, Transaccion } from "./";
import { Usuario } from "src/usuario/entities";

@Entity()
export class Caja {

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
        type: 'double'
    })
    valor: number;

    @Column({
        type: 'datetime'
    })
    fecha: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.id, { nullable: false })
    usuario: Usuario;

    @ManyToOne(() => Almacen, (almacen) => almacen.id, { nullable: false })
    almacen: Almacen;

    @OneToOne(() => Transaccion, (transaccion) => transaccion.caja, { nullable: false })
    @JoinColumn()
    transaccion: Transaccion;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
