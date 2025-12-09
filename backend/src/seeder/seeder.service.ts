import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository, DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    console.log('DB OPTIONS:', this.dataSource.options);
    const connection = this.dataSource;
    await connection.dropDatabase(); //borras la base de datos (tablas, etc.).
    await connection.synchronize(); //vuelves a crear el esquema a partir de las entidades.
  }

  async seed() {
    try {
      console.log(categories);
      await this.categoryRepository.save(categories);
      for (const seedProduct of products) {
        const category = await this.categoryRepository.findOneBy({
          id: seedProduct.categoryId,
        });
        //console.log(category);
        if (!category) {
          console.error(
            `Category with ID ${seedProduct.categoryId} not found.`,
          );
          continue; // Skip this product if the category is not found
        }
        const product = new Product();
        product.name = seedProduct.name;
        product.image = seedProduct.image;
        product.price = seedProduct.price;
        product.inventory = seedProduct.inventory;
        product.category = category;
        //console.log(product);
        await this.productRepository.save(product);
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}
