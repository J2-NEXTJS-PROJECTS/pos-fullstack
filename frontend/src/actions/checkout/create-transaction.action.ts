'use server';

import { redirect } from 'next/navigation';

export interface CreateTransactionState {
  error?: string;
}

export async function createTransactionAction(
  _prev: CreateTransactionState,
  formData: FormData,
): Promise<CreateTransactionState> {
  try {
    const items = JSON.parse(formData.get('items') as string);
    const coupon = formData.get('coupon')?.toString();
    //! la cookie ya existe en este punto
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ items, coupon }),
      cache: 'no-store',
    });

    if (!res.ok) {
      return { error: 'No se pudo procesar la compra' };
    }

    redirect('/');
  } catch {
    return { error: 'Error inesperado al procesar la compra' };
  }
}
