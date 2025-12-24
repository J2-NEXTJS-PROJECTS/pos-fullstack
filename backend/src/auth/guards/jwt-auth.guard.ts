import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// - Activa Passport con la estrategia jwt
// - Dispara internamente JwtStrategy
// - Bloquea requests sin token válido
//! Uso: @UseGuards(JwtAuthGuard) en los endpoints que queremos proteger, es un alias de AuthGuard('jwt')
export class JwtAuthGuard extends AuthGuard('jwt') {
  //?Mañanaña puede que queramos anadir algún método
  // handleRequest(err, user, info) {
  // if (err || !user) {
  //   throw new UnauthorizedException('Token inválido o expirado');
  // }
  // return user;
}
