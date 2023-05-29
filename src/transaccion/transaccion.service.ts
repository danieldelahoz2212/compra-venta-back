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
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CreateDetallesCompraDto } from './dto/create-detalles-compra.dto';
import { UpdateDetallesCompraDto } from './dto/update-detalles-compra.dto';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { UpdateTrasladoDto } from './dto/update-traslado.dto';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ParametroService } from 'src/parametro/parametro.service';

@Injectable()
export class TransaccionService {

  private readonly logger = new Logger('TransaccionService');

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

    private readonly parametroService: ParametroService
  ) { }

  async create(createTransaccionDto: CreateTransaccionDto, createCajaDto: CreateCajaDto, createTransaccion: CreateCompraDto | CreateVentaDto | CreateTrasladoDto) {
    try {
      const typeTransaccion = await this.parametroService.valorParametroRepository.findOne({ where: { id: createTransaccionDto.idTipoTransaccion } });

      const transaccion = await this.transaccionRepository.create({
        ...createTransaccionDto,
        fecha: new Date (),
      });
      const resultTransaccion = await this.transaccionRepository.save(transaccion);
      const caja = await this.createCaja({ ...createCajaDto, transaccionId: +resultTransaccion.id })
      let idCliente:number|CreateClienteDto;
      if ((typeof createTransaccion.cliente)==='number') {
        idCliente=createTransaccion.cliente;
      }else if((typeof createTransaccion.cliente)==='object'){
        const cliente = await  this.createCliente(createTransaccion.cliente as CreateClienteDto);
        await this.clienteRepository.save(cliente)
        idCliente= cliente.id
      }
      
      

      let operacion;
      let resultOperacion;
      switch (typeTransaccion.valor_parametro) {
        case 'Compra':
          operacion = await this.createCompra({ ...createTransaccion, transaccionId: transaccion.id, cliente:idCliente} as CreateCompraDto);
          break;
        case 'Venta':
          const {inventario}= createTransaccion as CreateVentaDto;
            const inventarios = await this.inventarioRepository.findOne({ where: { id: inventario as number} });
          operacion = await this.createVenta({ ...createTransaccion, transaccionId: transaccion.id, cliente:idCliente,inventario:inventarios } as CreateVentaDto);
          break;
        case 'Traslado':
          operacion = await this.createTraslado({ ...createTransaccion, transaccionId: transaccion.id } as CreateTrasladoDto);
          break;
      }

      if (!operacion) {
        new Error('Ocurrio un problema al registrar la transaccion');
      }
      
      const resultCaja = await this.cajaRepository.save(caja);
      switch (typeTransaccion.valor_parametro) {
        case 'Compra':
          resultOperacion = await this.compraRepository.save(operacion);
          break;
        case 'Venta':
          resultOperacion = await this.ventaRepository.save(operacion);
          break;
        case 'Traslado':
          resultOperacion = await this.trasladoRepository.save(operacion);
          break;
      }

      return {
        resultTransaccion,
        resultCaja,
        resultOperacion
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 121`);
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
      const usuario1 = await this.usuarioRepository.findOne({ where: { id: usuario } });
      const almacen1 = await this.almacenRepository.findOne({ where: { id: almacen } });
      const transaccionId = await this.transaccionRepository.findOne({ where: { id: createCajaDto.transaccionId } });

      const caja = await this.cajaRepository.create({
        ...createCajaDto,
        usuario: usuario1,
        almacen: almacen1,
        fecha: new Date(),
        transaccion: transaccionId,
      });
      return caja
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`no se pudo registrar en caja. 
    CodErrorUsuarioServices: 150`);
    }
  }

  async createCliente(createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.clienteRepository.create({
        ...createClienteDto,
      })
      return cliente
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usuario. 
    CodErrorUsuarioServices: 162`);
    }
  }

  async createCompra(createCompraDto: CreateCompraDto) {
    try {
      const { cliente } = createCompraDto
      const clientes = await this.clienteRepository.findOne({ where: { id: cliente as number} });
      const compra = await this.compraRepository.create({
        ...createCompraDto,
        cliente: clientes
      })
      return compra;
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 177`);
    }
  }

  async createDetallesCompra(createDetallesCompraDto: CreateDetallesCompraDto) {
    try {
      const { compra } = createDetallesCompraDto
      const compras = await this.detallesCRepository.findOne({ where: { id: compra } });
      const detallesCompra = await this.detallesCRepository.create({
        ...createDetallesCompraDto,
        compra: compras
      })
      return await this.detallesCRepository.save(detallesCompra)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 193`);
    }
  }

  async createInventario(createInventarioDto: CreateInventarioDto) {
    try {
      const { ubicacion, origenCompra } = createInventarioDto
      const ubicaciones = await this.almacenRepository.findOne({ where: { id: ubicacion } });
      const origenCompras = await this.almacenRepository.findOne({ where: { id: origenCompra } })
      const inventario = this.inventarioRepository.create({
        ...createInventarioDto,
        ubicacion: ubicaciones,
        origenCompra: origenCompras
      })
      return await this.inventarioRepository.save(inventario)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 209`);
    }
  }

  async createTraslado(createTrasladoDto: CreateTrasladoDto) {
    try {
      delete createTrasladoDto.cliente;
      const { almacenDestino, almacenOrigen, inventario } = createTrasladoDto
      const almacenDestinos = await this.almacenRepository.findOne({ where: { id: almacenDestino } });
      const almacenOrigenes = await this.almacenRepository.findOne({ where: { id: almacenOrigen } });
      const inventarios = await this.inventarioRepository.findOne({ where: { id: inventario } })
      const traslado = this.trasladoRepository.create({
        ...createTrasladoDto,
        almacenDestino: almacenDestinos,
        almacenOrigen: almacenOrigenes,
        inventario: inventarios
      })
      return traslado
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 228`);
    }
  }

  async createVenta(createVentaDto: CreateVentaDto) {
    try {
      const { cliente, inventario } = createVentaDto
      const clientes = await this.clienteRepository.findOne({ where: { id: cliente as number} });
      const transaccionId = await this.transaccionRepository.findOne({ where: { id: createVentaDto.transaccionId } });
      const venta = this.ventaRepository.create({
        ...createVentaDto,
        cliente: clientes,
        inventario: inventario as Inventario,
        transacciones:transaccionId,
      } )
      return venta;
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 243`);
    }
  }

  findAll() {
    return this.transaccionRepository.find({ relations: ["compra", "venta", "traslado"] });
  }

  findAllAlamcen() {
    return this.almacenRepository.find({});
  }

  findAllCaja() {
    return this.cajaRepository.find({ relations: ["usuario", "almacen"] });
  }

  findAllCliente() {
    return this.clienteRepository.find({});
  }

  findAllCompra() {
    return this.compraRepository.find({ relations: ["cliente"] });
  }

  findAllDetallesCompra() {
    return this.detallesCRepository.find({ relations: ["compra"] });
  }

  async findAllInventario() {
    return this.inventarioRepository.find({ relations: ["ubicacion", "origenCompra"], where: {estado: 3}});
  }

  findAllTraslado() {
    return this.trasladoRepository.find({ relations: ["almacenDestino", "almacenOrigen", "inventario"] });
  }

  findAllVenta() {
    return this.ventaRepository.find({ relations: ["inventario",'cliente'] });
  }

  async findOne(id: number) {
    const transaccion = await this.transaccionRepository.findOne({ where: { id }, relations: ["compra", "venta", "traslado"] });
    if (!transaccion)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 287`)
    return transaccion;
  }

  async findOneAlmacen(id: number) {
    const almacen = await this.almacenRepository.findOne({ where: { id } });
    if (!almacen)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 296`)
    return almacen;
  }

  async findOneCaja(id: number) {
    const caja = await this.cajaRepository.findOne({ where: { id }, relations: ["usuario", "almacen"] });
    if (!caja)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 304`)
    return caja;
  }

  async findOneCliente(idTipoDocumento: number,numDocumento: string) {
    const cliente = await this.clienteRepository.findOne({ where: { idTipoDocumento,numDocumento} });
    if (!cliente)
      throw new NotFoundException(`id ${numDocumento} de parametro no encontrado.
    CodErrorParametroServices: 141`)
    return cliente;
  }

  async findOneCompra(id: number) {
    const compra = await this.compraRepository.findOne({ where: { id }, relations: ["cliente"] });
    if (!compra)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 194`)
    return compra;
  }

  async findOneDetallesCompra(id: number) {
    const detallesCompra = await this.detallesCRepository.findOne({ where: { id }, relations: ["compra"] });
    if (!detallesCompra)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 194`)
    return detallesCompra;
  }

  async findOneInventario(id: number) {
    const inventario = await this.inventarioRepository.findOne({ where: { id }, relations: ["usuario", "almacen"] });
    if (!inventario)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 194`)
    return inventario;
  }

  async findOneTraslado(id: number) {
    const traslado = await this.inventarioRepository.findOne({ where: { id }, relations: ["almacenDestino", "almacenOrigen", "inventario"] });
    if (!traslado)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 194`)
    return traslado;
  }

  async findOneVenta(id: number) {
    const venta = await this.ventaRepository.findOne({ where: { id }, relations: ["cliente"] });
    if (!venta)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 194`)
    return venta;
  }

  async update(id: number, updateTransaccionDto: UpdateTransaccionDto) {
    try {
      const transaccion = await this.transaccionRepository.findOne({ where: { id } });
      if (transaccion) {
        transaccion.idTipoTransaccion = updateTransaccionDto.idTipoTransaccion;                      
        // transaccion.fecha = new Date(updateTransaccionDto.fecha);
        return await this.transaccionRepository.save(transaccion);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 155`)
    }
  }

  async updateAlmacen(id: number, updateAlmacenDto: UpdateAlmacenDto) {
    try {
      const almacen = await this.almacenRepository.findOne({ where: { id } });
      if (almacen) {
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
      const caja = await this.cajaRepository.findOne({ where: { id } });
      if (caja) {
        // caja.idTipoTransaccion = updateCajaDto.idTipoTransaccion;
        caja.valor = updateCajaDto.valor;
        const fechaActual = new Date();
        caja.fecha = fechaActual;
        return await this.cajaRepository.save(caja);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 188`)
    }
  }

  async updateCliente(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteRepository.findOne({ where: { id } });
      if (cliente) {
        cliente.nombre = updateClienteDto.nombre;
        cliente.apellido = updateClienteDto.apellido;
        cliente.fechaNacimiento = new Date (updateClienteDto.fechaNacimiento);
        cliente.idTipoDocumento = updateClienteDto.idTipoDocumento;
        cliente.numDocumento = updateClienteDto.numDocumento;
        cliente.direccion = updateClienteDto.numTelefono;
        return await this.clienteRepository.save(cliente);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 188`)
    }
  }

  async updateCompra(id: number, updateCompraDto: UpdateCompraDto) {
    try {
      const compra = await this.compraRepository.findOne({ where: { id } });
      if (compra) {
        compra.valorCompra = updateCompraDto.valorCompra;
        compra.valorPagado = updateCompraDto.valorPagado;
        compra.cuota = updateCompraDto.cuota;
        compra.cuotaPagadas = updateCompraDto.cuotaPagadas;
        compra.fecha = new Date(updateCompraDto.fecha);
        return await this.compraRepository.save(compra);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 280`)
    }
  }

  async updateDetallesCompra(id: number, updateDetallesCompraDto: UpdateDetallesCompraDto) {
    try {
      const detallesCompra = await this.detallesCRepository.findOne({ where: { id } });
      if (detallesCompra) {
        detallesCompra.idTipoDPago = updateDetallesCompraDto.idTipoDPago;
        detallesCompra.valorPagado = updateDetallesCompraDto.valorPagado;
        detallesCompra.fecha = new Date(updateDetallesCompraDto.fecha);
        return await this.compraRepository.save(detallesCompra);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 280`)
    }
  }

  async updateInventario(id: number, updateInventarioDto: UpdateInventarioDto) {
    try {
      const inventario = await this.inventarioRepository.findOne({ where: { id } });
      if (inventario) {
        inventario.nombre = updateInventarioDto.nombre;
        inventario.descripcion = updateInventarioDto.descripcion;
        inventario.idTipoObjeto = updateInventarioDto.idTipoObjeto;
        inventario.fechaDeEntrada = new Date(updateInventarioDto.fechaDeEntrada);
        return await this.compraRepository.save(inventario);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 280`)
    }
  }

  async updateTraslado(id: number, updateTrasladoDto: UpdateTrasladoDto) {
    try {
      const traslado = await this.trasladoRepository.findOne({ where: { id } });
      if (traslado) {
        traslado.fecha = new Date(updateTrasladoDto.fecha);
        return await this.trasladoRepository.save(traslado);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 280`)
    }
  }

  async updateVenta(id: number, updateVentaDto: UpdateVentaDto) {
    try {
      const venta = await this.ventaRepository.findOne({ where: { id } });
      if (venta) {
        venta.valor = updateVentaDto.valor;
        return await this.trasladoRepository.save(venta);
      }
    } catch (error) {
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 280`)
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
        return await this.cajaRepository.save(caja);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeCliente(id: number) {
    try {
      const cliente = await this.clienteRepository.findOne({ where: { id } })
      if (cliente) {
        cliente.estado = 0;
        return await this.clienteRepository.save(cliente);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeCompra(id: number) {
    try {
      const compra = await this.compraRepository.findOne({ where: { id } })
      if (compra) {
        compra.estado = 0;
        return await this.clienteRepository.save(compra);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeInventario(id: number) {
    try {
      const inventario = await this.inventarioRepository.findOne({ where: { id } })
      if (inventario) {
        inventario.estado = 0;
        return await this.clienteRepository.save(inventario);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeTraslado(id: number) {
    try {
      const traslado = await this.trasladoRepository.findOne({ where: { id } })
      if (traslado) {
        traslado.estado = 0;
        return await this.clienteRepository.save(traslado);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 228`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeVenta(id: number) {
    try {
      const venta = await this.ventaRepository.findOne({ where: { id } })
      if (venta) {
        venta.estado = 0;
        return await this.ventaRepository.save(venta);
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
