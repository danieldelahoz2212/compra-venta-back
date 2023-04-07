import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn({ 
        type: 'bigint', 
        unsigned: true 
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre: string;

    @Column({ 
        type: 'varchar',
        length: 500
    })
    apellido: string;

    @Column({
        type: 'datetime'
    })
    FechaNacimiento: Date;

    @Column({ 
        type: 'bigint'
    })
    idTipoDocunento: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    numDocumento: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    direccion: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    numTelefono: string;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
