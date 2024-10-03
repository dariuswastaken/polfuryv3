module.exports = {
  async updateRankRoles(user, rank) {
    await user.roles.remove([
      '1094603198695755816',
      '1094603197718478938',
      '1094603196510523434',
      '1260499655117242408',
      '1094603192945344522',
      '1103425484928323704'
    ]);
    const ranks = {
      'Cadet': '1094603198695755816',
      'Agent': '1094603197718478938',
      'Agent Principal': '1094603196510523434',
      'Agent Sef Principal': '1260499655117242408',
    };
    await user.roles.add(ranks[rank]);
  },
  async updateRankRolesCI(user, rank) {
    await user.roles.remove([
      '1094603198695755816',
      '1094603197718478938',
      '1094603196510523434',
      '1260499655117242408',
      '1094603192945344522',
      '1103425484928323704'
    ]);
    const ranks = {
      'Inspector': '1094603193985540157',
      'Comisar': '1094603190911123517'
    }
    switch(rank) {
      case 'Inspector':
        await user.roles.add(ranks['Inspector']);
        await user.roles.add('1103425484928323704')
        break;
      case 'Comisar':
        await user.roles.add(ranks['Comisar']);
        await user.roles.add('1094603192945344522')
        break;
    }
  }
};
