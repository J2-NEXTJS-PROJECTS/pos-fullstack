import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class TransactionItemsDto {
  @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
  @IsInt({ message: 'Producto no válido' })
  productId: number;

  @IsNotEmpty({ message: 'Cantidad no puede estar vacía' })
  @IsInt({ message: 'Cantidad no válida' }) // Validate quantity too
  quantity: number;

  @IsNotEmpty({ message: 'Precio no puede estar vacío' })
  @IsNumber({}, { message: 'Precio no válido' })
  price: number;
}

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'El Total no puede ir vacio' })
  @IsNumber({}, { message: 'Cantidad no válida' })
  total: number;

  //! campo opcional
  @IsOptional()
  coupon: string;

  @IsArray({ message: 'Los items deben de ser una lista' })
  @ArrayNotEmpty({ message: 'Los items no pueden ir vacios' })
  //! se valida por cada item
  @ValidateNested({ each: true })
  //! convierte JSON en objetos de clase para permitir validaciones anidadas o internas.
  @Type(() => TransactionItemsDto)
  items: TransactionItemsDto[];
}
