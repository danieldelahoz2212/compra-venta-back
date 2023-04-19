import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { CreateModuloAccionDto } from './dto/create-modulo-accion.dto';

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

  @Post('createPermiso')
  createPermiso(@Body() createPermisoDto: CreatePermisoDto) {
    return this.usuarioService.createPermisos(createPermisoDto);
  }

  @Post('createModuloA')
  createModuloAccion(@Body() createModuloAccion: CreateModuloAccionDto) {
    return this.usuarioService.createModuloAccion(createModuloAccion);
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

  @Get('getP/:id')
  findOnePermiso(@Param('id') id: string) {
    return this.usuarioService.findOnePermiso(+id);
  }

  @Get('getM/:id')
  findOneModuloA(@Param('id') id: string) {
    return this.usuarioService.findOneModuloA(+id);
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

  @Delete('deleteP:id')
  removePermiso(@Param('id') id: string) {
    return this.usuarioService.removePermiso(+id);
  }
}
