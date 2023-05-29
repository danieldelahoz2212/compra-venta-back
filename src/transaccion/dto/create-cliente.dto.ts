import { IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateClienteDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;
    
    @IsDate()
    fechaNacimiento: Date;
    
    @IsInt()
    @IsNumber()
    @IsPositive()
    idTipoDocumento: number;

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
