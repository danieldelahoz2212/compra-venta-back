import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Inventario {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'bigint',
        unique:true,
    })
    ubicacion: number;

    @Column({
        type: 'bigint'
    })
    origenCompra: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre: string;

    @Column({ 
        type: 'bigint',
        unique:true,
    })
    idTipoDPago: number;

    @Column({
        type: 'date'
    })
    fechaDeEntrada: Date;

    @Column({
        type: 'text',
        length: 500
    })
    descripcion: string;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
