export const sortByDate = (data: any[], isAscOrDesc: 'asc' | 'desc' = 'desc') => {
  const dateFromString = (dateString: string): number => new Date(dateString).getTime();

  const loopThroughData = data.sort((first, second) => {
    const dateA = dateFromString(first.data[0].date_created);
    const dateB = dateFromString(second.data[0].date_created);

    if (isAscOrDesc === 'asc') {
      return dateA - dateB;
    } else return dateB - dateA;
  });
  return loopThroughData;
};
