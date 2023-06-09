import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TiposUsuario } from './tipos-usuario.entity';
import { Caja } from "src/transaccion/entities";

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
    idTipoDocumento: number;

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
        length: 500
    })
    password: string;

    @ManyToOne(
        () => TiposUsuario,
        (tiposUsuario) => tiposUsuario.id,
        {
            nullable: false,
            cascade: true
        })
    tipoUsuario: TiposUsuario[];

    @OneToMany(
    () => Caja, 
    caja => caja.usuario)
    caja: Caja[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
