import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    return user;
  }

  async createClient(email: string, passwordHash: string): Promise<User> {
    const user = this.userRepository.create({
      email,
      passwordHash,
      role: Role.CLIENT,
    });
    return this.userRepository.save(user);
  }

  async updateRefreshToken(
    userId: number,
    refreshTokenHash: string | null,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshTokenHash: refreshTokenHash,
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
