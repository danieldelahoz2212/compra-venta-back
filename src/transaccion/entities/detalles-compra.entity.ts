import { Compra } from "./";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DetallesCompra {
    
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({ 
        type: 'bigint'
    })
    idTipoDPago: number;

    @Column({
        type: 'decimal',
    })
    valorPagado: number;

    @Column({
        type: 'datetime'
    })
    fecha: Date;

    @ManyToOne(() => Compra,(compra) => compra.id,{ nullable: false } )
    compra: Compra;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
