import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
export class User {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  //! tomara el name de la propiedad. Obligatorio
  @Column({ type: 'varchar', length: 255 })
  email: string;
  //! . Obligatorio
  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  //! tomara el name de la propiedad. Obligatorio
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;
  //!en JS usamos la propeidad en camelCase y en bd refresh_token_hash
  @Column({
    name: 'refresh_token_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshTokenHash: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'password_reset_token', type: 'varchar', nullable: true })
  passwordResetToken: string | null;

  @Column({ name: 'password_reset_expires', type: 'timestamp', nullable: true })
  passwordResetExpires: Date | null;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
