import { PartialType } from '@nestjs/mapped-types';
import { CreateModuloAccioneDto } from './create-modulo-accione.dto';

export class UpdateModuloAccioneDto extends PartialType(CreateModuloAccioneDto) {}
