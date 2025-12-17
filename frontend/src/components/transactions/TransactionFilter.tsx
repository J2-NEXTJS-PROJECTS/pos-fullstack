"use client";
import { useState } from "react";
import { format } from "date-fns";
//import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/api";
import TransactionSummary from "./TransactionSumarry";
import { formatCurrency } from "@/utils/utils";
import dynamic from "next/dynamic";

//!Para que el componente solo se renderice en el cliente y ya no SSR para evitar errores de Hydration
const Calendar =dynamic(()=> import("react-calendar"), {ssr: false})
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export const TransactionFilter = () => {
  const [date, setDate] = useState<Value>(new Date());
  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd");
  //const formattedDate =date instanceof Date ? format(date, "yyyy-MM-dd") : new Date();
  //console.log(formattedDate)
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  const total=data?.reduce((total,transaction)=>total+ Number(transaction.total),0) ?? 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar
          value={date}
          onChange={setDate}
          //locale="es-ES" // 👈 fuerza siempre español
        />
      </div>

      {isLoading && <p>Cargando...</p>}
      <div>
        {data
          ? data?.length
            ? data.map((transaction, ix) => (
                <TransactionSummary key={ix} transaction={transaction} />
              ))
            : "No hay ventas en esta fecha"
          : null}
          <p className="my-5 text-lg font-bold text-right">Total del dia: {''}
            <span className="font-normal">
            {formatCurrency(total)}
            </span></p>
      </div>
    </div>
  );
};
