import { IsDate, IsInt, IsNumber, IsOptional, IsPositive, IsString, isDate } from "class-validator";



export class CreateInventarioDto {

    @IsInt()
    @IsNumber()
    @IsPositive()
    ubicacion: number;

    @IsInt()
    @IsNumber()
    @IsPositive()
    origenCompra: number;

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    idTipoObjeto: number;

    @IsDate()
    fechaDeEntrada: Date;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
