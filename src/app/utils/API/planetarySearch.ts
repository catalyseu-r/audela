import { PlanetaryDataApiResponse } from '@/app/types/planetaryData';

interface PlanetarySearchParams {
  query?: string;
  nasa_id?: string;
}

export const planetarySearch = async ({ query = '', nasa_id = '' }: PlanetarySearchParams) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_PLANETARY_SEARCH_BASE_URL}${query ? `&q=${query}` : ' '}${
        nasa_id ? `&nasa_id=${nasa_id}` : ''
      }`,
      {
        cache: 'no-cache',
      }
    );

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
