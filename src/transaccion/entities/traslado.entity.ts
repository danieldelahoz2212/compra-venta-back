const {Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class Traslado {
    
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;
    
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
