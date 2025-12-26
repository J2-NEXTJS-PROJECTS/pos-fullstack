import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  total: number;

  //Cupon
  //! campo opcional
  @Column({ type: 'varchar', length: 30, nullable: true })
  coupon: string;
  @Column({ type: 'decimal', nullable: true, default: 0 })
  discount: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  @ManyToOne(() => User, (user) => user.transactions, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  user: User;

  //! Toda relación @OneToMany DEBE tener obligatoriamente un inverse side y siempre es al campo relacionado
  @OneToMany(() => TransactionItems, (item) => item.transaction, {
    cascade: true, // 👈 ORM cascade
  }) //, {eager: true,}
  items: TransactionItems[];
}
@Entity()
export class TransactionItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
  //!Relacion con producto
  //@ManyToOne(() => Product, (product) => product.id, { eager: true })
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  //!Relacion con transaction (Cabecera)
  @ManyToOne(() => Transaction, (transaction) => transaction.items, {
    onDelete: 'CASCADE', // 👈 DB cascade
  })
  transaction: Transaction;
}
