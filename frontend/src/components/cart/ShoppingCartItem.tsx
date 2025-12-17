import { CartItem } from "@/schemas/schemas";
import Image from "next/image";
import { formatCurrency } from "@/utils/utils";
import { useStore } from "@/store/store";
import { getImagePath } from '../../utils/utils';

export default function ShoppingCartItem({ item }: { item: CartItem }) {
    const updateQuantity = useStore(state=>state.updateQuantity)
    const removeFromQuantity = useStore(state=>state.removeFromCart)
  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24">
        <Image
          //src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
          src={getImagePath(item.image)}
          alt={`Imagen del producto ${item.name}`}
          width={100}
          height={100}
          priority
          unoptimized // 👈 clave: desactiva el optimizador de Next
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-gray-900">{item.name}</h3>
        <p>{formatCurrency(item.price)}</p>
        <select
          className="w-32 text-center p-2 rounded-lg bg-gray-100"
          value={item.quantity}
          //e es el event para tomar el valor seleccionado y lo convertimos a number
          onChange={(e) => updateQuantity(item.productId,+e.target.value)}
        >
          {
          //el array from va a devolver un array segun el inventario [1,2,3,4,5] como el indice empieza con 0 le suma 1
          Array.from({ length: item.inventory }, (_, index) => index + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
      </div>
      <div className="absolute top-10 right-0">
        <button type="button" onClick={() => removeFromQuantity(item.productId)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
