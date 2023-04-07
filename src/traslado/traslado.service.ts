import { Injectable } from '@nestjs/common';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { UpdateTrasladoDto } from './dto/update-traslado.dto';

@Injectable()
export class TrasladoService {
  create(createTrasladoDto: CreateTrasladoDto) {
    return 'This action adds a new traslado';
  }

  findAll() {
    return `This action returns all traslado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} traslado`;
  }

  update(id: number, updateTrasladoDto: UpdateTrasladoDto) {
    return `This action updates a #${id} traslado`;
  }

  remove(id: number) {
    return `This action removes a #${id} traslado`;
  }
}
