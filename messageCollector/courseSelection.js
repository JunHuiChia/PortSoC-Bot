const { MessageActionRow, MessageSelectMenu } = require("discord.js");

async function courseSelection(guildMember){
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'Software Engineering',
                    value: 'software engineering',
                },
                {
                    label: 'Computer Science',
                    value: 'computer science',
                },
            ]),
    );
    guildMember.send({ content: 'Courses: ', components: [row] })
}


module.exports = { courseSelection };
