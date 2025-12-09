import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'la categoria debe de ser un numero' })
  category_id?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'limite debe de ser un numero' })
  take?: number;

  @IsOptional()
  @IsNumberString({}, { message: 'salto debe de ser un numero' })
  skip?: number;
}
