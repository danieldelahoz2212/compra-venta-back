import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposUsuarioService } from './tipos-usuario.service';
import { CreateTiposUsuarioDto } from './dto/create-tipos-usuario.dto';
import { UpdateTiposUsuarioDto } from './dto/update-tipos-usuario.dto';

@Controller('tipos-usuario')
export class TiposUsuarioController {
  constructor(private readonly tiposUsuarioService: TiposUsuarioService) {}

  @Post()
  create(@Body() createTiposUsuarioDto: CreateTiposUsuarioDto) {
    return this.tiposUsuarioService.create(createTiposUsuarioDto);
  }

  @Get()
  findAll() {
    return this.tiposUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposUsuarioDto: UpdateTiposUsuarioDto) {
    return this.tiposUsuarioService.update(+id, updateTiposUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposUsuarioService.remove(+id);
  }
}
