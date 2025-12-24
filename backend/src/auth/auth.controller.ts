import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    //!primero se valida el usuario
    const user = await this.authService.validateUser(body.email, body.password);
    //! obtiene los tokens y los guarda en cookies
    const { accessToken, refreshToken } = await this.authService.login(user);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      success: true,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Post('refresh')
  async refresh(
    @Body() body: { userId: string; refreshToken: string },
    //@Res({ passthrough: true }) permite usar el objeto Response para modificar headers/cookies,pero sigue dejando que Nest maneje el return {...} normalmente
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      +body.userId,
      body.refreshToken,
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true, //no puede ser accedida por JS en el navegador
      sameSite: 'lax',
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true, //no puede ser accedida por JS en el navegador
      sameSite: 'lax',
    });

    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @CurrentUser() user: { userId: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(+user.userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { success: true };
  }
}
