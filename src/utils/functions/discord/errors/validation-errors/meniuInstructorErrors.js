export const alreadyHasCertificateError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Membrul respectiv detine deja acest certificat.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const doesNotHaveCertificateError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Membrul respectiv nu detine acest certificat.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const alreadyHasCooldownError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Membrul respectiv are deja un cooldown.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const noCooldownsError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Membrul respectiv nu are cooldown-uri active.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};
