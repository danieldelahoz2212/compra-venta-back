import { IsInt, IsOptional, IsPositive } from "class-validator";



export class CreatePermisoDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;

    @IsInt()
    @IsPositive()
    tiposUsuario: number;

    @IsInt()
    @IsPositive()
    moduloaccion: number;


}
