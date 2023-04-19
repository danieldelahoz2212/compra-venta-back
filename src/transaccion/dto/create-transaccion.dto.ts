import { IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";



export class CreateTransaccionDto {

    @IsInt()
    @IsPositive()
    idTipoTransaccion: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    @IsPositive()
    caja: number;

    @IsInt()
    @IsPositive()
    compra: number;

    @IsInt()
    @IsPositive()
    venta: number;

    @IsInt()
    @IsPositive()
    traslado: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
