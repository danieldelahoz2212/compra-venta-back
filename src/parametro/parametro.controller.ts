import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { CreateParametroDto } from './dto/create-parametro.dto';
import { UpdateParametroDto } from './dto/update-parametro.dto';
import { CreateValorParametroDto } from './dto/create-valor-parametro.dto';
import { UpdateValorParametroDto } from './dto/update-valor-parametro.dto';

@Controller('parametro')
export class ParametroController {
  constructor(private readonly parametroService: ParametroService) {}

  @Post('create')
  create(@Body() createParametroDto: CreateParametroDto) {
    return this.parametroService.create(createParametroDto);
  }

  @Post('create-valor')
  createValor(@Body() createValorParametroDto: CreateValorParametroDto) {
    return this.parametroService.createValorParametro(createValorParametroDto);
  }

  @Get()
  findAll() {
    return this.parametroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.parametroService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateParametroDto: UpdateParametroDto) {
    return this.parametroService.update(id, updateParametroDto);
  }

  @Put('update-value/:id')
  valUpdate(@Param('id') id: number, @Body() updateValorParametroDto: UpdateValorParametroDto) {
    return this.parametroService.valUpdate(id, updateValorParametroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.parametroService.remove(id);
  }

  @Delete('remove-one-value/:id')
  removeOneValue(@Param('id') id: number) {
    return this.parametroService.removeOneValue(id);
  }
}
