"use client";

import { useFormStatus } from "react-dom";
import {
  loginAction,
  LoginActionState,
} from "../../../actions/auth/login.action";
import { useAuthModalStore } from "@/store/auth-modal.store";
import { useActionState } from "react";

const initialState: LoginActionState = {};

export function LoginForm() {
  const { redirectTo } = useAuthModalStore();
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label className="text-sm">Correo</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm">Contraseña</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-green-400 font-bold py-2"
    >
      {pending ? "Ingresando..." : "Iniciar sesión"}
    </button>
  );
}
