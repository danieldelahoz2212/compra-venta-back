import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./parametro.entity";

@Entity()
export class ValorParamtero {
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
    valor_parametro: string;

    @ManyToOne(type => Parametro, parametro=>parametro.id)
    idParamtero: Parametro;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
