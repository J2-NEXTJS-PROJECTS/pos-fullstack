import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService], //se va inyectar la class ConfigService en el metodo typeOrmConfig para poder leer el .env
    }),
    //!importamos las entidades porque en el seeder vamos a trabajar directament con los repositorios usando Typeorm.
    TypeOrmModule.forFeature([Product, Category, User]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
