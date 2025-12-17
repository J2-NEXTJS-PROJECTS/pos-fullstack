import { ProductsTable } from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/schemas/schemas";
import { isValidPage } from "@/utils/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const getProducts = async (take:number,skip:number) => {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  const req = await fetch(url);
  const json = await req.json();
  //console.log(json);
  const data = ProductsResponseSchema.parse(json);
  //console.log(data.products)
  return { products: data.products, total: data.total };
};
type SearchParams = Promise<{ page: string }>;
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams; //http://localhost:3001/admin/products?page=5
  //console.log(page)
  //!tendremos una pagina por default en caso de que el page se invalido
  if (!isValidPage(+page)) redirect(`/admin/products?page=1`);
  const productsPerPage = 10;
  const skip = (+page - 1) * productsPerPage;
  //console.log(skip);
  const { products, total:totalProducts } = await getProducts(productsPerPage,skip);

  const totalPages=Math.ceil(totalProducts/productsPerPage)
  console.log({totalPages})
  if (+page > totalPages) redirect(`/admin/products?page=1`);
  return (
    <>
    <Link
      href={'/admin/products/new'}
      className="rounded bg-green-400 font-bold py-2 px-10"
    >Nuevo Producto</Link>
      <Heading>Products page</Heading>
      <ProductsTable products={products} />
      <Pagination page={+page} totalPages={totalPages} baseUrl={"/admin/products"}/>
    </>
  );
}
