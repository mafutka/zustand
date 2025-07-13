'use client';

import { useState } from 'react';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
  const [inputValue, setInputValue] = useState('');
  const { setExchangeInfo, setError, setLoading } = useCurrencyStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regex = /^(\d+(?:\.\d{1,2})?)\s([a-zA-Z]{3})\sin\s([a-zA-Z]{3})$/;
    const match = inputValue.trim().match(regex);

    if (!match) {
      setError(true);
      setExchangeInfo(null);
      return;
    }

    const [, amountStr, from, to] = match;
    const amount = parseFloat(amountStr);

    try {
      setLoading(true);
      setError(false);
      setExchangeInfo(null);

      const response = await exchangeCurrency({ amount, from, to });

      setExchangeInfo(response);
    } catch {
      setError(true);
      setExchangeInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format: 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
