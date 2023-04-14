import { IsPositive, IsString, MinLength, IsArray, IsInt, IsOptional } from "class-validator";



export class CreateParametroDto {

    @IsString()
    @MinLength(2)
    nombre_parametro: string;

    @IsString({ each: true })
    @IsArray()
    valores: string[]

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
