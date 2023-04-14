import { Entity, Column, PrimaryGeneratedColumn, ManyToOne}  from "typeorm";
import { ModuloAccione, TiposUsuario } from "./";

@Entity()
export class Permiso {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @ManyToOne(() => TiposUsuario, 
    tipoUsuario => tipoUsuario.id, 
    { nullable: false })
    tipoUsuario: TiposUsuario;

    @ManyToOne(() => ModuloAccione, 
    parametro => parametro.id, 
    { nullable: false })
    moduloAccion: ModuloAccione;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
