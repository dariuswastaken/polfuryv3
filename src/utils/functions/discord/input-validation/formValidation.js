export const formIntrare = async ({ pulsar, interaction, utils, mongo }) => {
    const nameInput = interaction.fields.getTextInputValue('form-intrare-nume');
    const idInput = interaction.fields.getTextInputValue('form-intrare-id');
    const tokenInput = interaction.fields.getTextInputValue('form-intrare-token');

    const validateArgsCount = await utils.checks.validateTwoArguments(nameInput);

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
        .toLowerCase()} ${lastName.slice(0, 1).toUpperCase()}${lastName.slice(1).toLowerCase()}`;

    return {
        formattedName: formattedName,
        serverID: parseInt(idInput)
    };
};

export const formTrecereTest = async ({ pulsar, interaction, utils, mongo }) => {
    const idInput = interaction.fields.getTextInputValue('form-trecere-test-id');
    const rezultatInput = interaction.fields.getTextInputValue('form-trecere-test-rezultat');

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

    if (rezultatInput.toLowerCase() === 'acceptat' || rezultatInput.toLowerCase() === 'admis') {
        return {
            result: true
        };
    }
    if (rezultatInput.toLowerCase() === 'refuzat' || rezultatInput.toLowerCase() === 'respins') {
        return {
            result: false
        };
    }
};
