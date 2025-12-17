import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CouponsModule } from './coupons/coupons.module';
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  // forRoot: para  poder usar typeorm, las variables de entorno en toda la aplicacion de forma global
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService], //se va inyectar la class ConfigService en el metodo typeOrmConfig para poder leer el .env
    }),
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    CouponsModule,
    UploadImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  //exports: [AppService],
})
export class AppModule {}
