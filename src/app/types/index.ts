// types/index.ts
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  code: string;
  balance?: number;
}

export interface Balance {
  id: string;
  currency_id: string;
  amount: number;
}
