const { Client,Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const { getName } = require('./messageCollector/name')
const { getUP } = require('./messageCollector/upNum')
const { getCourse } = require('./messageCollector/course')
const { getYear } = require('./messageCollector/year')
const { verifyUser } = require('./verifyUser')
const { verifiedMember } = require('./verifiedMember')

//File system to get commands
const fs = require('fs');
const client = new Client({ partials: ["CHANNEL"] , intents: [Intents.FLAGS.GUILDS, 'GUILD_MEMBERS','DIRECT_MESSAGES'] });

// Command Handling
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// get new instance of collection
client.commands = new Collection();
client.btnCommands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', guildMember =>{
    console.log("member joined");

	guildMember.send(`Welcome to, <@${guildMember.user.id}>, Portsmouth School of Computing Discord!\n`)
	.then(async message => {
		const filter = message => {
			return message.author.bot !== true;
		}
		const name = await getName(filter, message);
		const upNum = await getUP(filter, message);
		const course = await getCourse(filter, message);
		const year = await getYear(filter, message);
		console.log(name, upNum, course, year);
		guildMember.send(`
			Name: ${name}
			UP: ${upNum}
			Course: ${course}
			Year: ${year}
		`)

		// console.log(guildMember.user.username);
		const userVerified = await verifyUser(upNum);
		verifiedMember(userVerified, guildMember, name, upNum)

	})
})



client.on('interactionCreate', async interaction => {
	const command = await client.commands.get(interaction.commandName);

	if (!interaction.isCommand()) return;

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({content: "Error executing command!\nReport to admin", ephemeral: true});
	}
})



client.login(token);