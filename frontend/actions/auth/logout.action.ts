"use server";

import { redirect } from "next/navigation";

export const logoutAction = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
  });

  redirect("/login");
};
