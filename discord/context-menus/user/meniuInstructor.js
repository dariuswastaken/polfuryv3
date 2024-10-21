import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    PermissionsBitField
} from 'npm:discord.js';

export default {
    data: new ContextMenuCommandBuilder()
        .setName('Meniu Instructor')
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ChangeNickname),
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        const targetID = await interaction.options.getUser('user').id;
        const targetProfile = await mongo.getProfile(targetID);

        if (!targetProfile) {
            await utils.discord.errors.noProfileError(pulsar, interaction);
            return;
        }

        if (targetID === interaction.user.id) {
            await utils.discord.errors.selfUseError(pulsar, interaction);
            return;
        }

        await utils.discord.buttonMenus.sendMenuInstructor(
            {
                pulsar: pulsar,
                interaction: interaction,
                mongo: mongo,
                utils: utils,
                targetID: targetID
            },
            botconfig
        );
    }
};
