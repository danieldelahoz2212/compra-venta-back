import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";



export class CreateUsuarioDto {

    @IsInt()
    @IsNumber()
    @IsPositive()
    idTipoDocunento: number;

    @IsString()
    numDocumento: string;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    @IsOptional()
    numTelefono: string;

    @IsString()
    @IsOptional()
    direccion: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    @IsNumber()
    @IsPositive()
    tipoUsuario: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
