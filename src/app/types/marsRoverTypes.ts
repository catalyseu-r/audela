export interface MarsRoverProfile {
  id: number;
  name: string;
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
  latest?: boolean;
}
