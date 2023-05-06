import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";



export class CreateCompraDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;
    
    @IsNumber()
    valorCompra: number;

    @IsNumber()
    valorPagado: number;

    @IsInt()
    @IsNumber()
    @IsPositive()
    cuota: number;

    @IsInt()
    @IsNumber()
    @IsPositive()
    cuotaPagadas: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    cliente: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
