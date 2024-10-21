export const callsignInput = async ({ pulsar, interaction, utils, mongo }) => {
    const callsignInput = interaction.fields.getTextInputValue('m-sanction-callsign-input');
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
};

export const reasonInput = async ({ pulsar, interaction, utils }) => {
    const reasonInput = interaction.fields.getTextInputValue('m-sanction-reason-input');
    const chars = reasonInput.split('').length;

    if (chars < 5) {
        await utils.discord.errors.invalidReasonLengthError(pulsar, interaction);
        return 'invalid';
    }

    return {
        reason: reasonInput
    };
};
