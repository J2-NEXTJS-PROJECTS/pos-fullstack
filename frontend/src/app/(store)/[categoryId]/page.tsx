import { ProductCard } from "@/components/products/ProductCard";
import { CategoryWithProductsResponseSchema } from "@/schemas/schemas";
import { redirect } from "next/navigation";
import React from "react";
//type Params = Promise<{ categoryId: string }>;
interface Params {
  params: Promise<{ categoryId: string }>;
}

async function getProducts(categoryId: string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  const req = await fetch(url, {
    next: { tags: ["product-by-category"] },
  });
  if (!req.ok) {
    redirect(`/1`);
  }
  const json = await req.json();
  //tipamos el json con el schema de zod
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
}

//page({ params }: { params: Params })
export default async function page({ params }: Params) {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {
        // category.products.map((product) => {
        //   return <ProductCard key={product.id} product={product} />;
        // })
        category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
}
