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
        let actionTop = [];
        console.log("Passed line 15")
        if (type === 'rutiera' || type === 'licente') {
            for (let i = 0; i < members.length; i++) {
              console.log(members[i].IDDiscord);
                const user = await mongo.getProfile(members[i].IDDiscord);
                let actions = await utils.activity.utils.getActionActivity(
                    week,
                    members[i].IDDiscord,
                    members[i].grad,
                    pulsar.client
                );
                actionTop.push({
                    nume: user.nume,
                    data: actions
                });
            }
            actionTop.sort((a, b) => b.data[type] - a.data[type]);
            formattedTop = actionTop.slice(0, 5);
            console.log("Passed line 33")
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
