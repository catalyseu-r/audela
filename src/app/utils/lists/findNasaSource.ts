export const findNasaSource = (
  id: number | null,
  array: {
    id: number;
    source: string;
    bio: string;
    static: string;
  }[]
) => array.find((item) => item.id === id);
