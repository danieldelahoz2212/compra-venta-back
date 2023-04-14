import { Module } from '@nestjs/common';
import { TransaccionModule } from './transaccion/transaccion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametroModule } from './parametro/parametro.module';
require('dotenv').config();


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
      synchronize: false,//false,
      autoLoadEntities: true,
    }),
    TransaccionModule,
    UsuarioModule,
    ParametroModule, 
  ],
})
export class AppModule {}
