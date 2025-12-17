import { z } from "zod";

//?Objetos para tener tipado y verificacion de firma
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(), //“Convierte cualquier valor compatible (string) a number antes de validar”
  inventory: z.number(),
  categoryId: z.number(),
});
//?Objetos para tener tipado y verificacion de firma
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
});
//?Objetos para tener tipado y verificacion de firma
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

//!extendemos el schema de category añadiendole el campo relacionado products
//?Objetos para tener tipado y verificacion de firma
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
});

//CReamos una interfaz para Categories
export const CategoriesResponseSchema = z.array(CategorySchema);

/** Shopping Cart**/
//Con pick creamos un schema a partir de otro. Desde ProductSchema solo quiero:
const ShoppingCartItemsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  inventory: true,
}).extend({
  //con extend agregamos ampos propios:
  productId: z.number(),
  quantity: z.number(),
});

//?Objetos para tener tipado y verificacion de firma
export const ShoppingCartSchema = z.array(ShoppingCartItemsSchema);

//schema para cupones porque las respuesta de cupon valido e invalido son distintas y este schema ayuda a unificarlos con valores default.
//?Objetos para tener tipado y verificacion de firma
export const CouponResponseSchema = z.object({
  name: z.string().default(""),
  message: z.string(),
  percentage: z.coerce.number().min(0).max(100).default(0),
});

const OrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  items: z
    .array(OrderItemSchema)
    .min(1, { message: "El Carrito no puede ir vacio" }),
});

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string(),
});
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

export const ItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.string(),
  product: ProductSchema,
});
export const TransactionResponseSchema = z.object({
  id: z.number(),
  total: z.string(),
  transactionDate: z.string(),
  discount: z.string(),
  coupon: z.string().nullable(),
  items: z.array(ItemSchema),
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

//!objeto para verificacion de formularios
export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del Producto no puede ir vacio" }),
  price: z.coerce
    .number({ message: "Precio no válido" })
    .min(1, { message: "El Precio debe ser mayor a 0" }),
  image: z.string({ message: "Imagen es obligatoria" }),
  inventory: z.coerce
    .number({ message: "Inventario no válido" })
    .min(1, { message: "El inventario debe ser mayor a 0" }),
  categoryId: z.coerce.number({ message: "La Categoria no es válida" }),
});

//De esta manera podemos crear una Interfaz de TypeScript para una Prop  de un componente o una propiedad en un objeto
export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartItemsSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
