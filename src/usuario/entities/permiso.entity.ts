const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class Permiso {
    
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
