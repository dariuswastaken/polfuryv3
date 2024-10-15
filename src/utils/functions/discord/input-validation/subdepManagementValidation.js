export const callsignInputSubdep = async ({
  pulsar,
  interaction,
  utils,
  mongo,
  subdep,
  type,
  modalType
}) => {
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
};

export const callsignInputInstrActivity = async ({
  pulsar,
  interaction,
  utils,
  mongo,
  subdep
}) => {
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
};
