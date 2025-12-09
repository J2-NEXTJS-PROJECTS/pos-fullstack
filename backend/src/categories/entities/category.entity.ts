import { Product } from '../../products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  //Una categoria puede tener varios productos
  //! Toda relación @OneToMany DEBE tener obligatoriamente un inverse side y siempre es al campo relacionado
  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];
}
