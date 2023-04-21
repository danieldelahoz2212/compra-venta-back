import { IsArray, IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



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

    @IsDateString()
    fechaDeEntrafa: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
