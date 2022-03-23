
async function getName(filter, message){
    let name;
    await message.channel.send('What is your full name?').then( async () => {
        await message.channel.awaitMessages({filter, max: 1, time: 60_000, errors: ['time'] }).then( response => {
        message = response.first()
        name = message.content;
        })
    })
    return name;
}

module.exports = { getName }
