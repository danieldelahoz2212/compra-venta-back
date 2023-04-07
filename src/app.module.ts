import { Module } from '@nestjs/common';
import { PermisosModule } from './permisos/permisos.module';
import { ModuloAccionesModule } from './modulo-acciones/modulo-acciones.module';
import { CajaModule } from './caja/caja.module';
import { ComprasModule } from './compras/compras.module';
import { ClienteModule } from './cliente/cliente.module';
import { VentaModule } from './venta/venta.module';
import { TransaccionModule } from './transaccion/transaccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DetallesCompraModule } from './detalles-compra/detalles-compra.module';
import { TiposUsuarioModule } from './tipos-usuario/tipos-usuario.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenModule } from './almacen/almacen.module';
import { InventarioModule } from './inventario/inventario.module';
//import { ParametroValorPModule } from './parametro-valor-p/parametro-valor-p.module';
import { TrasladoModule } from './traslado/traslado.module';



@Module({
  imports: [ 
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DATABESE_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    PermisosModule, 

    ModuloAccionesModule,

    CajaModule,

    ComprasModule, 

    ClienteModule,

    VentaModule,

    TransaccionModule,

    UsuarioModule, 
    
    DetallesCompraModule, 
    
    TiposUsuarioModule,

    AlmacenModule,

    InventarioModule,


    TransaccionModule,

    TrasladoModule
  ],
})
export class AppModule {}
