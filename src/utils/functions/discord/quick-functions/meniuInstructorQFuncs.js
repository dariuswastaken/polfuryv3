module.exports = {
  async addCertificat({ interaction, mongo, targetID, certificat }) {
    const targetUser = await interaction.guild.members.fetch(targetID);
    switch (certificat) {
      case 'radio':
        await mongo.updateCertificate(targetID, 'radio', true);
        break;
      case 'moto':
        await mongo.updateCertificate(targetID, 'moto', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102707472344559638'
        ]);
        break;
      case 'pilot':
        await mongo.updateCertificate(targetID, 'pilot', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102708810247847987'
        ]);
        break;
      case 'highspeed':
        await mongo.updateCertificate(targetID, 'highspeed', true);
        await targetUser.roles.add([
          '1103417201182113793',
          '1102706216985178122'
        ]);
        break;
      case 'mdt':
        await mongo.updateCertificate(targetID, 'mdt', true);
        break;
    }
  },
  async removeCertificat({ interaction, mongo, targetID, certificat }) {
    const targetUser = await interaction.guild.members.fetch(targetID);
    switch (certificat) {
      case 'radio':
        await mongo.updateCertificate(targetID, 'radio', false);
        break;
      case 'moto':
        await mongo.updateCertificate(targetID, 'moto', false);
        await targetUser.roles.remove(['1102707472344559638']);
        break;
      case 'pilot':
        await mongo.updateCertificate(targetID, 'pilot', false);
        await targetUser.roles.remove(['1102708810247847987']);
        break;
      case 'highspeed':
        await mongo.updateCertificate(targetID, 'highspeed', false);
        await targetUser.roles.remove(['1102706216985178122']);
        break;
      case 'mdt':
        await mongo.updateCertificate(targetID, 'mdt', false);
        break;
    }
  }
};
