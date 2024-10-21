import { replaceButtonPlaceholders } from '../../../../core/placeholderModifier.js';

export const mphClockInSelect = async ({ pulsar, interaction, type }, botconfig) => {
    const nonFormattedButtons = botconfig.mphActivityMenusButtons.buttons;
    const buttonOptions = nonFormattedButtons[type];

    const buttons = replaceButtonPlaceholders(buttonOptions, {});

    const embedOptions = {
        moto: {
            description: '**Alege tipul de motor de mai jos**',
            title: 'Meniu Selectare Moto'
        },
        highspeed: {
            description: '**Alege tipul de masina de mai jos**',
            title: 'Meniu Selectare Highspeed'
        },
        pilot: {
            description: '**Alege tipul de elicopter de mai jos**',
            title: 'Meniu Selectare Pilot'
        }
    };

    const rows = await pulsar.discordManager.menus.createButtonMenu({
        perLine: 2,
        buttons: buttons
    });

    await pulsar.discordManager.embeds.createDefaultEmbed(embedOptions[type].description, {
        title: embedOptions[type].title,
        interaction: interaction,
        components: rows,
        ephemeral: true,
        deferReply: true
    });
};
