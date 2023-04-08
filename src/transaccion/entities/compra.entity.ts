import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compra {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'int'
    })
    precios: number;

    @Column({
        type: 'double'
    })
    cuota: number;

    @Column({
        type: 'int'
    })
    cuotaPagadas: number;

    @Column({
        type: 'int'
    })
    cuotaDeuda: number;

    @Column({
        type: 'date'
    })
    Fecha: Date;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
