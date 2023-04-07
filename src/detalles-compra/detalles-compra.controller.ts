import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesCompraService } from './detalles-compra.service';
import { CreateDetallesCompraDto } from './dto/create-detalles-compra.dto';
import { UpdateDetallesCompraDto } from './dto/update-detalles-compra.dto';

@Controller('detalles-compra')
export class DetallesCompraController {
  constructor(private readonly detallesCompraService: DetallesCompraService) {}

  @Post()
  create(@Body() createDetallesCompraDto: CreateDetallesCompraDto) {
    return this.detallesCompraService.create(createDetallesCompraDto);
  }

  @Get()
  findAll() {
    return this.detallesCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesCompraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesCompraDto: UpdateDetallesCompraDto) {
    return this.detallesCompraService.update(+id, updateDetallesCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesCompraService.remove(+id);
  }
}
