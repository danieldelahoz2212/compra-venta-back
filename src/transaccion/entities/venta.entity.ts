const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class Venta {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
