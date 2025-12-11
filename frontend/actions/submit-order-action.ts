"use server";
import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/schemas/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

export const submitOrder = async (data: unknown) => {
  const order = OrderSchema.parse(data);
  //console.log(order);
  
  await new Promise((resolv)=>setTimeout(resolv,2000))

  const url = `${process.env.API_URL}/transactions`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const json = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }
  const success = SuccessResponseSchema.parse(json);
  //console.log(success);
  //revalidateTag('product-by-category', 'max')
  revalidatePath("/(store)/[categoryId]",'page')
  return {
    errors: [],
    success: success.message,
  };
};
