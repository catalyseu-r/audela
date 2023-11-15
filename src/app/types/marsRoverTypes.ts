export interface MarsRoverProfile {
  id: number;
  name: MarsRoverSearchParams['rover'];
  landing_date: string;
  launch_date: string;
  status: 'active' | 'complete';
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: { name: string; full_name: string }[];
}

export interface MarsRoverProfiles {
  rovers: MarsRoverProfile[];
}

export interface MarsRoverSearchParams {
  rover: 'curiosity' | 'spirit' | 'opportunity' | 'perseverance';
  sol?: string;
  camera?: string;
  date?: string;
  latest?: string;
}

export interface MarsRoverPhotos {
  earth_date: string;
  id: number;
  img_src: string;
  rover: MarsRoverProfile;
  sol: number;
  cameras: { name: string; full_name: string }[];
}
