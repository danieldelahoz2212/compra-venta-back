import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post('create')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('createTipo')
  createTipoU(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.usuarioService.createTipoU(createTipoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Get('get/:id')
  findOneTipo(@Param('id') id: string) {
    return this.usuarioService.findOneTipo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Patch('update-value/:id')
  updateTipo(@Param('id') id: number, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return this.usuarioService.updateTipo(+id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
