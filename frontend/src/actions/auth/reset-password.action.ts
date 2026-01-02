"use server";

import { redirect } from "next/navigation";

export interface ResetPasswordState {
  error?: string;
}

export const resetPasswordAction = async (
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> => {
  const email = formData.get("email")?.toString();
  const token = formData.get("token")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!email || !token || !password || !confirmPassword) {
    return { error: "Información incompleta" };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, password }),
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return { error: "El enlace es inválido o ha expirado" };
  }
  //! en este punto la restauracion de la contraseña fue valida
  redirect("/login");
};
