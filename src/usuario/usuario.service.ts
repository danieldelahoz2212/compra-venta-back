import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuloAccione, Permiso, TiposUsuario, Usuario } from './entities';
import { Repository } from 'typeorm';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { CreateModuloAccionDto } from './dto/create-modulo-accion.dto';
const bcrypt = require("bcrypt");

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger('UsuarioService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(TiposUsuario)
    private readonly tiposUsuarioRepository: Repository<TiposUsuario>,

    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,

    @InjectRepository(ModuloAccione)
    private readonly moduloARepository: Repository<ModuloAccione>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: bcrypt.hashSync(createUsuarioDto.password, 10),
      } as any);
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
      CodErrorUsuarioServices: 41`);
    }
  }

  async createTipoU(createTipoUsuarioDto: CreateTipoUsuarioDto) {
    try {
      const tipoUsuario = this.tiposUsuarioRepository.create(createTipoUsuarioDto);
      return await this.tiposUsuarioRepository.save(tipoUsuario)

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 52`);
    }
  }

  async createPermisos(createPermisoDto: CreatePermisoDto) {
    try {
      const { tipoUsuario, moduloAccion } = createPermisoDto;
      const tipoUsuario1 = await this.tiposUsuarioRepository.findOne({ where: { id: tipoUsuario }, });
      const moduloAccion1 = await this.moduloARepository.findOne({ where: { id: moduloAccion }, });
      const permiso = await this.permisoRepository.create({
        ...createPermisoDto,
        tipoUsuario: tipoUsuario1,
        moduloAccion: moduloAccion1
      });
      return await this.permisoRepository.save(permiso)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 75`);
    }
  }

  async createModuloAccion(createModuloAccionDto: CreateModuloAccionDto) {
    try {
      const { permisos } = createModuloAccionDto;
      const permiso = await this.permisoRepository.findOne({ where: { id: permisos } })
      const moduloAccion = await this.moduloARepository.create({
        ...createModuloAccionDto,
        permisos: permiso
      })
      return await this.moduloARepository.save(moduloAccion)
    } catch (error) {
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 90`);
    }
  }

  findAll() {
    return this.usuarioRepository.find({ relations: ["tipoUsuario"] });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ["tipoUsuario"] });
    if (!usuario)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 102`)
    return usuario;
  }

  async findOnepermiso(id: number) {
    const permiso = await this.permisoRepository.findOne({ where: { id }, relations: ["tipoUsuario", "modulo"] });
    if (!permiso)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 111`)
    return permiso;
  }

  async findOneTipo(id: number) {
    const tiposUsuario = await this.tiposUsuarioRepository.findOne({ where: { id } });
    if (!tiposUsuario)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 118`)
    return tiposUsuario;
  }

  async findOnePermiso(id: number) {
    const permiso = await this.permisoRepository.findOne({ where: { id } });
    if (!permiso)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 127`)
    return permiso;
  }

  async findOneModuloA(id: number) {
    const moduloAccion = await this.moduloARepository.findOne({ where: { id } });
    if (!moduloAccion)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 134`)
    return moduloAccion;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { id } });
      if (usuario) {
        usuario.idTipoDocunento = updateUsuarioDto.idTipoDocunento;
        usuario.numDocumento = updateUsuarioDto.numDocumento;
        usuario.nombre = updateUsuarioDto.nombre;
        usuario.apellido = updateUsuarioDto.apellido;
        usuario.numTelefono = updateUsuarioDto.numTelefono;
        usuario.direccion = updateUsuarioDto.direccion;
        usuario.email = updateUsuarioDto.email;
        usuario.password = bcrypt.hashSync(updateUsuarioDto.password, 10);
        return await this.usuarioRepository.save(usuario);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 153`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async updateTipo(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    try {
      const tiposUsuario = await this.tiposUsuarioRepository.findOne({ where: { id } });
      if (tiposUsuario) {
        tiposUsuario.nombre = updateTipoUsuarioDto.nombre;
        return await this.tiposUsuarioRepository.save(tiposUsuario)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 168`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ["tipoUsuario"] })
      if (usuario) {
        usuario.estado = 0;
        return await this.usuarioRepository.save(usuario);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 181`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removetipo(id: number) {
    try {
      const tiposUsuario = await this.tiposUsuarioRepository.findOne({ where: { id } })
      if (tiposUsuario) {
        tiposUsuario.estado = 0
        return await this.tiposUsuarioRepository.save(tiposUsuario)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 195`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removePermiso(id: number) {
    try {
      const permiso = await this.permisoRepository.findOne({ where: { id } })
      if (permiso) {
        permiso.estado = 0
        return await this.tiposUsuarioRepository.save(permiso)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 209`)
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
