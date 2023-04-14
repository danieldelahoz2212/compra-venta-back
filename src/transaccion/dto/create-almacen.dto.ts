import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateAlmacenDto {

    @IsString()
    NIT: string;

    @IsString()
    nombre: string;

    @IsString()
    direccion: string;

    @IsString()
    telefono: string;

    @IsInt()
    @IsPositive()
    id_tipoAlmacen: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
