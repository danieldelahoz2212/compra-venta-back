import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuloAccionesService } from './modulo-acciones.service';
import { CreateModuloAccioneDto } from './dto/create-modulo-accione.dto';
import { UpdateModuloAccioneDto } from './dto/update-modulo-accione.dto';

@Controller('modulo-acciones')
export class ModuloAccionesController {
  constructor(private readonly moduloAccionesService: ModuloAccionesService) {}

  @Post()
  create(@Body() createModuloAccioneDto: CreateModuloAccioneDto) {
    return this.moduloAccionesService.create(createModuloAccioneDto);
  }

  @Get()
  findAll() {
    return this.moduloAccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduloAccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuloAccioneDto: UpdateModuloAccioneDto) {
    return this.moduloAccionesService.update(+id, updateModuloAccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduloAccionesService.remove(+id);
  }
}
