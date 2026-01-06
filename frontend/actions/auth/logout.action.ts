"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });

   // Borrar cookies del lado del frontend (doble seguridad)
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  //cookieStore.delete('refresh_token');

  redirect("/login");
};
