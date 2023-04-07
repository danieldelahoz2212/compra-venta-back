import { PartialType } from '@nestjs/mapped-types';
import { CreateTrasladoDto } from './create-traslado.dto';

export class UpdateTrasladoDto extends PartialType(CreateTrasladoDto) {}
