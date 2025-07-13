'use client';
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import Loader from '@/components/Loader/Loader';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

import css from './page.module.css';

export default function Home() {
  const { isLoading, isError, exchangeInfo } = useCurrencyStore();

  return (
    <main className={css.main}>
      <GeolocationChecker />
      <Section>
        <Container>
          <ExchangeForm />

          {isLoading && <Loader />}

          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}

          {exchangeInfo && (
            <ExchangeInfo
              amount={exchangeInfo.amount}
              from={exchangeInfo.from}
              to={exchangeInfo.to}
              rate={exchangeInfo.rate}
              result={exchangeInfo.result}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
