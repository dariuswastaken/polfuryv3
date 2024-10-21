export const addAcademiePD = async ({ interaction, mongo, targetID, data }) => {
    await mongo.createProfileAcademician({
        nume: data.nume,
        IDDiscord: data.IDDiscord,
        IDServer: data.IDServer,
        dataIntrare: data.dataIntrare,
        dataActualizare: data.dataActualizare,
        esuariTest: 0,
        cooldown: null,
        prezentaAcademie: false,
        suspendat: false
    });

    const user = await interaction.guild.members.fetch(targetID);

    await user.setNickname(`[AC] ${data.nume}`);
    await user.roles.add('1094603212213989436');
};

export const addReintegrarePD = async ({ interaction, mongo, targetID, data }) => {
    const user = await interaction.guild.members.fetch(targetID);
    const callsign = await mongo.getAvailableCallsign('Agent');

    await mongo.updateCallsign('Agent', callsign.id, true);
    await mongo.createProfile({
        nume: data.nume,
        IDDiscord: data.IDDiscord,
        callsign: callsign.id,
        IDServer: data.IDServer,
        grad: 'Agent',
        corp: 'AGENTI',
        dataIntrare: data.dataIntrare,
        dataActualizare: data.dataActualizare,
        certificate: {
            radio: false,
            moto: false,
            pilot: false,
            highspeed: false,
            mdt: false
        }
    });

    await user.setNickname(`[${callsign.id}] ${data.nume}`);
    await user.roles.add([
        '1094603197718478938',
        '1110261016064958561',
        '1110257492555989043',
        '1094603202051194990'
    ]);
};

export const addMemberPD = async ({ interaction, mongo, targetID, data }) => {
    const user = await interaction.guild.members.fetch(targetID);
    const callsign = await mongo.getAvailableCallsign('Cadet');

    await mongo.updateCallsign('Cadet', callsign.id, true);
    await mongo.createProfile({
        nume: data.nume,
        IDDiscord: data.IDDiscord,
        callsign: callsign.id,
        IDServer: data.IDServer,
        grad: 'Cadet',
        corp: 'AGENTI',
        dataIntrare: data.dataIntrare,
        dataActualizare: data.dataActualizare,
        certificate: {
            radio: false,
            moto: false,
            pilot: false,
            highspeed: false,
            mdt: false
        }
    });
    await mongo.deleteProfileAcademician(targetID);

    await user.roles.remove('1094603212213989436');
    await user.roles.add([
        '1110257492555989043',
        '1094603202051194990',
        '1110261016064958561',
        '1094603198695755816'
    ]);
    await user.setNickname(`[${callsign.id}] ${data.nume}`);
};
