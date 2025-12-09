import { z } from "zod";
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(), //“Convierte cualquier valor compatible (string) a number antes de validar”
  inventory: z.number(),
  categoryId: z.number(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

//!extendemos el schema de category añadiendole el campo relacionado products
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

export const ShoppingCartSchema = z.array(ShoppingCartItemsSchema)

//De esta manera podemos crear una Interfaz de TypeScript para una Prop  de un componente o una propiedad en un objeto
export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem=z.infer<typeof ShoppingCartItemsSchema>