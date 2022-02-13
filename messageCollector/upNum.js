
async function getUP(filter, message){
    let upNumber;
    await message.channel.send('What is your UP number?').then( async () => {
        await message.channel.awaitMessages({filter, max: 1, time: 60_000, errors: ['time'] }).then( response => {
        message = response.first()
        upNumber = message.content;
        })
    })
    return upNumber;
}

module.exports = { getUP }
