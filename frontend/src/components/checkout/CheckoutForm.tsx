'use client';

import { useFormStatus } from 'react-dom';
import { createTransactionAction, CreateTransactionState } from '@/actions/checkout/create-transaction.action';
import { useActionState } from "react";
const initialState: CreateTransactionState = {};
type item = { productId: number, quantity: number, price: number }
interface Props {
  items: item[]; // luego tipamos según carrito
}

export function CheckoutForm( {items} : Props) {
  const [state, action] = useActionState(createTransactionAction, initialState);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      <div>
        <label className="text-sm">Cupón (opcional)</label>
        <input
          name="coupon"
          type="text"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {pending ? 'Procesando compra...' : 'Confirmar compra'}
    </button>
  );
}
