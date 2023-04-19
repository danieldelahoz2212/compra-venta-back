import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateModuloAccionDto {
    
    @IsInt()
    @IsPositive()
    idAcciones: number;

    @IsInt()
    @IsPositive()
    idModulos: number;

    @IsInt()
    @IsPositive()
    permisos: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
