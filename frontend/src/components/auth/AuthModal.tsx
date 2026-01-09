"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthModalStore } from "@/store/auth-modal.store";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useRouter } from "next/navigation"

export function AuthModal() {
  //isOpen por defecto es false y mode es 'login'
  const { isOpen, mode, close, setMode } = useAuthModalStore();
  const router=useRouter()
  const handler =()=>{
    close()
    router.push('/forgot-password')
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Accede con tu correo y contraseña"
              : "Regístrate para continuar"}
          </p>
          {/* esta 2 veces esto */}
          {/* <button
            className="text-sm underline"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button> */}
          {mode === "login" && <LoginForm />}
          {mode === "signup" && <SignupForm />}

          <div className="flex items-center justify-between">
            <button
              className="text-sm underline"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login"
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>

            <button
              className="text-sm underline"
              onClick={handler}
            >
              {mode === "login" && "Recuperar contrasena"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
