import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: {
    token?: Promise<string>;
    email?: Promise<string>;
  };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token, email } = await searchParams;

  if (!token || !email) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-red-600">Enlace inválido</p>
      </div>
    );
  }

  return (
    
      <div className="bg-white w-full max-w-md space-y-4 p-10">
        <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
        <ResetPasswordForm token={await token} email={await email} />
      </div>
    
  );
};
export default ResetPasswordPage