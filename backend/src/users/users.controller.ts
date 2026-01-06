import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtUser } from 'src/auth/interfaces/types.jwt-user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: JwtUser) {
    const fullUser = await this.usersService.findById(+user.userId);
    return {
      id: fullUser.id,
      email: fullUser.email,
      role: fullUser.role,
      isActive: fullUser.isActive,
      createdAt: fullUser.createdAt,
      updatedAt: fullUser.updatedAt,
    };
  }
}
