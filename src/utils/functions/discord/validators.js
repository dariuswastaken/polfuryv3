module.exports = {
  async formIntrare({ pulsar, interaction, utils, mongo }) {
    const nameInput = interaction.fields.getTextInputValue('form-intrare-nume');
    const idInput = interaction.fields.getTextInputValue('form-intrare-id');
    const tokenInput =
      interaction.fields.getTextInputValue('form-intrare-token');

    const validateArgsCount = await utils.checks.validateTwoArguments(
      nameInput
    );
    if (!validateArgsCount) {
      await utils.discord.errors.invalidNameArgumentsError(pulsar, interaction);
      return 'invalid';
    }

    if (!parseInt(idInput)) {
      await utils.discord.errors.invalidIdTypeError(pulsar, interaction);
      return 'invalid';
    }

    const token = await mongo.getToken(tokenInput);
    if (!token || token.IDDiscord !== interaction.user.id) {
      await utils.discord.errors.invalidTokenError(pulsar, interaction);
      return 'invalid';
    }

    const tokenExpiryDate = new Date(token.expiresAt);
    if (tokenExpiryDate < new Date()) {
      await utils.discord.errors.tokenExpiredError(pulsar, interaction);
      return 'invalid';
    }

    const firstName = nameInput.split(' ')[0];
    const lastName = nameInput.split(' ')[1];

    const formattedName = `${firstName.slice(0, 1).toUpperCase()}${firstName
      .slice(1)
      .toLowerCase()} ${lastName.slice(0, 1).toUpperCase()}${lastName
      .slice(1)
      .toLowerCase()}`;

    return {
      formattedName: formattedName,
      serverID: parseInt(idInput)
    };
  },
  async formTrecereTest({ pulsar, interaction, utils, mongo }) {
    const idInput = interaction.fields.getTextInputValue(
      'form-trecere-test-id'
    );
    const rezultatInput = interaction.fields.getTextInputValue(
      'form-trecere-test-rezultat'
    );

    try {
      await interaction.guild.members.fetch(idInput);
    } catch (error) {
      await utils.discord.errors.invalidDiscordIdError(pulsar, interaction);
      return 'invalid';
    }

    const profileAcademie = await mongo.getProfileAcademician(idInput);
    if (!profileAcademie) {
      await utils.discord.errors.userNotInAcademy(pulsar, interaction);
      return 'invalid';
    }

    const resultOptionKeys = ['acceptat', 'admis', 'refuzat', 'respins'];

    if (!resultOptionKeys.includes(rezultatInput.toLowerCase())) {
      await utils.discord.errors.invalidResultError(pulsar, interaction);
      return 'invalid';
    }

    if (
      rezultatInput.toLowerCase() === 'acceptat' ||
      rezultatInput.toLowerCase() === 'admis'
    )
      return {
        result: true
      };
    if (
      rezultatInput.toLowerCase() === 'refuzat' ||
      rezultatInput.toLowerCase() === 'respins'
    )
      return {
        result: false
      };
  },
  async motivConcediu({ pulsar, interaction, utils, mongo }) {
    const motivInput = interaction.fields.getTextInputValue('m-concediu-motiv');
    const chars = motivInput.split('').length;
    if (chars < 5) {
      await utils.discord.errors.invalidReasonLengthError(pulsar, interaction);
      return 'invalid';
    }
  },
  async callsignInput({ pulsar, interaction, utils, mongo }) {
    const callsignInput = interaction.fields.getTextInputValue(
      'm-sanction-callsign-input'
    );
    const profile = await mongo.getProfileByCallsign(callsignInput);
    if (!profile) {
      await utils.discord.errors.invalidCallsignError(pulsar, interaction);
      return 'invalid';
    }
    if (profile.corp === 'CONDUCERE') {
      await utils.discord.errors.invalidSanctionPermError(pulsar, interaction);
      return 'invalid';
    }
    return {
      profile: profile
    };
  },
  async reasonInput({ pulsar, interaction, utils }) {
    const reasonInput = interaction.fields.getTextInputValue(
      'm-sanction-reason-input'
    );
    const chars = reasonInput.split('').length;
    if (chars < 5) {
      await utils.discord.errors.invalidReasonLengthError(pulsar, interaction);
      return 'invalid';
    }
    return {
      reason: reasonInput
    };
  },
  async callsignInputSubdep({
    pulsar,
    interaction,
    utils,
    mongo,
    subdep,
    type,
    modalType
  }) {
    const callsignInput = interaction.fields.getTextInputValue(
      `m-instr-${subdep}-callsign-input`
    );
    const profile = await mongo.getProfileByCallsign(callsignInput);
    if (!profile) {
      await utils.discord.errors.invalidCallsignError(pulsar, interaction);
      return 'invalid';
    }

    if (modalType === 'add') {
      if (profile.functii.includes(type)) {
        await utils.discord.errors.alreadyHasFuncError(pulsar, interaction);
        return 'invalid';
      }
    } else if (modalType === 'remove') {
      if (!profile.functii.includes(type)) {
        await utils.discord.errors.doesNotHaveFuncError(pulsar, interaction);
        return 'invalid';
      }
    }

    if (profile.grad === 'Cadet') {
      await utils.discord.errors.invalidFuncRankError(pulsar, interaction);
      return 'invalid';
    }
    return {
      profile: profile
    };
  },
  async callsignInputInstrActivity({
    pulsar,
    interaction,
    utils,
    mongo,
    subdep
  }) {
    const callsignInput = interaction.fields.getTextInputValue(
      `m-instr-activity-${subdep}-callsign-input`
    );

    const subDepKeys = {
      radio: 'Instr. Radio',
      moto: 'Instr. Moto',
      highspeed: 'Instr. HS',
      mdt: 'Instr. MDT',
      pilot: 'Instr. Pilot',
      tester: 'Tester'
    };

    const profile = await mongo.getProfileByCallsign(callsignInput);
    if (!profile) {
      await utils.discord.errors.invalidCallsignError(pulsar, interaction);
      return 'invalid';
    }

    if (!profile.functii.includes(subDepKeys[subdep])) {
      await utils.discord.errors.doesNotHaveFuncError(pulsar, interaction);
      return 'invalid';
    }

    return {
      profile: profile
    };
  }
};
