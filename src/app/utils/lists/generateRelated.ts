export const generateRelatedItems = <T>(array: T[]): T[] | { error: string } => {
  if (array.length < 4) {
    return { error: 'Sample size is too small' };
  }

  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const selectedItems = shuffledArray.slice(0, 4);
  return selectedItems;
};
