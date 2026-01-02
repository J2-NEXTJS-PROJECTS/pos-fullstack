import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
    email?: string;
  };
}

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
  const { token, email } = searchParams;

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-600">Enlace inválido</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
        <ResetPasswordForm token={token} email={email} />
      </div>
    </div>
  );
};
export default ResetPasswordPage