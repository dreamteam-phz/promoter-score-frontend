export const differenceInDays = (date, period) => {
  const currentDate = new Date();
  const oneDay = 86400000;
  const difInMil = currentDate - new Date(date);
  const difInDays = Math.round(difInMil / oneDay);

  return difInDays < period;
};
