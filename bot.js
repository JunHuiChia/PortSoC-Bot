const { Client,Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
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

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', guildMember =>{
    console.log("member joined");
    // const welcomeChannel = guildMember.guild.channels.cache.get('927585403899346944')
    guildMember.send(`Welcome to, <@${guildMember.user.id}>, Portsmouth School of Computing Discord!\nI'll need your Name, UP number, Course and Current Year.`)
})

client.on('messageCreate', message => {
	if(message.author.bot) return
	if(message.channel.type == 'DM'){
		console.log(message.author.tag);
		message.author.send('Thanks for replying!')
		.catch(console.error)
	}
	console.log('Message received');
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