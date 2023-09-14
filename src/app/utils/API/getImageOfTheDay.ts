import { ImageOfTheDay, ImageOfTheDayParams } from '@/app/types/imageOfTheDay';

export const getImageOfTheDay = async (params: ImageOfTheDayParams | null = null) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_IMAGE_OF_THE_DAY_BASE_URL}${process.env.NEXT_PUBLIC_API_KEY}${
        params ? `&date=${params.date}` : ''
      }`,
      { cache: 'no-cache' }
    );

    if (callApi.ok) {
      const data: ImageOfTheDay = await callApi.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
