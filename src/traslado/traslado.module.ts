import { Module } from '@nestjs/common';
import { TrasladoService } from './traslado.service';
import { TrasladoController } from './traslado.controller';

@Module({
  controllers: [TrasladoController],
  providers: [TrasladoService]
})
export class TrasladoModule {}
