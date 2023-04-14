import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Permiso, Usuario } from "./";

@Entity()
export class TiposUsuario {

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

    @OneToMany(() => Permiso, 
    permiso => permiso.tipoUsuario)
    permisos: Permiso[];

    @OneToMany(() => Usuario, 
    usuario => usuario.tipoUsuario)
    usuarios: Usuario[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
