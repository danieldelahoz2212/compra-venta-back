import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";



export class CreateCajaDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;

    @IsNumber()
    valor: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    @IsNumber()
    @IsPositive()
    usuario: number;

    @IsInt()
    @IsNumber()
    @IsPositive()
    almacen: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
