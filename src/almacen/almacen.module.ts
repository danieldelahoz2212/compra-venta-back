import { Module } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AlmacenController } from './almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacen } from './entities';

@Module({
  controllers: [AlmacenController],
  providers: [AlmacenService],
  imports:[
    TypeOrmModule.forFeature([Almacen])
  ],
  exports:[
    AlmacenService,
    TypeOrmModule
  ]
})
export class AlmacenModule {}
