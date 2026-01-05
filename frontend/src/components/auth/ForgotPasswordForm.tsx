"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import {
  forgotPasswordAction,
  ForgotPasswordState,
} from "../../../actions/auth/forgot-password.action";

const initialState: ForgotPasswordState = {};

export const ForgotPasswordForm = () => {
  const [state, action] = useActionState(forgotPasswordAction, initialState);
  //!en el primer render sate.success el valor es false porque initialState esta configurado con {}
  //!si el correo existe se le notifica al usuario
  if (state.success) {
    return (
      <p className="text-sm text-green-600">
        Si el correo existe, recibirás un email con instrucciones.
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="text-sm">Correo</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-2 rounded"
    >
      {pending ? "Enviando..." : "Enviar enlace"}
    </button>
  );
}
