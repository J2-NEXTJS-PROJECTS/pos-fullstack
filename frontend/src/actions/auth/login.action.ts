"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface LoginActionState {
  //Error es opcional
  error?: string;
}

export const loginAction = async (
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const redirectTo = formData.get("redirectTo")?.toString() || "/";

  if (!email || !password) {
    return { error: "Correo y contraseña son obligatorios" };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    return { error: "Credenciales inválidas" };
  }
  console.log({
    access_token: res.headers.get("set-cookie")?.split(";")[0].split("=")[1],
  });
  const accessToken = res.headers
    .get("set-cookie")
    ?.split(";")[0]
    .split("=")[1];
  // if (!accessToken) {
  //   return { error: "No se pudo obtener el token de acceso" };
  // }
  (await cookies()).set("access_token", accessToken!);
  console.log({ redirectTo });
  redirect(redirectTo);
};
