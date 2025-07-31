// app/dashboard/components/CurrencyCard.tsx
import { Currency } from "../types";
import Link from "next/link";

export default function CurrencyCard({ currency }: { currency: Currency }) {
  return (
    <Link href={`/dashboard/${currency.id}`}>
      <div className="p-4 border rounded-xl shadow hover:shadow-lg transition">
        <div className="text-xl font-bold">
          {currency.name} ({currency.code})
        </div>
        <div className="text-sm text-gray-500">{currency.symbol}</div>
        <div className="text-green-600 mt-2">Balance: {currency.balance}</div>
      </div>
    </Link>
  );
}
