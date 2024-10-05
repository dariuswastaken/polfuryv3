module.exports = {
  async motivConcediu({ pulsar, interaction, utils, mongo }) {
    const motivInput = interaction.fields.getTextInputValue('m-concediu-motiv');
    const chars = motivInput.split('').length;
    if (chars < 5) {
      await utils.discord.errors.invalidReasonLengthError(pulsar, interaction);
      return 'invalid';
    }
  }
};
