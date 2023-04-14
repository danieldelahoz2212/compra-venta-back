import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateUsuarioDto {
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    estado: number;
}
