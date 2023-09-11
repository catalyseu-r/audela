export interface ImageOfTheDayParams {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: string;
  thumbs?: string;
}

export interface ImageOfTheDay {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  error?: string;
}
