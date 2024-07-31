module.exports = {
  async updateRankRoles(user, rank) {
    await user.roles.remove([
      '1094603198695755816',
      '1094603197718478938',
      '1094603196510523434',
      '1260499655117242408'
    ]);
    const ranks = {
      'Cadet': '1094603198695755816',
      'Agent': '1094603197718478938',
      'Agent Principal': '1094603196510523434',
      'Agent Sef Principal': '1260499655117242408'
    };
    await user.roles.add(ranks[rank]);
  }
};
