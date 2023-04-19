import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Almacen,
  Caja,
  Cliente,
  Compra,
  DetallesCompra,
  Inventario,
  Transaccion,
  Traslado,
  Venta
} from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionService {

  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,

    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,

    @InjectRepository(Almacen)
    private readonly almacenRepository: Repository<Almacen>,

    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,

    @InjectRepository(DetallesCompra)
    private readonly detallesCRepository: Repository<DetallesCompra>,

    @InjectRepository(Traslado)
    private readonly trasladoRepository: Repository<Traslado>,

    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,

  ) { }

  async create(createTransaccionDto: CreateTransaccionDto) {
    try {
      const { caja, compra, venta, traslado } = createTransaccionDto;
      const caja1 = await this.cajaRepository.findOne({where:{id: caja}});
      const compra1 = await this.compraRepository.findOne({where:{id: compra}});
      const venta1 = await this.ventaRepository.findOne({where:{id: venta}});
      const traslado1 = await this.transaccionRepository.findOne({where:{id: traslado}});
      const transaccion = await this.transaccionRepository.create({
        ...createTransaccionDto,
        caja: caja1,
        compra: compra1,
        venta: venta1,
        traslado: traslado1
      });
      return await this.transaccionRepository.save(transaccion)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 69`);
    }
  }

  findAll() {
    return this.transaccionRepository.find({ relations: ["caja", "compra", "venta", "traslado"] });
  }

  async findOne(id: number) {
    const transaccion = await this.transaccionRepository.findOne({ where: { id }, relations: ["caja", "compra", "venta", "traslado"] });
    if (!transaccion)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 81`)
    return transaccion;
  }

  async update(id: number, updateTransaccionDto: UpdateTransaccionDto) {
    try {
      const transaccion = await this.transaccionRepository.findOne({ where:{ id }});
      if (transaccion){
      //  transaccion.
        return transaccion;
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 81`)
    }
  }

  async remove(id: number) {
    try {
      const transaccion = await this.transaccionRepository.findOne({ where: { id } })
      if (transaccion) {
        transaccion.estado = 0;
        return await this.transaccionRepository.save(transaccion);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 93`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'unexpected error, check servr logs',
    );
  }
}
