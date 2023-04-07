import { Injectable } from '@nestjs/common';
import { CreateModuloAccioneDto } from './dto/create-modulo-accione.dto';
import { UpdateModuloAccioneDto } from './dto/update-modulo-accione.dto';

@Injectable()
export class ModuloAccionesService {
  create(createModuloAccioneDto: CreateModuloAccioneDto) {
    return 'This action adds a new moduloAccione';
  }

  findAll() {
    return `This action returns all moduloAcciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduloAccione`;
  }

  update(id: number, updateModuloAccioneDto: UpdateModuloAccioneDto) {
    return `This action updates a #${id} moduloAccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduloAccione`;
  }
}
