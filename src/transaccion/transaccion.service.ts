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
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { CreateCajaDto } from './dto/create-caja.dto';
import { Usuario } from 'src/usuario/entities';
import { UpdateCajaDto } from './dto/update-caja.dto';

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

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

  ) { }

  async create(createTransaccionDto: CreateTransaccionDto) {
    try {
      const { compra, venta, traslado } = createTransaccionDto;
      const compra1 = await this.compraRepository.findOne({where:{id: compra}});
      const venta1 = await this.ventaRepository.findOne({where:{id: venta}});
      const traslado1 = await this.transaccionRepository.findOne({where:{id: traslado}});
      const transaccion = await this.transaccionRepository.create({
        ...createTransaccionDto,
        compra: compra1,
        venta: venta1,
        traslado: traslado1
      });
      return await this.transaccionRepository.save(transaccion)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 76`);
    }
  }

  async createAlmacen(createAlmacenDto: CreateAlmacenDto) {
    try {
      const almacen = await this.almacenRepository.create({
        ...createAlmacenDto
      })
      return await this.almacenRepository.save(almacen);
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 88`);
    }
  }

  async createCaja(createCajaDto: CreateCajaDto) {
    try {
      const { usuario, almacen } = createCajaDto;
      const usuario1 = await this.usuarioRepository.findOne({where:{id:usuario }});
      const almacen1 = await this.almacenRepository.findOne({where:{id:almacen}});
      const transaccion = await this.cajaRepository.create({
        ...createCajaDto,
        usuario: usuario1,
        almacen: almacen1
      });
      return await this.cajaRepository.save(transaccion)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 104`);
    }
  }

  findAll() {
    return this.transaccionRepository.find({ relations: ["compra", "venta", "traslado"] });
  }

  findAllAlamcen() {
    return this.almacenRepository.find({});
  }

  findAllCaja() {
    return this.cajaRepository.find({relations:["usuario", "almacen"]});
  }

  async findOne(id: number) {
    const transaccion = await this.transaccionRepository.findOne({ where: { id }, relations: ["compra", "venta", "traslado"] });
    if (!transaccion)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 124`)
    return transaccion;
  }

  async findOneAlmacen(id: number) {
    const almacen = await this.almacenRepository.findOne({ where: { id }});
    if (!almacen)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 132`)
    return almacen;
  }

  async findOneCaja(id: number) {
    const caja = await this.cajaRepository.findOne({ where: { id }, relations:["usuario", "almacen"] });
    if (!caja)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 141`)
    return caja;
  }

  async update(id: number, updateTransaccionDto: UpdateTransaccionDto) {
    try {
      const transaccion = await this.transaccionRepository.findOne({ where:{ id }});
      if (transaccion){
        transaccion.idTipoTransaccion = updateTransaccionDto.idTipoTransaccion;
        const fechaActual = new Date();
        transaccion.fecha = fechaActual
        return await this.transaccionRepository.save(transaccion);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 155`)
    }
  }

  async updateAlmacen(id: number, updateAlmacenDto: UpdateAlmacenDto) {
    try {
      const almacen = await this.almacenRepository.findOne({ where:{ id }});
      if (almacen){
        almacen.NIT = updateAlmacenDto.NIT;
        almacen.nombre = updateAlmacenDto.nombre;
        almacen.direccion = updateAlmacenDto.direccion;
        almacen.telefono = updateAlmacenDto.telefono;
        almacen.id_tipoAlmacen = updateAlmacenDto.id_tipoAlmacen;
        return await this.almacenRepository.save(almacen);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 172`)
    }
  }

  async updateCaja(id: number, updateCajaDto: UpdateCajaDto) {
    try {
      const caja = await this.cajaRepository.findOne({ where:{ id }});
      if (caja){
        caja.idTipoTransaccion = updateCajaDto.idTipoTransaccion;
        caja.valor = updateCajaDto.valor;
        const fechaActual = new Date();
        caja.fecha = fechaActual
        return await this.almacenRepository.save(caja);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 188`)
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
      CodErrorParametroServices: 200`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeAlmacen(id: number) {
    try {
      const almacen = await this.almacenRepository.findOne({ where: { id } })
      if (almacen) {
        almacen.estado = 0;
        return await this.almacenRepository.save(almacen);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 214`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeCaja(id: number) {
    try {
      const caja = await this.cajaRepository.findOne({ where: { id } })
      if (caja) {
        caja.estado = 0;
        return await this.almacenRepository.save(caja);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
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
