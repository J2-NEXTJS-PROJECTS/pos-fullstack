"use client";
import { useAuthModalStore } from "@/store/auth-modal.store";
export const LoginButton=() =>{
  const { open } = useAuthModalStore();
  const handleClick = () => {
    open("login", "/");
  };
  // Autenticación
  return (
    <button
      className="rounded bg-green-400 font-bold py-2 px-10"
      onClick={handleClick}
    >
      Login
    </button>
  );
}
