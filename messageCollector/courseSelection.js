const { MessageActionRow, MessageSelectMenu } = require("discord.js");

async function courseSelection(guildMember){
    console.log(guildMember);
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'Computer Science',
                    value: 'computer science',
                },
                {
                    label: 'Software Engineering',
                    value: 'software engineering',
                },
                {
                    label: 'Computer Networks',
                    value: 'computer networks',
                },
                {
                    label: 'Computing',
                    value: 'computing',
                },
                {
                    label: 'Cyber Security and Forensic Computing',
                    value: 'cyber security',
                },
                {
                    label: 'Data Science and Analytics',
                    value: 'data science',
                },
            ]),
    );
    guildMember.send({ content: 'Courses: ', components: [row] })
}


module.exports = { courseSelection };
