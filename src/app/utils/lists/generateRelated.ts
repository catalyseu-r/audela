export const generateRelatedItems = <T>(array: T[]): T[] => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const selectedItems = shuffledArray.slice(0, 4);
  return selectedItems;
};
