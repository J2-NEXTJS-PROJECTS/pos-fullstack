"use client";

import { useFormStatus } from "react-dom";
import {
  resetPasswordAction,
  ResetPasswordState,
} from "../../../actions/auth/reset-password.action";
import { useActionState } from "react";
const initialState: ResetPasswordState = {};

interface Props {
  token: string;
  email: string;
}

export function ResetPasswordForm({ token, email }: Props) {
  const [state, action] = useActionState(resetPasswordAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      <div>
        <label className="text-sm">Nueva contraseña</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm">Confirmar contraseña</label>
        <input
          name="confirmPassword"
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
      className="w-full bg-black text-white py-2 rounded"
    >
      {pending ? "Restableciendo..." : "Restablecer contraseña"}
    </button>
  );
}
