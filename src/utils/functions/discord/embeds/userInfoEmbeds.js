export const sendUserInfoEmbed = async ({ pulsar, interaction, mongo, targetID }) => {
    const targetProfile = await mongo.getProfile(targetID);

    let certificateList = [];
    for (let certificat of Object.keys(targetProfile.certificate)) {
        if (targetProfile.certificate[certificat] === true) {
            certificateList.push(certificat.toUpperCase());
        }
    }

    let sanctiuniFormatted = [];

    if (targetProfile.sanctiuni.length === 0) {
        targetProfile.sanctiuni.push('Nici o sanctiune activa.');
    }

    if (sanctiuniFormatted.length === 0) {
        sanctiuniFormatted.push('Nici o sanctiune activa.');
    }
    if (targetProfile.functii.length === 0) {
        targetProfile.functii.push('Nici o functie.');
    }
    if (targetProfile.notite.length === 0) {
        targetProfile.notite.push('Nici o notita.');
    }

    let dutyStatus;
    try {
        let isOnDuty = await pulsar.webManager.isOnDuty(targetProfile.IDServer);
        dutyStatus = isOnDuty ? 'Da' : 'Nu';
    } catch (error) {
        dutyStatus = 'Eroare in timpul verificarii';
    }

    await pulsar.discordManager.embeds.createEmbed({
        footer: { text: `Informatii - ${targetProfile.nume}` },
        fields: [
            {
                name: 'NUME',
                value: `${targetProfile.nume}`,
                inline: true
            },
            {
                name: 'CALLSIGN',
                value: `${targetProfile.callsign}`,
                inline: true
            },
            {
                name: 'GRAD',
                value: `${targetProfile.grad}`,
                inline: true
            },
            {
                name: 'ID',
                value: `${targetProfile.IDServer}`,
                inline: true
            },
            {
                name: 'DATA INTRARE',
                value: `${targetProfile.dataIntrare}`,
                inline: true
            },
            {
                name: 'ULTIMA ACTUALIZARE',
                value: `${targetProfile.dataActualizare}`,
                inline: true
            },
            {
                name: 'ON-DUTY?',
                value: `${dutyStatus}`,
                inline: true
            },
            {
                name: 'AVERTISMENTE',
                value: `${targetProfile.avertismente}`,
                inline: true
            },
            {
                name: 'CERTIFICATE',
                value: `\`\`\`\n${certificateList.join(' / ')}\`\`\``,
                inline: true
            },
            {
                name: 'FUNCTII',
                value: `\`\`\`\n${targetProfile.functii.join('\n')}\n\`\`\``,
                inline: true
            },
            {
                name: 'SANCTIUNI',
                value: `\`\`\`\n${targetProfile.sanctiuni.join('\n')}\n\`\`\``,
                inline: false
            },
            {
                name: 'NOTITE',
                value: `\`\`\`\n${targetProfile.notite.join('\n')}\n\`\`\``,
                inline: false
            }
        ],
        interaction: interaction,
        deferReply: true,
        ephemeral: true
    });
};
