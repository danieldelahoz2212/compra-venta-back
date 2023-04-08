import { Module } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { ParametroController } from './parametro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parametro, ValorParamtero } from './entities';

@Module({
  controllers: [ParametroController],
  providers: [ParametroService],
  imports: [
    TypeOrmModule.forFeature([Parametro, ValorParamtero])
  ],
  exports: [
    ParametroService,
    TypeOrmModule
  ]
})
export class ParametroModule {}
