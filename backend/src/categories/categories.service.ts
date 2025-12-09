import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categorieRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    //console.log(createCategoryDto);
    //! Opcion valida si se necesita hacer validaciones o verificaciones.
    // const category = new Category();
    // category.name = createCategoryDto.name;
    // return this.categorieRepository.save(category);
    return this.categorieRepository.save(createCategoryDto);
  }

  async findAll() {
    console.log(`aqui`);
    const categories = await this.categorieRepository.find();
    console.log(categories);
    return categories;
  }

  async findOne(id: number, products?: string) {
    const options: FindOneOptions<Category> = {
      where: { id: id },
    };
    if (products === 'true') {
      options.relations = { products: true };
    }
    const category = await this.categorieRepository.findOne(options);
    console.log(category);
    if (!category) {
      throw new NotFoundException('Categoria no existe');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    //console.log(updateCategoryDto);
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;
    //Actualizamos
    return this.categorieRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    // remove devuelve la instancia eliminada, delete retorna affecteds rows
    await this.categorieRepository.delete(category);
    return `Categoria #${id} eliminada`;
  }
}
