import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./parametro.entity";

@Entity()
export class ValorParametro {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 500
    })
    valor_parametro: string;

    @ManyToOne(() => Parametro, parametro => parametro.valores, { nullable: false })
    parametro: Parametro;

    @Column({
        type: 'tinyint',
        width: 1,
        default: 1
    })
    estado: number;
}
