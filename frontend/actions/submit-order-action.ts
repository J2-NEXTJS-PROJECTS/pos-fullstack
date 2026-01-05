"use server";
import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/schemas/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const submitOrder = async (data: unknown) => {
  const order = OrderSchema.parse(data);
  console.log({order:JSON.stringify(order)});

  await new Promise((resolv)=>setTimeout(resolv,2000))

 const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => {
      console.log({cookies: `${c.name}=${c.value}`})
      return `${c.name}=${c.value}`
    })
    .join("; ");


  const url = `${process.env.API_URL}/transactions`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // 🔥 CLAVE
    },
    credentials: "include",
    body: JSON.stringify(order),
  });
  const json = await req.json();
  console.log({json})
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
