module.exports = {
  async percentage(min, max) {
    let percentage = (min / max) * 100;
    return percentage.toFixed(2);
  },
  async calculateAverageMin(min, days) {
    return (min / days).toFixed(2);
  },
};
