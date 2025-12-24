import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
// Responsabilidad
// - ✅ Validar tokens en requests entrantes
// - ✅ Decirle a Passport cómo extraer el token
// - ✅ Decirle a Passport cómo validar el payload
// - ✅ Poblar request.user
// 📌 Se usa solo en el flujo de protección de rutas
//Por defecto la estrategia se llama 'jwt' pero este nombre lo definimos en jwt-auth.guard.ts que es un alias de JwtStrategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    //! Extrae el token del header Authorization Bearer
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }
  //! Devuelve:{userId, role} y se adjunta a la request.user
  validate(payload: { sub: string; role: string }) {
    return { userId: payload.sub, role: payload.role };
  }
}
