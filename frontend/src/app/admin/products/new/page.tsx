import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import Link from 'next/link'

function NewProductPage() {
  return (
    <><Link
      href={'/admin/products'}
      className="rounded bg-green-400 font-bold py-2 px-10"
    >Volver</Link>
    <Heading>Nuevo Producto</Heading>
    <AddProductForm>
        {/* Este componente se renderiza en el servidor a pesar de que el componente padre es un "use client" */}
        {/* NewProductPage y ProductForm son server components y AddProductButton es un componente del cliente */}
        <ProductForm/> 
    </AddProductForm>
    </>
    
  )
}

export default NewProductPage