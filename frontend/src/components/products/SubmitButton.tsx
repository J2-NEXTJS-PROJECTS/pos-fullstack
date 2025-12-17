import { useFormStatus } from "react-dom";

export const SubmitButton = ({origin}:{origin:string}) => {
  const { pending } = useFormStatus();
  return (
    <input
      type="submit"
      className={`rounded font-bold py-2 w-full ${
        pending
          ? "bg-gray-400"
          : "bg-green-400 cursor-pointer"
      }`}
      value={
        origin==="add" ? (`${pending ? "Guardando..." : "Grabar"}`) : (`${pending ? "Actualizando..." : "Actualizar"}`)
        }
      disabled={pending}
    />
  );
};