import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { ProductSchema } from "@/schemas/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
    params : Promise<{id:string}>
}

const getProduct=async (id:string)=> {
    const url=`${process.env.API_URL}/products/${id}`
    const req=await fetch(url)
    const json=await req.json()
    if (!req.ok) {
        notFound()
    }
    const product=ProductSchema.parse(json)
    return product

}
{
  /* EditProduct es un server component */
}
const EditProduct = async ({ params }: Params) => {
    const {id}=await params
    //console.log(id)
    const product=await getProduct(id)
console.log(product)
    
  return (
    <>
      <Link
        href={"/admin/products"}
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>
      <Heading>Editar Producto {product.name}</Heading>
      {/* EditProductForm es un componente del cliente */}
      <EditProductForm>
         {/* ProductForm es un server components */}
        {/* Este componente se renderiza en el servidor a pesar de que el componente padre EditProductForm es un "use client" */}
        <ProductForm product={product}/>
      </EditProductForm>
    </>
  );
};

export default EditProduct;
