import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { CreateValorParametroDto } from './create-valor-parametro.dto';
// import { PartialType } from '@nestjs/mapped-types';

export class UpdateValorParametroDto implements CreateValorParametroDto {
    @IsString()
    @MinLength(1)
    valor_parametro: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    parametro: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}

