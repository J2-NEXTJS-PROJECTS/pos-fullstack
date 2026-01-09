import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    
      <div className="bg-white  max-w-md space-y-4 p-4">
        <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu
          contraseña.
        </p>
        <ForgotPasswordForm />
      </div>
    
  );
}
