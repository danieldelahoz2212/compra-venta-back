import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateVentaDto {

    @IsNumber()
    valor: number;

    @IsInt()
    @IsPositive()
    cliente: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
