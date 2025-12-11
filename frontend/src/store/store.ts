import {
  Coupon,
  CouponResponseSchema,
  Product,
  ShoppingCart,
} from "@/schemas/schemas";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  total: number;
  discount: number;
  items: ShoppingCart;
  coupon: Coupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  calculateTotal: () => void;
  applyCoupon: (couponName: string) => Promise<void>;
  applyDiscount: () => void;
  clearOrder: ()=>void;
}
const initialState = {
  // Inicializamos el state
  total: 0,
  discount: 0,
  items: [],

  coupon: {
    percentage: 0,
    name: "",
    message: "",
  },
};
export const useStore = create<Store>()(
  devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
      //no necesitamos ni el id ni el categoryId del product porque esas propiedades no coinciden la con firma ShoppinCart
      const { id: productId, categoryId, ...data } = product;
      let itemsCart: ShoppingCart = [];
      const currentSate = get(); //Devuelve un objeto de tipo Store
      //console.log({ currentSate });
      const duplicated = currentSate.items.findIndex(
        (item) => item.productId === productId
      );
      if (duplicated >= 0) {
        //! si el producto ya existe en el cart

        //Validamos la existencia, y la cantidad solicitada es mayor a la existente en inventario no hace nada
        if (
          currentSate.items[duplicated].quantity >=
          currentSate.items[duplicated].inventory
        )
          return;
        itemsCart = currentSate.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //! si el producto es nuevo en el cart
        itemsCart = [...currentSate.items, { ...data, productId, quantity: 1 }];
      }
      //!actualizamos el store
      set(() => ({ items: itemsCart }));

      //Actualizamos el total
      get().calculateTotal();
    },
    updateQuantity: (id, quantity) => {
      //console.log({id},{quantity})
      const itemsCart = get().items.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      );
      //!actualizamos el store
      set(() => ({ items: itemsCart }));
      // Otra opcion en una sola linea
      //set((state) => ({items: state.items.map((item) => item.productId === id ? { ...item, quantity } : item)}));

      //!Actualizamos el total
      get().calculateTotal();
    },
    removeFromCart: (id) => {
      console.log(`Eliminando...${id}`);
      const itemsCart = get().items.filter((item) => item.productId !== id);
      set(() => ({ items: itemsCart }));
      //Otra manera:
      //set((state)=>({items : state.items.filter((item)=>item.productId!==id)}))

      //! SI el carrito ya no tiene items restauramos el state
      console.log(!get().items.length)
      console.log(get().items.length)
      
      //!get().items.length
      if (get().items.length===0) {
        console.log(`se limpio el store.`)
        console.log(!get().items.length===true)
        get().clearOrder()
      }
      //!Actualizamos el total
      get().calculateTotal();
    },
    calculateTotal: () => {
      //Una manera de hacerlo:
      // const totalCart = get().items.reduce(
      //   (total, item) => total + item.price * item.quantity,
      //   0
      // );
      // set(()=>({total: totalCart}))

      set((state) => ({
        total: state.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),
      }));

      if (get().coupon.percentage) {
        get().applyDiscount();
      }
    },
    applyCoupon: async (couponName) => {
      //console.log(`Desde el store ${couponName}`)
      //la carpeta raiz es /app
      const req = await fetch(`/coupons/api`, {
        method: "POST",
        body: JSON.stringify({ coupon_name: couponName }),
      });
      const json = await req.json();
      const coupon = CouponResponseSchema.parse(json);
      //console.log(`Desde el store ${JSON.stringify(coupon)}`)
      set(() => ({ coupon: coupon }));
      if (get().coupon.percentage) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const subTotalAmount = get().items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      console.log({ subTotalAmount });
      const discount = (get().coupon.percentage / 100) * subTotalAmount;
      console.log({ discount });
      const total = subTotalAmount - discount;
      console.log({ total });
      set(() => ({ total: total, discount: discount }));
    },
    clearOrder: ()=> {
      set(()=>({
        //devolvemos el objeto initialState que tiene los valores iniciales.
        ...initialState
      }))
    }
  }))
);
