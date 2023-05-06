import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class CreateVentaDto {
    @IsInt()
    @IsPositive()
    @IsOptional()
    transaccionId: number;
    
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
