export const getMarsWeather = async (params?: string) => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_MARS_WEATHER_BASE_URL}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&feedtype=json&ver=1.0`,
      {
        cache: 'default',
        keepalive: true,
      }
    );

    if (callApi.ok && callApi.status !== 400) {
      const parseData = await callApi.json();
      return parseData;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
