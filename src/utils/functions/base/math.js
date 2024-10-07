module.exports = {
  percentage: async (min, max) => {
    let percentage = (min / max) * 100;
    return percentage.toFixed(2);
  },
  
  calculateAverageMin: async (min, days) => {
    return (min / days).toFixed(2);
  }
};
