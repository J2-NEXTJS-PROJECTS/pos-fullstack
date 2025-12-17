import { Product } from "@/schemas/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/utils/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div className={`${!isAvailable(product.inventory) && "opacity-40"}`}>
        <Image
          //src={"http://127.0.0.1:3000/img/7.jpg"}
          //src={`${process.env.API_URL}/img/${product.image}`}
          src={getImagePath(product.image)}
          alt={`Imagen del producto ${product.categoryId}`}
          width={400}
          height={600}
          priority
          unoptimized // 👈 clave: desactiva el optimizador de Next
        />

        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
          <p className="text-gray-500">Disponibles: {product.inventory}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      {isAvailable(product.inventory) ? (
        <AddProductButton product={product} />
      ) : <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black">Agotado</p>}
    </div>
  );
};
