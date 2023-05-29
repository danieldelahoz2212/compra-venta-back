import { OneToMany, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Compra, Venta } from "./";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn({ 
        type: 'bigint', 
        unsigned: true 
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre: string;

    @Column({ 
        type: 'varchar',
        length: 500
    })
    apellido: string;

    @Column({
        type: 'date',
    })
    fechaNacimiento: Date;

    @Column({ 
        type: 'bigint'
    })
    idTipoDocumento: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500,
    })
    numDocumento: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    direccion: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false,
    })
    numTelefono: string;

    @OneToMany(() => Compra, compra => compra.cliente)
    ventas: Compra[];

    @OneToMany(() => Venta, venta => venta.cliente)
    compra: Venta[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
