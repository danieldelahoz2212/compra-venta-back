import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class TiposUsuario {

    @PrimaryGeneratedColumn({ 
        type: 'bigint', 
        unsigned: true })
    id: number;

    @Column('text',{
        unique: true,
    })
    nombre: string;

    @Column({ type: 'tinyint', 
    width: 1, 
    default: 1 
})
    estado: number;
}
