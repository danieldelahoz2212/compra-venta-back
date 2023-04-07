import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TiposUsuario } from "../../tipos-usuario/entities/tipos-usuario.entity"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;


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
    nombre: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    apellido: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    numTelefono: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    direccion: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    email: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    password: string;

    @OneToMany(
        () => TiposUsuario,
        (TiposUsuario) => TiposUsuario.id,
        { cascade: true }
    )
    idTipoUsuario: number;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
