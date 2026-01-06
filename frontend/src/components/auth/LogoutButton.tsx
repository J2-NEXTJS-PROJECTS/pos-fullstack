"use client";

import { useEffect, useTransition } from "react";
import { logoutAction } from "../../../actions/auth/logout.action";
import { CurrentUser } from "@/lib/get-current-user";
import { useAuthModalStore } from "@/store/auth-modal.store";

export function LogoutButton({ user }: { user: CurrentUser | null }) {
  //!usamos useTransition porque es una actualizacion no urgente este caso el logout donde finalment el server action redirecciona al usuario a /logout
  const [pending, startTransition] = useTransition();
  const {close} = useAuthModalStore()
  //!para poder cerrar el modal, lo correcto es tener un state isAuthenticated.
  useEffect(() => {
    if (user) close();
  }, [user, close]);
  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={pending}
      className="rounded bg-green-400 font-bold py-2 px-10 "
    >
      {pending ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
