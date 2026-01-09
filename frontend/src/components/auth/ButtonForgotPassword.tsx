"use client"
import { useRouter } from "next/navigation";

export const ButtonForgotPassword = () => {
  const router = useRouter();
  const handler = () => {
    close();
    router.push("/forgot-password");
  };
  return (
    <button className="text-sm underline" onClick={handler}>
      Recuperar contrasena
    </button>
  );
};
