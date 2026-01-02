import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
