import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExchangeState, ExchangeFormData } from '../../types/exchange';

const initialState: ExchangeState = {
  fromCurrency: 'tether',
  toCurrency: 'permoney',
  fromAmount: '',
  toAmount: '',
  step: 1,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.fromAmount = action.payload;
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.toAmount = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setExchangeFormData: (state, action: PayloadAction<ExchangeFormData>) => {
      state.fromCurrency = action.payload.fromCurrency;
      state.toCurrency = action.payload.toCurrency;
      state.fromAmount = action.payload.fromAmount;
      state.toAmount = action.payload.toAmount;
    },
    swapCurrencies: (state) => {
      const tempCurrency = state.fromCurrency;
      state.fromCurrency = state.toCurrency;
      state.toCurrency = tempCurrency;
      
      const tempAmount = state.fromAmount;
      state.fromAmount = state.toAmount;
      state.toAmount = tempAmount;
    },
    resetExchange: () => initialState,
  },
});

export const {
  setFromCurrency,
  setToCurrency,
  setFromAmount,
  setToAmount,
  setStep,
  setExchangeFormData,
  swapCurrencies,
  resetExchange,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;