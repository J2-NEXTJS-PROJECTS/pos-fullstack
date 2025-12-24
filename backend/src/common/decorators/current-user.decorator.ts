import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../../auth/interfaces/types.jwt-user';

// - Acceso limpio al usuario autenticado
// - Evita usar req.user directamente
//!Uso: getMe(@CurrentUser() user)

//Creamos un decorador personalizado para parametros con createParamDecorator
export const CurrentUser = createParamDecorator(
  (_data: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    console.log({ _data });
    console.log(ctx.getType());
    //accedemos al request dependiendo del tipo de app. Cambia el contexto a HTTP Te da el request de Express/Fastify, De ahí puedes leer headers, params, body, user, etc.
    const request = ctx.switchToHttp().getRequest<{ user: JwtUser }>();
    const user = request.user;
    //console.log({ user });
    //return _data ? user[_data] : user;
    return user;
  },
);
