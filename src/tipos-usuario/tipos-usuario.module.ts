import { Module } from '@nestjs/common';
import { TiposUsuarioService } from './tipos-usuario.service';
import { TiposUsuarioController } from './tipos-usuario.controller';

@Module({
  controllers: [TiposUsuarioController],
  providers: [TiposUsuarioService]
})
export class TiposUsuarioModule {}
