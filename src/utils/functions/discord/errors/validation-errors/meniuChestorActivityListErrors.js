export const noUpListError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Nu exista lista de UP pentru saptamana respectiva.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const noOutListError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Nu exista lista de OUT pentru saptamana respectiva.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const listAlreadyExistsError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Listele pentru saptamana respectiva au fost deja generate.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};

export const noListsError = async (pulsar, interaction) => {
    pulsar.discordManager.embeds.createErrorEmbed(
        'Eroare',
        'Nu exista liste pentru saptamana respectiva.',
        {
            interaction: interaction,
            ephemeral: true,
            deferReply: true
        }
    );
};
