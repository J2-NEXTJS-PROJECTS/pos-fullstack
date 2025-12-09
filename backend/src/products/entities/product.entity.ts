import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
    default: 'default.svg',
  })
  image: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  inventory: number;
  //Muchos productos pueden tener una sola categoria
  //con la opcion { eager: true } siempre se mostrara el campo relacionado category en las consultas de productos
  @ManyToOne(() => Category)
  category: Category;
  @Column({ type: 'int' })
  categoryId: number; //Para poderlo ver en typescript con el campo relacionado de tipo manytoone el campo categoryId ya se crea en el aBD
}
