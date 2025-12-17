import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly repositoryCategory: Repository<Category>,
    @InjectRepository(Product)
    private readonly repositoryProduct: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.repositoryCategory.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      const errors: string[] = [];
      errors.push('La categoria no existe');
      throw new NotFoundException(errors);
    }
    console.log(category);
    return this.repositoryProduct.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(categoryId: number | null, take: number, skip: number) {
    // return this.repositoryProduct.find({
    //   relations: { category: true },
    //   order: { id: 'DESC' },
    // }); //con eager en la entidad siempre nos traera category

    const options: FindManyOptions<Product> = {
      relations: { category: true },
      order: { id: 'DESC' },
      take: take,
      skip: skip,
    };
    //! Si viene la category
    if (categoryId) {
      options.where = {
        category: { id: categoryId },
      };
    }
    const [products, total] =
      await this.repositoryProduct.findAndCount(options);
    return {
      products,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.repositoryProduct.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    const product = await this.findOne(id);
    console.log({ product });
    console.log({ updateProductDto });
    //Sobreescribimos el objeto product con los que vienen en updateProductDto (Mutamos)
    Object.assign(product, updateProductDto);

    //! verificacion si esta enviando el id categoria.
    if (updateProductDto.categoryId) {
      const category = await this.repositoryCategory.findOneBy({
        id: updateProductDto.categoryId,
      });
      if (!category) {
        const errors: string[] = [];
        errors.push('Categoria no existe');
        throw new NotFoundException(errors);
      }
      //! como category esta definido como campo relacionado en la entidad Product para su actualizacion es necesario enviar una instancia de Category
      product.category = category;
    }

    console.log({ product });
    return await this.repositoryProduct.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    //! Remove es borrado inteligente ejecuta cascada y hooks recibe Entity
    await this.repositoryProduct.remove(product);
    //return 'Producto Eliminado';
    return { message: 'Producto Eliminado' };
  }
}
