import { IsDate, IsInt, IsOptional, IsPositive } from "class-validator";



export class CreateTransaccionDto {

    @IsInt()
    @IsPositive()
    idTipoTransaccion: number;

    @IsDate()
    fecha: String;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}   
