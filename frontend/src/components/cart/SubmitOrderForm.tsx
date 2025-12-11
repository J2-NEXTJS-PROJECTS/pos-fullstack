import React, { useActionState, useEffect } from "react";
import { submitOrder } from "../../../actions/submit-order-action";
import { useStore } from "@/store/store";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <input
      type="submit"
      //className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase"
    className={`mt-5 w-full ${pending ? 'bg-gray-400' :'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}  text-white uppercase`}
      
      value={`${pending ? "Enviando Orden..." : "Confirmar Compra"}`}
      disabled={pending}
    />
  );
};
export const SubmitOrderForm = () => {
  const total = useStore((state) => state.total);
  const items = useStore((state) => state.items);
  const coupon = useStore((state) => state.coupon.name);
  const clearOrder = useStore(state=>state.clearOrder)
  const order = {
    total,
    coupon,
    items,
  };

  const submitOrderWithData = submitOrder.bind(null, order);
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });
  //console.log({ state });
  useEffect(()=>{
    if (state.errors) {
        state.errors.forEach((err)=>toast.error(err))
    }
    if (state.success) {
        toast.success(state.success)
        //!Limpiamos la orden
        clearOrder()
    }
  })
  return (
    <form action={dispatch}>
      {/* <input
        type="submit"
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase"
        value="Confirmar Compra"
      /> */}
      <SubmitButton />
      {state.success && <p className="text-gray-500">{state.success}</p>}
      {state.errors.map((err, ix) => (
        <p className="text-red-500" key={ix}>
          {err}
        </p>
      ))}
    </form>
  );
};
