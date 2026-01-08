import Heading from "@/components/ui/Heading";
import TransactionSummary from "@/components/transactions/TransactionSumarry";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { TransactionsResponseSchema } from "@/schemas/schemas";

const getMyTransactions = async () => {
  const cookieStore = await cookies();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/my`;
  const req = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const json = await req.json();
  return TransactionsResponseSchema.parse(json);
};

export default async function PurchasesPage() {
  const user = await getCurrentUser();

  // Protección de ruta: redirigir si no autenticado
  if (!user) {
    redirect("/?auth=login");
  }

  const transactions = await getMyTransactions();

  return (
    <div className="px-10 pt-10 pb-32">
      <Heading>Mis Compras</Heading>

      {transactions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No tienes compras registradas</p>
          <p className="text-gray-400 mt-2">
            Explora nuestros productos y realiza tu primera compra
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <TransactionSummary
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
