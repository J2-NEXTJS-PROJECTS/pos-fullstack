import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
export class CreateCouponDto {
  @IsNotEmpty({ message: 'EL nombre del cupon es obligatorio' })
  name: string;

  @IsNotEmpty({ message: 'El descuento no puede ir vacio' })
  @IsInt({ message: 'El descuento debe de ser un numero entre 1 y 100' })
  @Max(100, { message: 'El descuento no puede ser mayor a 100' })
  @Min(1, { message: 'El descuento minimo es 1' })
  percentage: number;
  @IsNotEmpty({ message: 'la fecha no puede ser vacia' })
  @IsDateString({}, { message: 'Fecha No valida' })
  expirationDate: Date;
}
