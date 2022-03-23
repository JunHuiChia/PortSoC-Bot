const { Client, Collection, Intents, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { token, guildId } = require("./config.json");

const { getName } = require("./messageCollector/name");
const { getUP } = require("./messageCollector/upNum");
const { getYear } = require("./messageCollector/year");
const { verifyUser } = require("./verification/verifyUser");
const { verifyYear } = require("./verification/verifyYear");
const { verifiedMember } = require("./verification/verifiedMember");
const { roleManager } = require("./verification/roleManager");
const {courseSelection} = require("./messageCollector/courseSelection")

//File system to get commands
const fs = require("fs");
const client = new Client({
    partials: ["CHANNEL"],
    intents: [Intents.FLAGS.GUILDS, "GUILD_MEMBERS", "DIRECT_MESSAGES","GUILD_MESSAGES", "GUILDS"],
});

// Command Handling
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// get new instance of collection
client.commands = new Collection();
client.btnCommands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once("ready", async () => {
    console.log("Ready!");
});

client.on('messageCreate', async (msg) => {
    if(msg.content == "!u"){
        msg.reply("Updated")
        const server = client.guilds.fetch(guildId); 
        const member = (await server).members.fetch().then(
            member => member.forEach((user, key) => {
                if(user.user.bot == true) {return}
                roleManager(user, 'update', null, user.nickname)
            }))
    }
})

client.on("guildMemberAdd", (guildMember) => {
    console.log("member joined");

    guildMember
        .send(
            `Welcome, <@${guildMember.user.id}>, to Portsmouth School of Computing Discord!\nTo get you verified, I will need some information.`
        )
        .then(async (message) => {
            const filter = (message) => {
                return message.author.bot !== true;
            };
            const name = await getName(filter, message);
            const upNum = await getUP(filter, message);

            const userVerified = await verifyUser(name, upNum);
            if(userVerified){
                await verifiedMember(guildMember, name, upNum);
                await getYear(guildMember);
            } else{
                guildMember.send("Details given did not match.");
            }
            console.log(name, upNum);
        });
});


client.on("interactionCreate", async (interaction) => {
    const server = client.guilds.fetch(guildId); 
    const member = (await server).members.fetch(interaction.user.id)
    const nickname = (await member).nickname
    if(interaction.isSelectMenu()
    && interaction.values[0] == 'first' 
    || interaction.values[0] == 'second' 
    || interaction.values[0] == 'final'
    || interaction.values[0] == 'placement'){

        const year = await verifyYear(nickname, interaction.values[0])
        if(year){
            await interaction.update({content: `You selected ${interaction.values[0]} year.`, components:[]});
            await interaction.user.send('Your current year has been verified!')
            await courseSelection(interaction.user)
        } else{
            await interaction.user.send('Your current year is incorrect! Please try again.')
        }
    }
    else if (interaction.isSelectMenu()){
        await roleManager(member, "assign", interaction.values[0], nickname)
        await interaction.update({content: `You selected ${interaction.values[0]}`, components: []});
    }
    // if (!interaction.isCommand()) return;

    // if (!command) return;

    // try {
    //     await command.execute(interaction);
    // } catch (error) {
    //     console.error(error);
    //     await interaction.reply({
    //         content: "Error executing command!\nReport to admin",
    //         ephemeral: true,
    //     });
    // }
});

client.login(token);
