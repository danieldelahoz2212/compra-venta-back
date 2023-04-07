import { Module } from '@nestjs/common';
import { DetallesCompraService } from './detalles-compra.service';
import { DetallesCompraController } from './detalles-compra.controller';

@Module({
  controllers: [DetallesCompraController],
  providers: [DetallesCompraService]
})
export class DetallesCompraModule {}
