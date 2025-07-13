// lib\stores\currencyStore.ts
import { create } from 'zustand';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

type CurrencyStore = {
  userCurrency: string | null;
  setUserCurrency: (currency: string) => void;
  initialized: boolean;
  setInitialized: () => void;
  isLoading: boolean;
  isError: boolean;
  exchangeInfo: ExchangeInfo | null;
  setLoading: (value: boolean) => void;
  setError: (value: boolean) => void;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
};
export const useCurrencyStore = create<CurrencyStore>((set) => ({
  userCurrency: null,
  setUserCurrency: (currency) => set({ userCurrency: currency }),
  initialized: false,
  setInitialized: () => set({ initialized: true }),
  isLoading: false,
  isError: false,
  exchangeInfo: null,
  setLoading: (value) => set({ isLoading: value }),
  setError: (value) => set({ isError: value }),
  setExchangeInfo: (info) => set({ exchangeInfo: info }),
}));
