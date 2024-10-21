import { PermissionsBitField, SlashCommandBuilder } from 'npm:discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('subdep-menu')
        .setDescription('Deschide meniul de gestionare a subdepartamentelor')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageNicknames),
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        await utils.discord.buttonMenus.sendSubdepMenu(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo
            },
            botconfig
        );
    }
};
