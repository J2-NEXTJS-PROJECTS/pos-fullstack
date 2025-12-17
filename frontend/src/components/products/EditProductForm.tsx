"use client";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { updateProduct } from "../../../actions/updated-product-action";
import { SubmitButton } from "./SubmitButton";


export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  //!para tener acceso al pathparam desde un componente de cliente es necesario usar useParams
  const router = useRouter();
  const params = useParams<{ id: string }>();
  //console.log(params.id)

  const updateProductWithId = updateProduct.bind(null, +params.id);
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
  });
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }
    if (state.success) {
      toast.success(state.success);
      router.push(`/admin/products`);
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-5">
      {children}
      {/* <input
        type="submit"
        className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
        value="Guardar Cambios"
      /> */}
      <SubmitButton origin={'edit'}/>
    </form>
  );
}
