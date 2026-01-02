"use server";

export interface ForgotPasswordState {
  success?: boolean;
}

export const forgotPasswordAction = async (
  _prev: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> => {
  const email = formData.get("email")?.toString();

  if (!email) {
    //! Siempre respondemos success para no filtrar información
    return { success: true };
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
    cache: "no-store",
  });

  //! Siempre respondemos success para no filtrar información
  return { success: true };
};
