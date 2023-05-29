import { IsDate, IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";



export class CreateTrasladoDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    almacenDestino: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    almacenOrigen: number;

    @IsInt()
    @IsPositive()
    inventario: number;

    @IsDate()
    fecha: Date;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    cliente: undefined;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
