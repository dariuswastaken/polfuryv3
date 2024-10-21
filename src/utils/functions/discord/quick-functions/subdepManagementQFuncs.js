export const addFunc = async (interaction, userID, mongo, func) => {
    const roleIDs = {
        'Instr. Radio': '1094603229456769155',
        'Instr. MDT': '1147540100327157780',
        'Instr. HS': '1102705257802387518',
        'Instr. Pilot': '1094603228668248094',
        'Instr. Moto': '1094603206203547758',
        Tester: '1094603202734854225'
    };
    const member = await interaction.guild.members.fetch(userID);
    await member.roles.add(roleIDs[func]);
    await mongo.addFunc(userID, func);
};

export const removeFunc = async (interaction, userID, mongo, func) => {
    const roleIDs = {
        'Instr. Radio': '1094603229456769155',
        'Instr. MDT': '1147540100327157780',
        'Instr. HS': '1102705257802387518',
        'Instr. Pilot': '1094603228668248094',
        'Instr. Moto': '1094603206203547758',
        Tester: '1094603202734854225'
    };
    const member = await interaction.guild.members.fetch(userID);
    await member.roles.remove(roleIDs[func]);
    await mongo.removeFunc(userID, func);
};
