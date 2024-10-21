export const invalidNameArgumentsError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Numele trebuie sa fie format din **Nume + Prenume**.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const invalidResultError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Rezultatul introdus nu este valid (Acceptat/Admis - Refuzat/Respins).',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const invalidReasonLengthError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Motivul trebuie sa aibe minim 5 caractere.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};
