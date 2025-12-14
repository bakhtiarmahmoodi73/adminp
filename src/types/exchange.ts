// types/exchange.ts
export interface ExchangeState {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  step: number; // 1: Exchange, 2: Confirm, 3: Complete
}

export interface ExchangeFormData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
}