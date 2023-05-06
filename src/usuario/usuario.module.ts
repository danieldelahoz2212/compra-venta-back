import { Module,forwardRef } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario, TiposUsuario, Permiso, ModuloAccione } from './entities';
import { ParametroModule } from 'src/parametro/parametro.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [
    TypeOrmModule.forFeature([Usuario, TiposUsuario, Permiso, ModuloAccione]),
    forwardRef(() => ParametroModule),
  ],
  exports: [
    UsuarioService,
    TypeOrmModule
  ]
})
export class UsuarioModule { }
