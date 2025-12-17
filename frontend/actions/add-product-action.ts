"use server";

import { ErrorResponseSchema, ProductFormSchema } from "@/schemas/schemas";
import { success } from "zod";

export type ActionStateType = {
  errors: string[];
  success: string;
};

export const addProduct = async (
  prevSate: ActionStateType,
  formData: FormData
) => {
  //console.log('desde el server action')
  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    inventory: formData.get("inventory"),
    categoryId: formData.get("categoryId"),
  });
  if (!product.success) {
    //Obtenemos los errores configurados en el objeto de zod ProductFormSchema
    return {
      errors: product.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  //en este punto si todo esta bien nos comunicaremos con el api de productos
  console.log(JSON.stringify(product.data));
  const url = `${process.env.API_URL}/products`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product.data),
  });
  const json = await req.json();

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);

    return {
      errors: errors.message.map((issue) => issue),
      success: "",
    };
  }
  //SI todo es correcto
  return {
    errors: [],
    success: "Producto creado correctamente",
  };
};