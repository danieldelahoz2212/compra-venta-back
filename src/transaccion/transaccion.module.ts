import { Module,forwardRef } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra, DetallesCompra, Venta, Traslado, Transaccion, Inventario, Caja, Almacen, Cliente } from './entities';
import { Usuario } from 'src/usuario/entities';
import { ParametroModule } from 'src/parametro/parametro.module';

@Module({
  controllers: [TransaccionController],
  providers: [TransaccionService],
  imports: [
    TypeOrmModule.forFeature([Transaccion,Traslado, Venta, Compra, DetallesCompra, Caja, Inventario, Almacen, Cliente, Usuario]),
    forwardRef(() => ParametroModule),
  ],
  exports: [
    TransaccionService,
    TypeOrmModule
  ]
})
export class TransaccionModule { }
