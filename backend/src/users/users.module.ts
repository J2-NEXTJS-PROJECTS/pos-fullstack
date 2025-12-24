import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  //COn provider el contoler puede inyectar UsersService
  providers: [UsersService],
  //!Exportamos UsersService para que el modulo auth lo pueda usar
  exports: [UsersService],
})
export class UsersModule {}
