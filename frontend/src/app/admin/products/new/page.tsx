import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

{
  /* NewProductPage es un server component */
}
function NewProductPage() {
  return (
    <>
      <Link
        href={"/admin/products"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>
      <Heading>Nuevo Producto</Heading>
      {/* AddProductForm es un componente del cliente */}
      <AddProductForm>
        {/* ProductForm es un server components */}
        {/* Este componente se renderiza en el servidor a pesar de que el componente padre AddProductForm es un "use client" */}

        <ProductForm />
      </AddProductForm>
    </>
  );
}

export default NewProductPage;
