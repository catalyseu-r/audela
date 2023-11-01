interface MarsRoverProfile {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: { name: string; full_name: string }[];
}

interface MarsRoverSearchParams {
  rover: 'curiosity' | 'spirit' | 'opportunity' | 'perseverance';
  sol?: string;
  camera?: string;
  date?: string;
  latest?: boolean;
}

export const getMarsRoversInfo = async () => {
  try {
    const callApi = await fetch(
      `${process.env.NEXT_PUBLIC_MARS_ROVER_PHOTOS_BASE_URL}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      { cache: 'force-cache' }
    );

    if (callApi.ok && callApi.status !== 400) {
      const parseData: MarsRoverProfile[] = await callApi.json();
      return parseData;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('error with data fetching:', error);
  }
};

export const getMarsRoverImages = async (params: MarsRoverSearchParams) => {
  const baseCall = `${process.env.NEXT_PUBLIC_MARS_ROVER_PHOTOS_BASE_URL}/${params.rover}/${
    params.latest ? `latest_photos` : `photos`
  }?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const callApi = await fetch(
      `${baseCall}${params.sol ? `&sol=${params.sol}` : ``}
      ${params.camera ? `&camera=${params.camera}` : ``}
      ${params.date ? `&earth_date=${params.date}` : ``}`,

      { keepalive: true, cache: 'default' }
    );
    if (callApi.ok && callApi.status !== 400) {
      const parseData = await callApi.json();

      return parseData;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('error with data fetching:', error);
  }
};
