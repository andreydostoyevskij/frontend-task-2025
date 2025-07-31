import { Currency, Balance } from "../app/types";

const API_BASE = "https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1";

export async function fetchCurrencies(): Promise<Currency[]> {
  const res = await fetch(`${API_BASE}/currencies`);
  return res.json();
}

export async function fetchBalances(): Promise<Balance[]> {
  const res = await fetch(`${API_BASE}/balances`);
  return res.json();
}

// Combines balance and currency
export async function fetchCurrenciesWithBalances({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "",
  order = "asc",
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (sortBy) {
    params.append("sortBy", sortBy);
    params.append("order", order);
  }
  const [currencies, balances] = await Promise.all([
    fetchCurrencies(),
    fetchBalances(),
  ]);
  console.log("--- Currencies ---");
  console.log(currencies);
  console.log("--- Balances ---");
  console.log(balances);

  const combined = currencies.map((c) => {
    const matchedBalance = balances.find(
      (b) => String(b.currency_id) === String(c.id)
    );
    console.log(`Matching ${c.id} with balances:`, matchedBalance);
    return {
      ...c,
      balance: matchedBalance?.amount ?? 0,
    };
  });
  return combined;
}
