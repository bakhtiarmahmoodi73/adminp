export interface ExchangeState {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  step: number; 
}

export interface ExchangeFormData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
}