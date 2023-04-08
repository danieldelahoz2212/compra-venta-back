import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra, DetallesCompra, Venta, Traslado, Transaccion, Inventario, Caja } from './entities';

@Module({
  controllers: [TransaccionController],
  providers: [TransaccionService],
  imports: [
    TypeOrmModule.forFeature([Transaccion, Traslado, Venta, Compra, DetallesCompra, Caja, Inventario])
  ],
  exports: [
    TransaccionService,
    TypeOrmModule
  ]
})
export class TransaccionModule { }