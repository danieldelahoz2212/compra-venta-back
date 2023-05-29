import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateClienteDto } from "./create-cliente.dto";
import { Inventario } from "../entities";



export class CreateVentaDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;
    
    @IsNumber()
    valor: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    cliente: number|CreateClienteDto;

    @IsInt()
    @IsPositive()
    inventario: number|Inventario;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
