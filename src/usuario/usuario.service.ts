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
const bcrypt = require("bcrypt");;

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
      const permiso = this.permisoRepository.create(createPermisoDto);
      return await this.permisoRepository.save(permiso)

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`no se pudo registrar usaurio. 
    CodErrorUsuarioServices: 70`);
    }
  }

  findAll() {
    return this.usuarioRepository.find({ relations: ["tipoUsuario"] });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations:["tipoUsuario"]});
    if (!usuario)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 65`)
    return usuario;
  }

  async findOneTipo(id: number) {
    const tiposUsuario = await this.tiposUsuarioRepository.findOne({ where: { id } });
    if (!tiposUsuario)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 65`)
    return tiposUsuario;
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
    CodErrorParametroServices: 84`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async updateTipo(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    try {
      const tiposUsuario = await this.tiposUsuarioRepository.findOne({where:{ id }});
      if (tiposUsuario) {
        tiposUsuario.nombre = updateTipoUsuarioDto.nombre;
        return await this.tiposUsuarioRepository.save(tiposUsuario)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
    CodErrorParametroServices: 99`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const usuario = await this.usuarioRepository.findOne({ where: { id }, relations:["tipoUsuario"] })
      if (usuario) {
        usuario.estado = 0;
        return await this.usuarioRepository.save(usuario);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 102`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removetipo(id:number){
    try {
      const tiposUsuario = await this.tiposUsuarioRepository.findOne({where:{id}})
      if(tiposUsuario){
        tiposUsuario.estado = 0
        return await this.tiposUsuarioRepository.save(tiposUsuario)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 140`)
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
