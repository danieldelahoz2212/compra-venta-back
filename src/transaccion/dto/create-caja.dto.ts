import { IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";



export class CreateCajaDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;

    @IsNumber()
    valor: number;

    @IsDate()
    fecha: Date;

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
