import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Caja {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    // falta colocar la columna que relaciona con transacciones
    // falta colocar la columna que relaciona con usuario
    // falta colocar la columna que relaciona con almacen

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
    Fecha: Date;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
