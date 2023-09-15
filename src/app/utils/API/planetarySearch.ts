import { PlanetaryDataApiResponse } from '@/app/types/planetaryData';

export const planetarySearch = async (params: string | null = null) => {
  try {
    const callApi = await fetch(`${process.env.NEXT_PUBLIC_PLANETARY_SEARCH_BASE_URL}${params ? `&q=${params}` : ''}`, {
      cache: 'no-cache',
    });

    if (callApi.ok && callApi.status !== 400) {
      const data: PlanetaryDataApiResponse = await callApi.json();
      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};
