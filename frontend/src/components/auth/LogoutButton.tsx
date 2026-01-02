'use client';

import { useTransition } from 'react';
import { logoutAction } from '@/actions/auth/logout.action';

export function LogoutButton() {
  //!usamos useTransition porque es una actualizacion no urdente este caso el logout donde finalment el server action redirecciona al usuario a /logout
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={pending}
      className="text-sm underline"
    >
      {pending ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  );
}
