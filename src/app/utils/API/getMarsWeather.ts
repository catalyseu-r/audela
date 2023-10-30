export const getMarsWeather = async (params?: string) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_MARS_WEATHER_BASE_URL}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&feedtype=json&ver=1.0`
    );

    const parseData = await callApi.json();

    if (callApi.ok) {
      return parseData;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
