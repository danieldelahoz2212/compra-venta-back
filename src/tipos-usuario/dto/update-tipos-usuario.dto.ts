import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposUsuarioDto } from './create-tipos-usuario.dto';

export class UpdateTiposUsuarioDto extends PartialType(CreateTiposUsuarioDto) {}
