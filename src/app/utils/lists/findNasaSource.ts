export const findNasaSource = (
  id: number | null,
  array: {
    id: number;
    source: string;
    bio: string;
  }[]
) => array.find((item) => item.id === id);
