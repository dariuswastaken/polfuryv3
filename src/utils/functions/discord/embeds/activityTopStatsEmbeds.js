export const sendTopActivityEmbed = async ({ pulsar, interaction, type, week, list }) => {
    await pulsar.discordManager.embeds.createEmbed({
        description: `**Top ${type.toUpperCase()}**\n\n\`\`\`\n${list.join('\n')}\n\`\`\``,
        footer: { text: `Saptamana ${week}` },
        interaction: interaction,
        deferReply: true,
        ephemeral: true
    });
};
