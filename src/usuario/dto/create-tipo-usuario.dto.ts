import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateTipoUsuarioDto {

    @IsString()
    nombre:string;

    // @IsInt({each: true})
    // @IsPositive()
    // @IsArray()
    // permisos:number[];

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}