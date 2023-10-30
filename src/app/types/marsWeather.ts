export interface MarsWeatherResponse {
  sol_keys: string[];
  validity_checks: {
    [key: number]: {
      AT: { sol_hours_with_data: number[]; valid: boolean };
      HWS: {
        sol_hours_with_data: number[];
        valid: boolean;
      };
      PRE: {
        sol_hours_with_data: number[];
        valid: boolean;
      };
      WD: {
        sol_hours_with_data: number[];
        valid: boolean;
      };
      Season?: 'winter' | 'spring' | 'summer' | 'fall';
      First_UTC?: Date;
      Last_UTC?: Date;
    };
  };
}
