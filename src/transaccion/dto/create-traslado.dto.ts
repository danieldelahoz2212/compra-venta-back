import { IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";



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
    @IsOptional()
    inventario: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
