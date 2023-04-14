import { Injectable } from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario, Transaccion } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionService {

constructor(
  @InjectRepository(Inventario)
  private readonly inventarioRepository: Repository<Inventario>,

  @InjectRepository(Transaccion)
  private readonly transaccionRepository: Repository<Transaccion>,

  

  ){ }

  async create(createTransaccionDto: CreateTransaccionDto) {
    try {
      
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all transaccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaccion`;
  }

  update(id: number, updateTransaccionDto: UpdateTransaccionDto) {
    return `This action updates a #${id} transaccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccion`;
  }
}
