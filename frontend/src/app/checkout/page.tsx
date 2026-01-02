import React from "react";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

import { CheckoutForm } from '@/components/checkout/CheckoutForm';

const CheckoutPage = async () => {
    //!verificamos el usuario enviamos la cookie, quw contiene el token al backend.
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // TODO: reemplazar con items reales del carrito
  const mockItems = [
    { productId: 1, quantity: 1, price: 100 },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <CheckoutForm items={mockItems} />
    </div>
  );
};

export default CheckoutPage;
