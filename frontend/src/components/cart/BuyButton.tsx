'use client'

import { useAuthModalStore } from "@/store/auth-modal.store"
import { useRouter } from "next/navigation"

interface Props {
    isAuthenticated: boolean
}

export const BuyButton=({isAuthenticated}:Props)=>{

    const router=useRouter()
    const openAuthModal =useAuthModalStore((state)=>state.open)

    const handleClick=()=>{
        
        //! si no esta autenticado
        if(!isAuthenticated) {
            openAuthModal('login','/checkout')
            return
        }
        //! si est aautenticado
        router.push('/checkout')
    }

    return(
        <button
        onClick={handleClick}
        className="bg-black text-white px-4 py-2 rounded"
        >Comprar</button>
    )
}