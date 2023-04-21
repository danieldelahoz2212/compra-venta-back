import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { CreateCajaDto } from './dto/create-caja.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateDetallesCompraDto } from './dto/create-detalles-compra.dto';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { CreateVentaDto } from './dto/create-venta.dto';

@Controller('transaccion')
export class TransaccionController {
  constructor(private readonly transaccionService: TransaccionService) {}

  @Post()
  create(@Body() createTransaccionDto: CreateTransaccionDto) {
    return this.transaccionService.create(createTransaccionDto);
  }

  @Post('createAlmacen')
  createAlmacen(@Body() createAlmacenDto: CreateAlmacenDto) {
    return this.transaccionService.createAlmacen(createAlmacenDto);
  }

  @Post('createCaja')
  createCaja(@Body() createCajaDto: CreateCajaDto) {
    return this.transaccionService.createCaja(createCajaDto);
  }

  @Post('createCliente')
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.transaccionService.createCliente(createClienteDto);
  }

  @Post('createCompra')
  createCompra(@Body() createCompraDto: CreateCompraDto) {
    return this.transaccionService.createCompra(createCompraDto);
  }

  @Post('createDetallesC')
  createDetallesCompra(@Body() createDetallesComrpaDto: CreateDetallesCompraDto) {
    return this.transaccionService.createDetallesCompra(createDetallesComrpaDto);
  }

  @Post('createInventario')
  createInventario(@Body() createInventarioDto: CreateInventarioDto) {
    return this.transaccionService.createInventario(createInventarioDto);
  }

  @Post('createTraslado')
  createTraslado(@Body() createTrasladoDto: CreateTrasladoDto) {
    return this.transaccionService.createTraslado(createTrasladoDto);
  }

  @Post('createVenta')
  createVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.transaccionService.createVenta(createVentaDto);
  }

  @Get()
  findAll() {
    return this.transaccionService.findAll();
  }

  @Get('almacen')
  findAllAlamcen() {
    return this.transaccionService.findAllAlamcen();
  }

  @Get('caja')
  findAllCaja() {
    return this.transaccionService.findAllCaja();
  }

  @Get('cliente')
  findAllCliente() {
    return this.transaccionService.findAllCliente();
  }

  @Get('compra')
  findAllCompra() {
    return this.transaccionService.findAllCompra();
  }

  @Get('detalles-compra')
  findAllDetallesCompra() {
    return this.transaccionService.findAllDetallesCompra();
  }

  @Get('inventario')
  findAllInventaio() {
    return this.transaccionService.findAllInventario();
  }

  @Get('traslado')
  findAllTraslado() {
    return this.transaccionService.findAllTraslado();
  }

  @Get('venta')
  findAllVenta() {
    return this.transaccionService.findAllVenta();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaccionService.findOne(+id);
  }

  @Get('almacen/:id')
  findOneAlmacen(@Param('id') id: string) {
    return this.transaccionService.findOneAlmacen(+id);
  }

  @Get('caja/:id')
  findOneCaja(@Param('id') id: string) {
    return this.transaccionService.findOneCaja(+id);
  }

  @Get('cliente/:id')
  findOneCliente(@Param('id') id: string) {
    return this.transaccionService.findOneCliente(+id);
  }

  @Get('compra/:id')
  findOneCompra(@Param('id') id: string) {
    return this.transaccionService.findOneCompra(+id);
  }

  @Get('detalles-compra/:id')
  findOneDetallesCompra(@Param('id') id: string) {
    return this.transaccionService.findOneDetallesCompra(+id);
  }

  @Get('traslado/:id')
  findOneTraslado(@Param('id') id: string) {
    return this.transaccionService.findOneTraslado(+id);
  }

  @Get('venta/:id')
  findOneVenta(@Param('id') id: string) {
    return this.transaccionService.findOneVenta(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransaccionDto: UpdateTransaccionDto) {
    return this.transaccionService.update(+id, updateTransaccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionService.remove(+id);
  }
}
