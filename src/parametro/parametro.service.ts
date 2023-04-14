import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateParametroDto } from './dto/create-parametro.dto';
import { UpdateParametroDto } from './dto/update-parametro.dto';
import { Repository } from 'typeorm';
import { Parametro, ValorParametro } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateValorParametroDto } from './dto/create-valor-parametro.dto';
import { UpdateValorParametroDto } from './dto/update-valor-parametro.dto';

@Injectable()
export class ParametroService {

  private readonly logger = new Logger('ParametroService');

  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>,

    @InjectRepository(ValorParametro)
    private readonly valorParametroRepository: Repository<ValorParametro>,

  ) { }

  async create(createParametroDto: CreateParametroDto) {
    try {
      const { valores = [], ...parametroDetails } = createParametroDto;
      const parametro = this.parametroRepository.create({
        ...parametroDetails,
        valores: valores.map(valor => this.valorParametroRepository.create({ valor_parametro: valor }))
      });

      await this.parametroRepository.save(parametro);

      return parametro;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`salto un error.
      CodErrorParametroServices: 38`)
    }
  }

  createValorParametro(createValorParametroDto: CreateValorParametroDto) {
    try {
      const valorParametro = new ValorParametro();

      valorParametro.valor_parametro = createValorParametroDto.valor_parametro;
      valorParametro.parametro = { id: createValorParametroDto.parametro } as Parametro;
      return this.valorParametroRepository.save(valorParametro);

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`salto un error.
      CodErrorParametroServices: 52`)
    }
  }

  findAll() {
    return this.parametroRepository.find({ relations: ["valores"] });
  }

  async findOne(id: number) {
    const parametro = await this.parametroRepository.findOne({ where: { id }, relations: ["valores"] });
    if (!parametro)
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 63`)
    return parametro;
  }

  async update(id: number, updateParametroDto: UpdateParametroDto) {
    try {
      const parametro = await this.parametroRepository.findOne({ where: { id } });
      if (parametro) {
        parametro.nombre_parametro = updateParametroDto.nombre_parametro;
        parametro.estado = updateParametroDto?.estado || parametro.estado;
        return await this.parametroRepository.save(parametro);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 75`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async valUpdate(id: number, updateValorParametroDto: UpdateValorParametroDto) {
    try {
      const valorParametro = await this.valorParametroRepository.findOne({ where: { id } });
      if (valorParametro) {
        valorParametro.valor_parametro = updateValorParametroDto.valor_parametro;
        return await this.valorParametroRepository.save(valorParametro);
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 88`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const parametro = await this.parametroRepository.findOne({ where: { id }, relations: ["valores"] })
      if (parametro) {
        parametro.estado = 0;
        parametro.valores = await Promise.all(parametro.valores.map(async valor => await this.valorParametroRepository.save({ ...valor, estado: 0 })));
        return await this.parametroRepository.save(parametro)
      }
      throw new NotFoundException(`id ${id} de parametro no encontrado.
      CodErrorParametroServices: 102`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeOneValue(id: number) {
    try {
      const valorParametro = await this.valorParametroRepository.findOne({ where: { id } })
      if (valorParametro) {
        valorParametro.estado = 0
        return await this.valorParametroRepository.save(valorParametro)
      }
      throw new NotFoundException(`id ${id} de valor parametro no encontrado.
      CodErrorParametroServices: 115`)
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // async deleteAll() {
  //   const query = await this.parametroRepository.createQueryBuilder('parametro')
  //   try {
  //     return await query
  //       .delete()
  //       .where({})
  //       .execute();
  //   } catch (error) {
  //     this.handleDBExceptions(error)
  //   }
  // }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, check servr logs')

  }
}
