import React from "react";
import { TransactionFilter } from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { getSalesByDate } from "@/api/api";

export default async function SalesPage() {
  const queryClient = new QueryClient();
  //ventas de hoy por defaulkt
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-lg">En esta seccion apareceran las ventas</p>
      <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
      <TransactionFilter />
    </>
  );
}
