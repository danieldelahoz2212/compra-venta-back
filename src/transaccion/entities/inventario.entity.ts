import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Almacen, Compra, Traslado } from "./";

@Entity()
export class Inventario {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @ManyToOne(() => Almacen, (almacen) => almacen.id, { nullable: false })
    ubicacion: Almacen;

    @ManyToOne(() => Almacen, (almacen) => almacen.id, { nullable: false })
    origenCompra: Almacen;

    @OneToMany(() => Traslado, traslado => traslado.inventario)
    valores: Traslado[];

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre: string;

    @Column({
        type: 'text'
    })
    descripcion: string;

    @Column({
        type: 'bigint',
    })
    idTipoObjeto: number;

    @Column({
        type: 'date'
    })
    fechaDeEntrada: Date;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
