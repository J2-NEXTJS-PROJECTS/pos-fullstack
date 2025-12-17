import { Product } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import React from "react";


const DeleteForm = ({ productId }: { productId: Product["id"] }) => {
  //!Como este es un componente del servidor significa que podemos definir un metodo como server action dentro del componente
  const deleteProduct = async () => {
    "use server";
    const url = `${process.env.API_URL}/products/${productId}`;
    const req = await fetch(url, {
      method: "DELETE",
    });
    const json=await req.json()
    console.log(json)
    revalidatePath(`admin/products`)
  };

  return (
    <form action={deleteProduct}>
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 cursor-pointer"
        value={"Delete"}
      />
    </form>
  );
};
export default DeleteForm;
