import { IsPositive, IsString, MinLength, IsInt, IsOptional } from "class-validator";



export class CreateValorParametroDto {
    @IsString()
    @MinLength(1)
    valor_parametro: string;

    @IsInt()
    @IsPositive()
    parametro: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
