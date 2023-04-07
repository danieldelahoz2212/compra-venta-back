import { Injectable } from '@nestjs/common';
import { CreateTiposUsuarioDto } from './dto/create-tipos-usuario.dto';
import { UpdateTiposUsuarioDto } from './dto/update-tipos-usuario.dto';

@Injectable()
export class TiposUsuarioService {
  create(createTiposUsuarioDto: CreateTiposUsuarioDto) {
    return 'This action adds a new tiposUsuario';
  }

  findAll() {
    return `This action returns all tiposUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposUsuario`;
  }

  update(id: number, updateTiposUsuarioDto: UpdateTiposUsuarioDto) {
    return `This action updates a #${id} tiposUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposUsuario`;
  }
}
