import { ImageOfTheDayParams } from '@/app/types/imageOfTheDay';

export const getImageOfTheDay = async (params?: ImageOfTheDayParams) => {
  const customErrorObj = {
    error: 'Something went wrong with network request!',
  };
  try {
    const callApi = await fetch(
      `${process.env.IMAGE_OF_THE_DAY_BASE_URL}${process.env.API_KEY}${params ? params : ''}`
    );

    const data = callApi.json();

    return data;
  } catch (error) {
    console.log(error);
    return customErrorObj;
  }
};
