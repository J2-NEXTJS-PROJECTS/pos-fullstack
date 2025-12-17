"use server";

import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: number) => {
//!producto que tiene transacciones no se va poder borrar por constraint en BD 
//!Key (id)=(45) is still referenced from table "transaction_items"
  const url = `${process.env.API_URL}/products/${productId}`;
  const req = await fetch(url, {
    method: "DELETE",
  });
  const json = await req.json();
  console.log(json);
  revalidatePath(`admin/products`);
};
