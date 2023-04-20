import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateClienteDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsDateString()
    fechaNacimiento: string;
    
    @IsInt()
    @IsNumber()
    @IsPositive()
    idTipoDocunento: number;

    @IsString()
    numDocumento: string;

    @IsString()
    direccion: string;

    @IsString()
    numTelefono: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
