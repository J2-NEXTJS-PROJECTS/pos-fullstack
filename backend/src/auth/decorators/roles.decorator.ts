import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';

export const ROLES_KEY = 'roles';
//export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
// - Guarda metadata en el endpoint
// - Define roles requeridos por endpoint
// - No contiene lógica (solo metadata)
//! Uso: @Roles(Role.ADMIN, Role.CLIENT) en los endpoints que queremos proteger
//! Roles se crea cuando Nest construye el endpoint, y RolesGuard lo lee en tiempo de ejecución
//! “Esta función puede recibir cero, uno o muchos argumentos,y todos se agrupan en un arreglo llamado roles”.
export const Roles = (...roles: Role[]) => {
  //console.log(...roles);
  //console.log(roles);
  //LO que queda guardado es metadata['roles'] = [Role.ADMIN, Role.CLIENT];
  return SetMetadata(ROLES_KEY, roles);
};
