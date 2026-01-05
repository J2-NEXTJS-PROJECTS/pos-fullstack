import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

const cookieExtractor = (req: Request): string | null => {
  console.log(req?.cookies?.access_token);
  return (req?.cookies?.access_token as string) ?? null;
};
@Injectable()
// Responsabilidad
// - ✅ Validar tokens en requests entrantes
// - ✅ Decirle a Passport cómo extraer el token
// - ✅ Decirle a Passport cómo validar el payload
// - ✅ Poblar request.user
// 📌 Se usa solo en el flujo de protección de rutas
//Por defecto la estrategia se llamara 'jwt'
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      //! solo beartoken
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      jwtFromRequest: ExtractJwt.fromExtractors([
        //! cookies y Bearertoken
        cookieExtractor, // ✅ Cookie
        //! Extrae el token del header Authorization Bearer
        ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ (opcional) Bearer
      ]),

      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }
  //! Devuelve:{userId, role} y se adjunta a la request.user
  validate(payload: { sub: string; role: string }) {
    console.log({ desdeValidate: payload });
    return { userId: payload.sub, role: payload.role };
  }
}
