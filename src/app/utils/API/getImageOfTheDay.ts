import { ImageOfTheDay, ImageOfTheDayParams } from '@/app/types/imageOfTheDay';

export const getImageOfTheDay = async (params: ImageOfTheDayParams | null = null) => {
  // make params triage
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_IMAGE_OF_THE_DAY_BASE_URL}${process.env.NEXT_PUBLIC_API_KEY}${
        params ? `&date=${params.date}&concept_tags=true&thumbs=true` : ''
      }`,
      { cache: 'no-cache', keepalive: true }
    );

    if (callApi.ok && callApi.status !== 400) {
      const data: ImageOfTheDay = await callApi.json();
      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};
