export const percentage = async (min, max) => {
  let percentage = (min / max) * 100;
  return percentage.toFixed(2);
};

export const calculateAverageMin = async (min, days) => {
  return (min / days).toFixed(2);
};
