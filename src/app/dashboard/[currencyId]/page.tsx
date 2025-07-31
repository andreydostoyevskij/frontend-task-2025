// app/dashboard/[currencyId]/page.tsx
import { fetchCurrencies, fetchBalances } from "@/services/api";
import { notFound } from "next/navigation";

export default async function CurrencyDetail({
  params,
}: {
  params: { currencyId: string };
}) {
  const currencies = await fetchCurrencies();
  const balances = await fetchBalances();

  const currency = currencies.find((c) => c.id === params.currencyId);
  if (!currency) return notFound();

  const balance =
    balances.find((b) => String(b.currency_id) === String(currency.id))
      ?.amount ?? 0;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{currency.name}</h1>
      <p className="text-lg text-gray-300 theme-member:text-member theme-partner:text-partner">
        {currency.code} — {currency.symbol}
      </p>
      <p className="mt-2 text-gray-300 theme-member:text-member theme-partner:text-partner">
        Balance: {balance}
      </p>
    </div>
  );
}
