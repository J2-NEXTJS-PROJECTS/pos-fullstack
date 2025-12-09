import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre de producto es obligatorio' })
  @IsString({ message: 'Nombre no valido' })
  name: string;

  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no valido' }) //dos decimales
  price: number;

  @IsNotEmpty({ message: 'Inventario es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no valida' }) //sin decimales
  inventory: number;
  @IsNotEmpty({ message: 'Categoria es obligatoria' })
  @IsInt({ message: 'Categoria invalida' })
  categoryId: number;
}
