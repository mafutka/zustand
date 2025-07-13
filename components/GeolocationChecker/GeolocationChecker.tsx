'use client';

import { useEffect } from 'react';
import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { userCurrency, setUserCurrency } = useCurrencyStore();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      try {
        const data = await getUserInfo(coords);

        const currency = data?.results?.[0]?.annotations?.currency?.iso_code;

        if (currency) {
          setUserCurrency(currency);
        } else {
          setUserCurrency('USD');
        }
      } catch {
        setUserCurrency('USD');
      }
    };

    const error = () => {
      setUserCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [userCurrency, setUserCurrency]);

  return null;
}
