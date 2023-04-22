import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesCompraDto } from './create-detalles-compra.dto';


export class UpdateDetallesCompraDto extends PartialType(CreateDetallesCompraDto) {}
