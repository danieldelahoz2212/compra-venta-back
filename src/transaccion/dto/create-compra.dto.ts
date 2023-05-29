import { IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";



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

    @IsDate()
    fecha: Date;

    @IsInt()
    @IsPositive()
    @IsOptional()
    cliente: number|CreateClienteDto;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
