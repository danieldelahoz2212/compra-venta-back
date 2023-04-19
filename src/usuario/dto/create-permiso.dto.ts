import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreatePermisoDto {

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;

    @IsInt()
    @IsPositive()
    tipoUsuario: number;

    @IsInt()
    @IsPositive()
    moduloAccion: number;
}
