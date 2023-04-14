import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ValorParametro } from "./valorParametro.entity";

@Entity()
export class Parametro {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    nombre_parametro: string;

    @OneToMany(() => ValorParametro, 
    valor => valor.parametro, 
    { cascade: true })
    valores: ValorParametro[];

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
