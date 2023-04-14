import { IsArray, IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateInventarioDto {

    @IsString()
    ubicacion: string;

    @IsString()
    origenCompra: string;

    @IsString({ each: true })
    @IsArray()
    valores: string[];

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
