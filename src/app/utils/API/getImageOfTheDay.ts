import { ImageOfTheDay, ImageOfTheDayParams } from '@/app/types/imageOfTheDay';

interface CustomErrorObj {
  error: string;
}

export const getImageOfTheDay: (params: ImageOfTheDayParams) => Promise<ImageOfTheDay | CustomErrorObj> = async (
  params?
) => {
  const customErrorObj: CustomErrorObj = {
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
