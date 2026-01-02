"use client";
import React, { useActionState, useEffect } from "react";
import { useAuthModalStore } from "@/store/auth-modal.store";
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
      className={`mt-5 w-full ${
        pending
          ? "bg-gray-400"
          : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
      }  text-white uppercase`}
      value={`${pending ? "Enviando Orden..." : "Confirmar Compra"}`}
      disabled={pending}
    />
  );
};
export const SubmitOrderForm = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const openAuthModal = useAuthModalStore((state) => state.open);
  //const isOpen = useAuthModalStore((state) => state.isOpen);
  const total = useStore((state) => state.total);
  const items = useStore((state) => state.items);
  const coupon = useStore((state) => state.coupon.name);
  const clearOrder = useStore((state) => state.clearOrder);
  const closeAuthModal = useAuthModalStore((state) => state.close);
  const order = {
    total,
    coupon,
    items,
  };

  const submitOrderWithData = submitOrder.bind(null, order);
  //! typeof document !== "undefined" solo si esta en el navegador (o sea si esta en el DOM) es igual a true, ya que en el servidor el objeto document no existe
  //const isAuthenticated = typeof document !== "undefined" && document.cookie.includes("access_token");

  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });

  // useEffect(() => {
  //   if (state.errors) {
  //     state.errors.forEach((err) => toast.error(err));
  //   }
  //   if (state.success) {
  //     toast.success(state.success);
  //     //!Limpiamos la orden
  //     clearOrder();
  //   }
  // });
  // Errores
  useEffect(() => {
    if (!state.errors?.length) return;

    state.errors.forEach((err) => toast.error(err));
  }, [state.errors]);

  // Éxito
  useEffect(() => {
    if (!state.success) return;

    toast.success(state.success);
    clearOrder();
  }, [state.success, clearOrder]);
  // Autenticación
  useEffect(() => {
    //! Si esta autenticado cerramos el modal
    if (isAuthenticated) closeAuthModal();
  }, [isAuthenticated, closeAuthModal]);
  return (
    <form
      action={isAuthenticated ? dispatch : undefined}
      onSubmit={(e) => {
        if (!isAuthenticated) {
          e.preventDefault();
          openAuthModal("login");
        }
      }}
    >
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
