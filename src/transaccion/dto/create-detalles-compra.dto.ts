import { IsDate, IsDecimal, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";



export class CreateDetallesCompraDto {

    @IsInt()
    @IsNumber()
    @IsPositive()
    idTipoDPago: number;

    @IsDecimal()
    @IsNumber()
    @IsPositive()
    valorPagado: number;

    @IsDate()
    fecha: Date;

    @IsInt()
    @IsPositive()
    @IsOptional()
    compra: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
