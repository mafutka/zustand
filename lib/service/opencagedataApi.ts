import axios from 'axios';

type Coords = {
  latitude: number;
  longitude: number;
};

export const getUserInfo = async ({ latitude, longitude }: Coords): Promise<string | null> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  const currencyCode = data?.results?.[0]?.annotations?.currency?.iso_code;
  return currencyCode || null;
};
