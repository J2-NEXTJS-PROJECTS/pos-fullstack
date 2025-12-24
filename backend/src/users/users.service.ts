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
    return this.userRepository.findOne({ where: { email } });
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
    //! Guarda el hash del refresh token en bd
    //console.log({ refreshTokenHash });
    await this.userRepository.update(userId, {
      refreshTokenHash: refreshTokenHash,
    });
  }
}
