import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, TransactionItems } from './entities/transaction.entity';
import { Product } from '../products/entities/product.entity';
import { CouponsModule } from 'src/coupons/coupons.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionItems, Product]),
    CouponsModule, //Importamos Coupons module
    UsersModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
