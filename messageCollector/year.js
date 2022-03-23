const { MessageActionRow, MessageSelectMenu } = require("discord.js");



async function getYear(guildMember){
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'First Year',
                    value: 'first',
                },
                {
                    label: 'Second Year',
                    value: 'second',
                },
                {
                    label: 'Final Year',
                    value: 'final',
                },
                {
                    label: 'Placement',
                    value: 'placement',
                },
            ]),
    );
    guildMember.send({ content: 'What is your current year? ', components: [row] })
}

module.exports = { getYear }
