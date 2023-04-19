import { Module } from '@nestjs/common';
import { TransaccionModule } from './transaccion/transaccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametroModule } from './parametro/parametro.module';
import { DatasourceConfig } from './config/data.source';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,

    }),
    TypeOrmModule.forRoot({
      ...DatasourceConfig
    }),
    TransaccionModule,
    UsuarioModule,
    ParametroModule,
  ],
})
export class AppModule { }
