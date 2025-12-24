import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtUser } from 'src/auth/interfaces/types.jwt-user';

@Injectable()
// - Lee metadata de @Roles
// - Compara contra request.user.role
// - Funciona a nivel método o controller
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //! 1) Leer los roles requeridos del endpoint/clase con getAllAndOverride
    //!ROLES_KEY tiene la key 'roles' que usamos en el decorador Roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      //primero método, luego clase,Prioriza el más específico
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    //! Si NO hay @Roles, no se restringe por rol

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    //! 2) Obtener el usuario de la request (inyectado por JwtStrategy.validate)

    const request = context.switchToHttp().getRequest<{ user?: JwtUser }>();

    const user = request.user;
    console.log(user);
    //! Si no hay user => no autenticado (normalmente JwtAuthGuard debería bloquear antes)
    if (!user || !user.role) {
      return false;
    }
    //! 3) Comparar rol del usuario vs roles requeridos
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos para este recurso');
    }
    return true;
  }
}
