"use server";

import { redirect } from "next/navigation";

export interface SignupActionState {
  error?: string;
}

export const signupAction = async (_prevState: SignupActionState,formData: FormData): Promise<SignupActionState> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const redirectTo = formData.get("redirectTo")?.toString() || "/";

  if (!email || !password || !confirmPassword) {
    return { error: "Todos los campos son obligatorios" };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }
  //! Se registra la cuenta
  const signupRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!signupRes.ok) {
    return { error: "No se pudo crear la cuenta" };
  }
  //! Se hace auto-login
  const loginRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!loginRes.ok) {
    return { error: "Cuenta creada, pero error al iniciar sesión" };
  }
  //!en este punto el backend ya configuro las cookies
  redirect(redirectTo);
};
