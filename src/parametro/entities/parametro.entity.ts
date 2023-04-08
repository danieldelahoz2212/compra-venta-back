import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ValorParamtero } from "./valorParamtero.entity";

@Entity()
export class Parametro {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        length: 500
    })
    nombre_parametro: string;

    @OneToMany(() => ValorParamtero, valor => valor.idParamtero)
    valores: ValorParamtero[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
