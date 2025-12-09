import { Product, ShoppingCart } from "@/schemas/schemas";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Store {
  total: number;
  items: ShoppingCart;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  calculateTotal: () => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    // Inicializamos el state
    total: 0,
    items: [],
    addToCart: (product) => {
      //no necesitamos ni el id ni el categoryId del product porque esas propiedades no coinciden la con firma ShoppinCart
      const { id: productId, categoryId, ...data } = product;
      let itemsCart: ShoppingCart = [];
      const currentSate = get(); //Devuelve un objeto de tipo Store
      console.log({ currentSate });
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
      get().calculateTotal()
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
      get().calculateTotal()
    },
    removeFromCart: (id) => {
      console.log(`Eliminando...${id}`);
      const itemsCart = get().items.filter((item) => item.productId !== id);
      set(() => ({ items: itemsCart }));
      //Otra manera:
      //set((state)=>({items : state.items.filter((item)=>item.productId!==id)}))
      
      //!Actualizamos el total
      get().calculateTotal()
    },
    calculateTotal: () => {
      //Una manera de hacerlo:
      // const totalCart = get().items.reduce(
      //   (total, item) => total + item.productId * item.quantity,
      //   0
      // );
      // set(()=>({total: totalCart}))

      set((state) => ({
        total: state.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),
      }));
    },
  }))
);
