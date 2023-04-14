import { CreateTipoUsuarioDto } from './create-tipo-usuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTipoUsuarioDto extends PartialType(CreateTipoUsuarioDto) {}
