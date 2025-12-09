import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionItems } from './entities/transaction.entity';
import {
  Between,
  EntityManager,
  FindManyOptions,
  Repository,
  DataSource,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionItems)
    private readonly transactionItemsRepository: Repository<TransactionItems>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource, // 👈 Nuevo: inyectamos DataSource,
    private readonly couponService: CouponsService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    //! se usa el manager de dataSource, aunque se puede usar el manager de cualquier entidad, si un producto no existe se lanza una excepcion y la transaccion no continua.
    // Transaction tiene acceso a todas las entidades, se puede hacer insert,delete, update.
    await this.dataSource.manager.transaction(
      async (transactionEntityManager: EntityManager) => {
        // Primero solo grabamos los datos de la cabecera en este caso el total porque el campo id y fecha son automaticos
        console.log(createTransactionDto);
        const transaction = new Transaction();
        const total = createTransactionDto.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        transaction.total = total;
        //buscar el cupon
        if (createTransactionDto.coupon) {
          const coupon = await this.couponService.apply(
            createTransactionDto.coupon,
          );
          //console.log(coupon);
          const discount = Number(
            ((coupon.percentage / 100) * total).toFixed(2),
          );
          console.log(discount);
          transaction.discount = discount;
          transaction.coupon = coupon.name;
          transaction.total -= discount;
        }

        //! Se graba cabecera, save necesit auna entity.
        await transactionEntityManager.save(transaction);

        for (const item of createTransactionDto.items) {
          const errors: string[] = [];
          //! Verificamos la existencia del product
          const product = await transactionEntityManager.findOne(Product, {
            where: { id: item.productId },
          });
          if (!product) {
            errors.push(`Producto con id ${item.productId} no existe`);
            throw new NotFoundException(errors);
          }
          //!verificamos el stock
          if (item.quantity > product.inventory) {
            errors.push(
              `Producto ${product.name} solicitado excede la cantidad disponible`,
            );
            throw new BadRequestException();
          }

          product.inventory -= item.quantity; //!en este punto se reduce el inventario
          //la estructura de transactionItemsRepository es:
          // { quantity,
          //   price,
          //   product,
          //   transaction (campo relacionado)
          // }

          //!Crear instancia de TransactionItems
          const transactionItems = new TransactionItems();
          transactionItems.price = item.price;
          transactionItems.product = product; //Campo relacionado
          transactionItems.quantity = item.quantity;
          transactionItems.transaction = transaction; //Campo relacionado
          //! Se graba detalle
          await transactionEntityManager.save(transactionItems); //transaction es el campo relacionado
        }
      },
    );
    return 'Venta Hecha';
  }

  findAll(transactionDate?: string) {
    //transactionDate es opcional

    const options: FindManyOptions<Transaction> = {
      relations: {
        items: true,
      },
    };
    if (transactionDate) {
      //formateamos la fecha
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Fecha no valida');
      }
      //! en este punto la fecha es valida
      const start = startOfDay(date);
      const end = endOfDay(date);
      console.log({ date, start, end });
      options.where = {
        transactionDate: Between(start, end),
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: id },
      relations: { items: true },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaccion con ${id} no existe`);
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    console.log(updateTransactionDto);
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);
    //! Restauramos el stock
    for (const item of transaction.items) {
      //item.product es un campo relacionado
      const product = await this.productRepository.findOne({
        where: { id: item.product.id },
      });
      if (!product) {
        throw new NotFoundException(
          `Producto con el id ${item.product.id} no existe`,
        );
      }
      //en este punto el producto si existe.
      product.inventory += item.quantity;
      await this.productRepository.save(product);
    }
    //! los registros hijos se eliminan en automatico gracias al cascade
    await this.transactionRepository.remove(transaction);
    return `Transaccion con #${id} fue eliminada`;
  }
}
