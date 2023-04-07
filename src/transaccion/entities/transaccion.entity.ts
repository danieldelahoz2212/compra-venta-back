import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

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

    // @Column({
    //     type: 'bigint',
    //     unsigned: true
    // })
    // idAlmacen: number;

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
