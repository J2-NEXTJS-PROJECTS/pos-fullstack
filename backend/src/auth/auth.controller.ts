import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
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
      //secure: false, //entornos dev
      sameSite: 'lax',
      //path: '/',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      //secure: false, //entornos dev
      sameSite: 'lax',
      //path: '/',
    });

    return {
      success: true,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Post('refresh')
  async refresh(
    //!ya no usaremos body
    //@Body() body: { userId: string; refreshToken: string },
    //@Res({ passthrough: true }) permite usar el objeto Response para modificar headers/cookies,pero sigue dejando que Nest maneje el return {...} normalmente
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokens = req.cookies?.refresh_token as string;
    //!ya no usaremos body
    //const { accessToken, refreshToken } = await this.authService.refreshTokens(+body.userId, body.refreshToken);
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(refreshTokens);

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

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const data = await this.authService.forgotPassword(email);
    //return { success: true };
    return data;
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    body: {
      email: string;
      token: string;
      password: string;
    },
  ) {
    await this.authService.resetPassword(body.email, body.token, body.password);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @CurrentUser() user: { userId: string },
    //! {passthrough: true} me permite modificar la respuesta: “Déjame modificar la respuesta (cookies, headers, status),pero tú sigue enviando el body con lo que yo retorne.”
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(+user.userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { success: true };
  }
}
