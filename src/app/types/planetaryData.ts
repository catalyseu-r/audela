export interface PlanetaryDataArticleBody {
  center: string;
  title: string;
  nasa_id: string;
  media_type: string;
  keywords: string[];
  date_created: string;
  description_508: string;
  description: string;
  secondary_creator: string;
  photographer: string;
}

export interface PlanetaryDataArticle {
  href: string;
  data: PlanetaryDataArticleBody[];
  links: [
    { href: string; rel: string; render: string },

    {
      href: string;
      rel: string;
    }
  ];
}

export interface PlanetaryDataApiResponse {
  collection: {
    version: string;
    href: string;
    items: PlanetaryDataArticle[];
    metadata: {
      total_hits: number;
    };
    links?: {
      0: {
        rel: string;
        prompt: string;
        href: string;
      };
    };
  };
}
