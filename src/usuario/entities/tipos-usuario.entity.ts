const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
export class TiposUsuario {

    @PrimaryGeneratedColumn({ 
        type: 'bigint', 
        unsigned: true })
    id: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre: string;

    @Column({ type: 'tinyint', 
    width: 1, 
    default: 1 
})
    estado: number;
}
