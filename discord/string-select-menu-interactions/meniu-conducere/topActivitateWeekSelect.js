export default {
    name: 'top-activity-week-select',
    enabled: true,
    async execute(pulsar, interaction, mongo, utils, botconfig) {
        await interaction.deferReply({ ephemeral: true });

        const type = interaction.customId.split('/')[2];
        const week = interaction.values[0];

        const top = await mongo.getTop(week, type);
        const members = await mongo.getAllMembers();

        let formattedTop = [];
        let actionTopOrg = [];
        let actionTopPart = [];
        if (type === 'rutiera' || type === 'licente') {
            for (let i = 0; i < members.length; i++) {
                let tip = '';
                const loopPercentage = Math.floor((i / members.length) * 100);
                await interaction.editReply({
                    content: `**Se calculeaza... (${loopPercentage}%)**`
                });

                const user = await mongo.getProfile(members[i].IDDiscord);
                let actions = await utils.activity.utils.getActionActivity(
                    week,
                    members[i].IDDiscord,
                    members[i].grad,
                    pulsar.client
                );

                if (user.grad === 'Cadet' || user.grad === 'Agent') {
                    actionTopPart.push({
                        nume: user.nume,
                        data: actions
                    });
                } else {
                    actionTopOrg.push({
                        nume: user.nume,
                        data: actions
                    });
                }
            }
            actionTopOrg = actionTopOrg.sort((a, b) => b.data[type] - a.data[type]);
            actionTopOrg = actionTopOrg.slice(0, 5);

            actionTopPart = actionTopPart.sort((a, b) => b.data[type] - a.data[type]);
            actionTopPart = actionTopPart.slice(0, 5);

            formattedTop.push('PARTICIPATE\n\n\n');
            for (let i = 0; i < actionTopOrg.length; i++) {
                formattedTop.push(`${actionTopOrg[i].nume} - ${actionTopOrg[i].data[type]}`);
            }
            formattedTop.push('\n\n\nORGANIZATE');
            for (let i = 0; i < actionTopPart.length; i++) {
                formattedTop.push(`${actionTopPart[i].nume} - ${actionTopPart[i].data[type]}`);
            }
        } else {
            for (let i = 0; i < top.length; i++) {
                const user = await mongo.getProfile(top[i].IDDiscord);
                formattedTop.push(
                    `${user.nume} - ${top[i].data[type]} ${type === `pontaj` ? ' minute' : ''}`
                );
            }
        }

        if (formattedTop.length === 0) {
            formattedTop.push('Nu exista date pentru aceasta saptamana.');
        }

        await utils.discord.embeds.sendTopActivityEmbed({
            pulsar: pulsar,
            interaction: interaction,
            type: type,
            week: week,
            list: formattedTop
        });
    }
};
