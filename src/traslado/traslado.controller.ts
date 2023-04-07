import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { CreateTrasladoDto } from './dto/create-traslado.dto';
import { UpdateTrasladoDto } from './dto/update-traslado.dto';

@Controller('traslado')
export class TrasladoController {
  constructor(private readonly trasladoService: TrasladoService) {}

  @Post()
  create(@Body() createTrasladoDto: CreateTrasladoDto) {
    return this.trasladoService.create(createTrasladoDto);
  }

  @Get()
  findAll() {
    return this.trasladoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trasladoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrasladoDto: UpdateTrasladoDto) {
    return this.trasladoService.update(+id, updateTrasladoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trasladoService.remove(+id);
  }
}
